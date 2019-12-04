const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followedArtistsSchema = new Schema({
  spotify_uid: {
    type: String,
    unique: true
  },
  artists: [
    {
      name: {
        type: String
      },
      artist_id: {
        type: String,
        unique: true
      }
    }
  ]
});

mongoose.model("followed_Artists", followedArtistsSchema);
