// Passport imports
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

// .env imports
const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri

// Mongoose
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userID, done) => {
  console.log("userID:", userID);
  User.findById(userID).then(user => {
    done(null, user);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log({
        accessToken,
        refreshToken,
        expires_in,
        profile
      });
      return done();
      // TODO: make a function for this in the user models file
      //   User.findOrCreate({ spotify_uid: profile.id }, function(err, user) {
      //     return done(err, user);
      //   });
    }
  )
);
