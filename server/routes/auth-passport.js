const express = require("express");
const router = express.Router();
const passport = require("passport");

const spotifyAccessScope =
  "user-read-private user-read-email user-read-playback-state";

router.get("/", function(req, res) {
  res.send({ user: req.user });
});

router.get("/account", function(req, res) {
  res.send({ user: req.user });
});

router.get("/current_user", function(req, res) {
  res.send({ user: req.user });
});

router.get("/login", function(req, res) {
  res.send({ user: req.user });
  // res.redirect("/search");
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
  passport.authenticate("spotify", { failureRedirect: "/auth/login" }),
  function(req, res) {
    res.redirect("/api/auth/current_user");
  }
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
