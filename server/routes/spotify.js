const express = require("express");
const router = express.Router();
// Spotify dependencies
const SpotifyWebApi = require("spotify-web-api-node");
// Middleware
const validateAccessToken = require("../middleware/spotify/validate_access_token");

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

// TODO: Issue #23
router.post("/followed_artists", validateAccessToken, (req, res) => {
  spotifyApi.setAccessToken("TODO: put req.accessToken here");

  spotifyApi.getFollowedArtists({ limit: 50 }).then(
    function(data) {
      res.send({
        path: "/followed_artists",
        data: data.body
      });
    },
    function(err) {
      console.log("Something went wrong!", err);
    }
  );
});

module.exports = router;
