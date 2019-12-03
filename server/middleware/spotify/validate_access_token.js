// Spotify dependencies
const SpotifyWebApi = require("spotify-web-api-node");

// Mongoose
const mongoose = require("mongoose");
const User = mongoose.model("users");

// .env imports
const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri

// spotify initialization
const spotifyApi = new SpotifyWebApi({
  client_id,
  client_secret,
  redirect_uri
});

// Exported middleware function
const saveForLater = (req, res, next) => {
  const accessToken = "";
  const refreshToken = "";

  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);

  // a simple call (to get current user info) to check if the access token is still valid.
  spotifyApi.getMe().then(
    function(data) {
      console.log("Some information about the authenticated user", data.body);
      next();
    },
    function(err) {
      spotifyApi.refreshAccessToken().then(
        async data => {
          console.log("The access token has been refreshed!");
          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body["access_token"]);
          const newAccessToken = data.body["access_token"];

          // Update access token in db
          await User.findOneAndUpdate(
            { spotify_access_token: accessToken },
            { spotify_access_token: newAccessToken }
          );
          next();
        },
        err => {
          console.log("Could not refresh access token", err);
        }
      );
    }
  );
};

// TODO: Implement above code in here...
// Issue #22
module.exports = (req, res, next) => {
  next();
};
