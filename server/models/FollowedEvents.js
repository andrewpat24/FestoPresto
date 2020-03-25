const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followedEventsSchema = new Schema({
  spotify_uid: {
    type: String
  },
  spotify_email: {
    type: String
  },
  songkick_event_id: {
    type: Number
  }
});

followedEventsSchema.index(
  { spotify_uid: 1, songkick_event_id: 1 },
  { unique: true }
);

mongoose.model('followed_events', followedEventsSchema);
