const express = require("express");
const router = express.Router();
const passport = require("passport");

// Mongoose
const mongoose = require("mongoose");
const User = mongoose.model("users");

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

router.get("/account", function(req, res) {
  res.send({ user: req.user });
});

router.get("/current_user", function(req, res) {
  const spotify_uid = req.user;
  res.send({ user: spotify_uid });
});

router.get("/login", function(req, res) {
  res.send({ user: req.user });
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

module.exports = router;
