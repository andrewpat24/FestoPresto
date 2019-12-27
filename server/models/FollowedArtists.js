const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followedArtistsSchema = new Schema({
  artist_id: {
    type: String
  },
  artist_name: {
    type: String
  },
  spotify_uid: {
    type: String
  },
  // Identifier: spotify_uid + "_" + artist_id
  identifier: {
    type: String,
    unique: true
  }
});

mongoose.model("followed_Artists", followedArtistsSchema);
