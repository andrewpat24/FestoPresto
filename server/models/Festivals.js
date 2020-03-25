const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const festivalSchema = new Schema({
  songkick_id: {
    type: Number
  },
  num_likes: {
    type: Number
  }
});

mongoose.model('festivals', festivalSchema);
