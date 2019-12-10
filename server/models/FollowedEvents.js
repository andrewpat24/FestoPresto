const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followedEventsSchema = new Schema({
  spotify_uid: {
    type: String
  },
  event_id: {
    type: String
  },
  identifier: {
    unique: true,
    type: String
  }
});

mongoose.model("followed_events", followedEventsSchema);
