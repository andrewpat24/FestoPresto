const express = require('express');
const router = express.Router();

// Mongoose
const mongoose = require('mongoose');
const Follows = mongoose.model('follows');
const Festivals = mongoose.model('festivals');
const CachedArtists = mongoose.model('cached_artists');

// Middleware
const validateAccessToken = require('../middleware/spotify/validate_access_token');

// Requests
const bent = require('bent');

// Spotify Web Api
const SpotifyWebApi = require('spotify-web-api-node');

// .env imports
const clientId = process.env.SPOTIFY_CLIENT_ID; // Your client id
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri
});

router.get('/', (req, res) => {
  res.status(200).send({
    path: '/',
    message: 'Root GET working on /routes'
  });
});

router.post('/find_festivals', async (req, res) => {
  const { location } = req.body;
  const songkick_key = process.env.SONGKICK_KEY;
  const getLocationID = bent(
    `https://api.songkick.com/api/3.0/search/locations.json?query=${location}&apikey=${songkick_key}`,
    'GET',
    'json',
    200
  );

  const response_getLocationID = await getLocationID();
  const locations = response_getLocationID.resultsPage.results.location;
  if (!locations)
    return res.status(200).send({
      location_name: `Sorry, we couldn't find a city named ${location}. `,
      festivals: []
    });

  const locationData = {
    id: locations[0].metroArea.id,
    displayName: locations[0].metroArea.displayName
  };

  const getLocationEventData = bent(
    `http://api.songkick.com/api/3.0/events.json?apikey=${songkick_key}&location=sk:${locationData.id}&type=festival`,
    'GET',
    'json',
    200
  );

  const response_getLocationEventData = await getLocationEventData();

  const festivals = (locationData => {
    const data = [];
    const festivalList = locationData.resultsPage.results.event;
    festivalList.forEach(festival => {
      const { id, displayName, uri, start, end, performance } = festival;
      if (performance.length > 4)
        data.push({
          id,
          displayName,
          uri,
          start,
          end,
          numPerformers: performance.length
        });
    });

    return data;
  })(response_getLocationEventData);

  return res.status(200).send({
    location_name: locationData.displayName,
    festivals
  });
});

router.post('/festival_details', validateAccessToken, async (req, res) => {
  const {
    festivalID,
    spotify_uid,
    access_token,
    has_new_access_token
  } = req.body;
  spotifyApi.setAccessToken(access_token);

  const response_findFollow = await Follows.findOne({
    songkick_id: festivalID,
    spotify_uid
  });

  const followStatus = !!response_findFollow
    ? response_findFollow.follow_status
    : false;

  const getEvent = bent(
    `https://api.songkick.com/api/3.0/events/${festivalID}.json?apikey=${process.env.SONGKICK_KEY}`,
    'GET',
    'json',
    200
  );

  const response_getEvent = await getEvent();
  festivalData = response_getEvent.resultsPage.results.event;
  console.log(festivalData);
  festivalData.followStatus = followStatus;

  const artistList = response_getEvent.resultsPage.results.event.performance;

  const artistIds = artistList.map(artist => {
    return artist.artist.id;
  });

  const filter = {
    songkick_id: festivalData.id,
    display_name: festivalData.displayName,
    start: festivalData.start.date,
    num_performers: artistList.length
  };
  const update = {};
  await Festivals.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  });

  let cachedArtists = await CachedArtists.find({
    songkick_id: { $in: [...artistIds] }
  });

  const removeCachedDuplicateArtists = (cachedArtists => {
    const hash = {};
    const newList = [];
    cachedArtists.forEach(artist => {
      if (hash[artist.songkick_id]) console.log('DUPLICATE FOUND:', { artist });
      else {
        newList.push(artist);
        hash[artist.songkick_id] = true;
      }
    });
    return newList;
  })(cachedArtists);

  cachedArtists = removeCachedDuplicateArtists;

  if (cachedArtists.length >= artistIds.length)
    return res.status(200).send({
      artist_data: cachedArtists,
      festival_data: festivalData,
      has_new_access_token
    });

  const cachedArtistIdHash = (cachedArtists => {
    const artistHashSet = {};

    cachedArtists.forEach(artist => {
      artistHashSet[artist.songkick_id] = true;
    });

    return artistHashSet;
  })(cachedArtists);

  // TODO: Functionalize the following code:
  // Issue #92
  const artist_data = [];

  for (let ii = 0; ii < artistList.length; ii++) {
    const currentArtist = artistList[ii];
    if (cachedArtistIdHash[currentArtist.artist.id]) continue;
    const data = await spotifyApi.searchArtists(currentArtist.displayName);
    const returnedArtist = data.body.artists.items[0];

    let newArtistData;
    const songkickProperties = {
      artist_name: currentArtist.displayName,
      songkick_id: currentArtist.artist.id,
      songkick_url: currentArtist.artist.uri
    };

    let spotifyProperties = {};

    if (!!returnedArtist) {
      const artistImage = returnedArtist.images[0];

      spotifyProperties = {
        spotify_id: returnedArtist.id,
        spotify_url: returnedArtist.external_urls.spotify,
        genres: returnedArtist.genres,
        popularity: returnedArtist.popularity,
        followers: returnedArtist.followers.total
      };

      if (!!artistImage) spotifyProperties.img = artistImage.url;
    }
    newArtistData = {
      ...songkickProperties,
      ...spotifyProperties
    };
    console.log(newArtistData);

    artist_data.push(newArtistData);
  }

  console.log(
    `Inserting ${artist_data.length} new artist(s) to the database...`
  );

  await CachedArtists.collection.insertMany(artist_data);
  cachedArtists.push(...artist_data);

  return res.status(200).send({
    artist_data: cachedArtists,
    festival_data: festivalData,
    has_new_access_token
  });
});

router.post('/my_festivals', async (req, res) => {
  const { spotify_uid } = req.body;

  try {
    const response_findValidFollows = await Follows.find({
      spotify_uid,
      follow_status: true
    });

    const followedFestivalIDs = response_findValidFollows.map(
      festival => festival.songkick_id
    );

    const response_festivalData = await Festivals.find({
      songkick_id: { $in: followedFestivalIDs }
    });

    const followedFestivals = response_festivalData.map(festival => {
      console.log(festival);
      return {
        id: festival.songkick_id,
        numPerformers: festival.num_performers,
        start: festival.start,
        displayName: festival.display_name
      };
    });

    return res.status(200).send({ followedFestivals });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Could not retrieve followed festivals.',
      response_code: -1
    });
  }
});

// const followedFestivals = response_findValidFollows.map(festival => {
//   // For some reason, strict:false mongoose fields don't provide the data object in a usable way
//   // unless you stringify it THEN parse it again. Otherwise you get {'$init': true, strict: undefined }..
//   const festivalData = JSON.parse(JSON.stringify(festival.data));

//   return {
// id: festival.songkick_id,
// numPerformers: festivalData.numPerformers,
// start: festivalData.start,
// displayName: festivalData.displayName
//   };
// });

router.post('/follow_action', async (req, res) => {
  const { songkick_id, spotify_uid, spotify_email, follow_type } = req.body;
  const songkick_id_as_string = songkick_id.toString();
  const response_Follow = await Follows.findOne({
    spotify_uid,
    songkick_id: songkick_id_as_string
  });

  // If the user has never followed this item, their follow status is true.
  // If the user was following  this item and calls this route,
  // set the follow status to the opposite of their old follow status.
  const new_follow_status = !!response_Follow
    ? !response_Follow.follow_status
    : true;

  const filter = { songkick_id, spotify_uid, spotify_email, follow_type };
  const update = { follow_status: new_follow_status };

  try {
    const response_updateFollow = await Follows.findOneAndUpdate(
      filter,
      update,
      {
        new: true,
        upsert: true
      }
    );

    res.status(200).send({
      follow_status: response_updateFollow.follow_status,
      response_code: 1
    });
  } catch (e) {
    console.log(e);
    res.status(401).send({
      message: 'Could not change follow status',
      response_code: -1
    });
  }
});

module.exports = router;
