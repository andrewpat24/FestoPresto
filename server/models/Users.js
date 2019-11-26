const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  spotify_uid: {
    type: String,
    unique: true
  },
  spotify_access_token: {
    type: String,
    unique: true
  },
  spotify_refresh_token: {
    type: String,
    unique: true
  }
});

mongoose.model("users", userSchema);
