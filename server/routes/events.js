const express = require('express');
const router = express.Router();

// Mongoose
const mongoose = require('mongoose');
const Festivals = mongoose.model('festivals');
const Follows = mongoose.model('follows');
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

router.get('/songkick_location_id', async (req, res) => {
  const songkick_key = process.env.SONGKICK_KEY;
  const location = 'San Francisco';
  const get = bent(
    `https://api.songkick.com/api/3.0/search/locations.json?query=${location}&apikey=${songkick_key}&type=festival`,
    'GET',
    'json',
    200
  );
  const response = await get();
  res.status(200).send({ response });
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

  const followResponse = await Follows.findOne({
    spotify_uid,
    songkick_event_id: festivalID
  });

  const followStatus = !!followResponse;

  const getEvent = bent(
    `https://api.songkick.com/api/3.0/events/${festivalID}.json?apikey=${process.env.SONGKICK_KEY}`,
    'GET',
    'json',
    200
  );

  const response_getEvent = await getEvent();
  festivalData = response_getEvent.resultsPage.results.event;
  festivalData.followStatus = followStatus;

  const artistList = response_getEvent.resultsPage.results.event.performance;

  const artistIds = artistList.map(artist => {
    return artist.artist.id;
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

router.post('/followed_festivals', (req, res) => {
  const { spotify_uid } = req.body;
  Follows.find({ spotify_uid }, (err, follows) => {
    if (err)
      res.status(500).send({
        err,
        message: "An error occurred while retrieving a user's followed events."
      });
    res.status(200).send(follows);
  });
});

router.post('/follow_festival', async (req, res) => {
  const { spotify_uid, spotify_email, songkick_event_id } = req.body;

  const newFollow = new Follows({
    spotify_uid,
    spotify_email,
    songkick_event_id
  });

  try {
    const response_savedFollow = await newFollow.save();
    return res.status(200).send({ response_savedFollow });
  } catch (e) {
    console.log(e);
    // If the event is already followed, the user cannot follow it again.
    return res.status(403).send({
      response_message: 'user already follows festival',
      response_code: -1
    });
  }
});

router.post('/unfollow_festival', async (req, res) => {
  const { spotify_uid, songkick_event_id } = req.body;
  const unfollow = await Follow.deleteOne({
    spotify_uid,
    songkick_event_id
  });

  if (unfollow.deletedCount === 0)
    return res.status(403).send({
      response_message: 'The festival has not been unfollowed',
      response_code: -1
    });

  return res.status(200).send({ unfollow });
});

module.exports = router;
