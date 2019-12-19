const express = require("express");
const router = express.Router();
const passport = require("passport");

// Mongoose
const mongoose = require("mongoose");
const User = mongoose.model("users");

// .env imports
const clientId = process.env.SPOTIFY_CLIENT_ID; // Your client id
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret

// Spotify initialization
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

const spotifyAccessScope = [
  "user-top-read",
  "user-follow-read",
  "user-read-email",
  "user-read-private",
  "user-library-modify",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-collaborative"
];

router.get("/", function(req, res) {
  res.send({ user: req.user });
});

router.get("/current_user", function(req, res) {
  const spotify_user_data = req.user;
  res.send(spotify_user_data);
});

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: spotifyAccessScope,
    showDialog: true
  }),
  function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  "/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.post("/refresh_access_token", async (req, res) => {
  const { spotify_uid, access_token } = req.body;
  const query = User.findOne({
    spotify_uid,
    spotify_access_token: access_token
  });

  query.select("spotify_refresh_token");
  const user = await query.exec();
  const refreshToken = user.spotify_refresh_token;

  spotifyApi.setClientId(clientId);
  spotifyApi.setClientSecret(clientSecret);
  spotifyApi.setRefreshToken(refreshToken);

  const refreshTokenRequest = await spotifyApi.refreshAccessToken();
  const newAccessToken = refreshTokenRequest.body.access_token;
  const filter = { spotify_uid, spotify_access_token: access_token };
  const update = { spotify_access_token: newAccessToken };
  try {
    await User.findOneAndUpdate(filter, update);
    res.status(200).send({
      message: "The user's access token has been successfully updated!",
      user: {
        spotify_uid,
        newAccessToken
      }
    });
  } catch (err) {
    res.status(400).send({
      err,
      message: "An error occurred while updating the user's access token."
    });
  }
});

module.exports = router;
