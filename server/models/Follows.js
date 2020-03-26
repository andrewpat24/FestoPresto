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
  songkick_id: {
    type: String
  },
  follow_type: {
    type: String,
    enum: ['festival', 'artist']
  },
  follow_status: {
    type: Boolean,
    default: true
  }
});

followsSchema.index({ spotify_uid: 1, songkick_id: 1 }, { unique: true });

followsSchema.post('save', async follow => {
  const filter = { songkick_id: follow.songkick_id };
  const update = { $inc: { follow_count: 1 } };
  await Festivals.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  });
});

followsSchema.post('findOneAndUpdate', async follow => {
  const incAmount = !!follow.follow_status ? 1 : -1;

  const filter = { songkick_id: follow.songkick_id };
  const update = { $inc: { follow_count: incAmount } };
  await Festivals.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  });
});

mongoose.model('follows', followsSchema);
