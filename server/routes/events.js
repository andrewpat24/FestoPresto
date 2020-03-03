const express = require('express');
const router = express.Router();

// Mongoose
const mongoose = require('mongoose');
const Events = mongoose.model('events');
const FollowedEvents = mongoose.model('followed_events');
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
  const { festivalID, access_token } = req.body;
  spotifyApi.setAccessToken(access_token);

  const getEvent = bent(
    `https://api.songkick.com/api/3.0/events/${festivalID}.json?apikey=${process.env.SONGKICK_KEY}`,
    'GET',
    'json',
    200
  );

  const response_getEvent = await getEvent();
  festivalData = response_getEvent.resultsPage.results.event;

  const artistList = response_getEvent.resultsPage.results.event.performance;

  const artistIds = artistList.map(artist => {
    return artist.artist.id;
  });

  const cachedArtists = await CachedArtists.find({
    songkick_id: { $in: [...artistIds] }
  });

  if (cachedArtists.length === artistIds.length)
    return res
      .status(200)
      .send({ artist_data: cachedArtists, festival_data: festivalData });

  const cachedArtistIdHash = (cachedArtists => {
    const hash = {};

    cachedArtists.forEach(artist => {
      hash[artist.songkick_id] = true;
    });

    return hash;
  })(cachedArtists);

  // TODO: Functionalize the following code:
  const artist_data = [];

  for (let ii = 0; ii < artistList.length; ii++) {
    const currentArtist = artistList[ii];
    if (!!cachedArtistIdHash[currentArtist.id]) continue;

    const data = await spotifyApi.searchArtists(currentArtist.displayName);
    const returnedArtist = data.body.artists.items[0];

    const newArtistData = {
      artist_name: currentArtist.displayName,
      songkick_id: currentArtist.artist.id,
      songkick_url: currentArtist.artist.uri
    };

    if (!!returnedArtist) {
      newArtistData.spotify_id = returnedArtist.id;
      newArtistData.spotify_url = returnedArtist.external_urls.spotify;
      newArtistData.genres = returnedArtist.genres;
      newArtistData.popularity = returnedArtist.popularity;
      newArtistData.followers = returnedArtist.followers.total;
    }
    console.log(newArtistData);
    artist_data.push(newArtistData);
  }

  console.log(`Inserting ${artist_data.length} new artists to the database...`);
  await CachedArtists.collection.insertMany(artist_data);
  cachedArtists.push(...artist_data);

  return res
    .status(200)
    .send({ artist_data: cachedArtists, festival_data: festivalData });
});

router.post('/followed_events', (req, res) => {
  const { spotify_uid } = req.body;
  FollowedEvents.find({ spotify_uid }, (err, followedEvents) => {
    if (err)
      res.status(500).send({
        err,
        message: "An error occurred while retrieving a user's followed events."
      });
    res.status(200).send(followedEvents);
  });
});

router.post('/follow_event', async (req, res) => {
  const { spotify_uid, event_id } = req.body;
  if (event_id === undefined)
    res.status(500).send({
      message: 'event_id must not be undefined.'
    });

  const identifier = spotify_uid + '_' + event_id;

  const newFollowedEvent = new FollowedEvents({
    spotify_uid,
    event_id,
    identifier
  });

  try {
    const saveFollowedEvent = await newFollowedEvent.save();
    res.status(201).send(saveFollowedEvent);
  } catch (error) {
    res.status(500).send({
      error,
      message: 'An error occurred or the user has already followed this event.'
    });
  }
});

router.post('/unfollow_event', async (req, res) => {
  const { spotify_uid, event_id } = req.body;
  const unfollowedEvent = await FollowedEvents.deleteOne({
    spotify_uid,
    event_id
  });

  if (unfollowedEvent.deletedCount === 0)
    res
      .status(500)
      .send({ message: 'The event has not been unfollowed', unfollowedEvent });

  res.status(200).send({ unfollowedEvent });
});

module.exports = router;
