const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const festivalSchema = new Schema({
  songkick_id: {
    type: String,
    unique: true
  },
  follow_count: {
    type: Number,
    default: 0,
    min: 0
  }
});

mongoose.model('festivals', festivalSchema);
