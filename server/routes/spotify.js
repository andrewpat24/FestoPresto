const express = require('express');
const router = express.Router();
// Spotify dependencies
const SpotifyWebApi = require('spotify-web-api-node');
// Middleware
const validateAccessToken = require('../middleware/spotify/validate_access_token');
// Mongoose
const mongoose = require('mongoose');

// .env imports
const clientId = process.env.SPOTIFY_CLIENT_ID; // Your client id
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri
});

router.post('/get_artist_by_id', validateAccessToken, async (req, res) => {
  const { access_token, artist_id, has_new_access_token } = req.body;

  spotifyApi.setAccessToken(access_token);
  spotifyApi.getArtist(artist_id, function(err, data) {
    res.send({
      path: '/get_artist_by_id',
      response: {
        access_token,
        has_new_access_token,
        data,
        err
      }
    });
  });
});

router.post('/generate_playlist', validateAccessToken, async (req, res) => {
  const {
    access_token,
    spotify_uid,
    artist_list,
    event_name,
    has_new_access_token
  } = req.body;
  spotifyApi.setAccessToken(access_token);
  const trackList = [];
  let topTrackAmount = 5;

  for (let ii = 0; ii < artist_list.length; ii++) {
    const artistId = artist_list[ii];
    if (!artistId) continue;
    try {
      let artistTopTracks = await spotifyApi.getArtistTopTracks(artistId, 'GB');
      artistTopTracks = artistTopTracks.body.tracks;

      for (let jj = 0; jj < topTrackAmount; jj++) {
        if (!!artistTopTracks[jj]) trackList.push(artistTopTracks[jj].uri);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const newPlaylist = await spotifyApi.createPlaylist(spotify_uid, event_name, {
    public: true
  });
  const newPlaylistId = newPlaylist.body.id;
  console.log(trackList.length);
  // TODO: Make your own request instead of relying on spotify-web-api-node.
  // Need to pass the tracks in the request body which spotify-web-api-node is doing...
  // https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/

  // We have to add tracks in chunks of 90 otherwise we exceed spotify-web-api-node's track limit size when adding songs to a playlist.
  // This is a.. janky workaround.

  const chunkSize = 50;
  for (let ii = 0; ii < trackList.length; ii = ii + chunkSize) {
    const trackChunk = [];
    for (let jj = ii; jj < ii + chunkSize && jj < trackList.length; jj++) {
      counter = jj;
      trackChunk.push(trackList[jj]);
    }
    try {
      console.log('CHUNK SIZE:', trackChunk.length);
      await spotifyApi.addTracksToPlaylist(newPlaylistId, trackChunk);
    } catch (e) {
      console.log(e);
      return res.status(401).send({
        message: 'Could not create playlist'
      });
    }
  }

  return res.status(200).send({
    path: '/generate_playlists',
    message: `Playlist '${event_name}' has been successfully created with ${trackList.length} songs!`,
    access_token,
    has_new_access_token
  });
});

module.exports = router;
