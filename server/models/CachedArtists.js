const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cachedArtists = new Schema({
    artist_name: {
        type: String
    },
    spotify_id: {
        type: String,
        unique: true
    },
    spotify_url: {
        type: String
    },
    songkick_id: {
        type: String
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
