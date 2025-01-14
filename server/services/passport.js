// Passport imports
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

// Moment
const moment = require('moment');

// .env imports
const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri

// Mongoose
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    access_token: user.accessToken,
    email: user.email
  });
});

passport.deserializeUser((spotify_user, done) => {
  User.findOne({ spotify_uid: spotify_user.id }, (err, user) => {
    if (err) {
      console.log('err:', e);
      throw new Error(err);
    }

    if (user === null) {
      return done(null, {
        id: '0',
        access_token: '0',
        email: '0'
      });
    }
    return done(null, {
      id: user.spotify_uid,
      access_token: user.spotify_access_token,
      email: user.email
    });
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      const accessTokenExpirationDate = moment().add(expires_in, 'seconds');
      User.findOne({ spotify_uid: profile.id }, (err, user) => {
        if (!user) {
          const newUser = new User({
            spotify_uid: profile.id,
            spotify_access_token: accessToken,
            spotify_access_token_expiration: accessTokenExpirationDate,
            spotify_refresh_token: refreshToken,
            display_name: profile.displayName,
            email: profile.emails[0].value,
            photos: profile.photos
          });

          newUser.save(err => {
            if (err) {
              console.log('Error saving new user.. : ', err);
              throw new Error(err);
            }
            return done(null, { ...profile, accessToken });
          });
        } else {
          return done(null, { ...profile, accessToken });
        }
      });
    }
  )
);
