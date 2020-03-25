const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Linked Schemas
const Festivals = mongoose.model('festivals');

const followsSchema = new Schema({
  spotify_uid: {
    type: String
  },
  spotify_email: {
    type: String
  },
  songkick_event_id: {
    type: Number
  },
  follow_type: {
    type: String,
    enum: ['festival', 'artist']
  },
  follow_status: {
    type: Boolean
  }
});

followsSchema.index({ spotify_uid: 1, songkick_event_id: 1 }, { unique: true });

followsSchema.pre('save', () => {});

followsSchema.pre('update', () => {});

mongoose.model('follows', followsSchema);
