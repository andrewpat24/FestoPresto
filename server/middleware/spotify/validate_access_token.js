// Spotify dependencies
const SpotifyWebApi = require("spotify-web-api-node");

// Mongoose
const mongoose = require("mongoose");
const User = mongoose.model("users");

// Moment
const moment = require("moment");

// .env imports
const clientId = process.env.SPOTIFY_CLIENT_ID; // Your client id
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri

// spotify initialization
const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri
});

// Exported middleware function
module.exports = async (req, res, next) => {
  const { access_token } = req.body;
  const currentUser = await User.findOne({
    spotify_access_token: access_token
  });

  if (currentUser === null)
    res.status(400).send({
      message: "This access token is invalid",
      path: "validate_access_token middleware",
      currentUser
    });

  const accessTokenExpiration = currentUser.spotify_access_token_expiration;
  const refreshToken = currentUser.spotify_refresh_token;
  const tokenIsExpired = moment().isSameOrAfter(moment(accessTokenExpiration));

  if (tokenIsExpired) {
    spotifyApi.setRefreshToken(refreshToken);

    const refreshTokenRequest = await spotifyApi.refreshAccessToken();
    const newAccessToken = refreshTokenRequest.body.access_token;
    const expiresIn = refreshTokenRequest.body.expires_in;
    const newExpiration = moment().add(expiresIn, "seconds")._d;

    const filter = { spotify_access_token: access_token };
    const update = {
      spotify_access_token: newAccessToken,
      spotify_access_token_expiration: newExpiration
    };

    try {
      await User.findOneAndUpdate(filter, update);
      req.body.access_token = newAccessToken;
      console.log("Access token has been updated!");
    } catch (err) {
      req.body.access_token = "EXPIRED";
      res.status(400).send({
        err,
        message: "An error occurred while updating the user's access token."
      });
    }
  }

  next();
};
