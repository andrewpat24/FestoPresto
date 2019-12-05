const express = require("express");
const router = express.Router();
// Spotify dependencies
const SpotifyWebApi = require("spotify-web-api-node");
// Middleware
const validateAccessToken = require("../middleware/spotify/validate_access_token");
// Mongoose
const mongoose = require("mongoose");
const FollowedArtists = mongoose.model("followed_Artists");

// .env imports
const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri

const spotifyApi = new SpotifyWebApi({
  client_id,
  client_secret,
  redirect_uri
});

router.get("/", (req, res) => {
  console.log(req.test);
  res.send({
    path: "/"
  });
});

router.post("/refresh_followed_artists", validateAccessToken, (req, res) => {
  const { access_token, refresh_token, spotify_uid } = req.body;
  spotifyApi.setAccessToken(access_token);

  spotifyApi.getFollowedArtists({ limit: 50 }).then(
    async data => {
      const items = data.body.artists.items;
      const artistArray = [];

      items.forEach(artist => {
        const current_artist = {
          name: artist.name,
          artist_id: artist.id
        };
        artistArray.push(current_artist);
      });

      const followerList = await FollowedArtists.findOneAndUpdate(
        { spotify_uid },
        { artists: artistArray }
      );

      res.send({
        path: "/refresh_followed_artists",
        data: followerList.spotify_uid
      });
    },
    function(err) {
      console.log("Something went wrong!", err);
    }
  );
});

router.post("/followed_artists", async (req, res) => {
  const { spotify_uid } = req.body;
  const followerList = await FollowedArtists.findOne({ spotify_uid });
  res.send({
    path: "/followed_artists",
    artists: followerList.artists
  });
});

router.post("/get_artist_by_id", async (req, res) => {
  const { access_token, artist_id } = req.body;
  spotifyApi.setAccessToken(access_token);
  spotifyApi.getArtist(artist_id, function(err, data) {
    res.send({
      path: "/get_artist_by_id",
      response: {
        data,
        err
      }
    });
  });
});

module.exports = router;
