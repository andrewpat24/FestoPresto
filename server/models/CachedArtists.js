const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cachedArtists = new Schema({
  artist_name: {
    type: String
  },
  spotify_id: {
    type: String,
    role: {
      default: 'no_spotify_profile'
    }
  },
  spotify_url: {
    type: String
  },
  songkick_id: {
    type: Number,
    unique: true
  },
  songkick_url: {
    type: String
  },
  img: {
    type: String
  },
  genres: [
    {
      type: String
    }
  ],
  popularity: {
    type: Number
  },
  followers: {
    type: Number
  }
});

mongoose.model('cached_artists', cachedArtists);
