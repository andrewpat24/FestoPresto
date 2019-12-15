const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  creator_uid: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  links: [
    {
      title: {
        type: String
      },
      url: {
        type: String
      }
    }
  ],
  // If this is a multi-day or weekend event, we can pass multiple "event_dates" to this property.
  event_date: [
    {
      type: String
    }
  ],
  location: {
    type: String
  },
  followers: [
    {
      spotify_uid: {
        type: String
      }
    }
  ],
  lineup: [
    {
      name: {
        type: String
      },
      details: {
        type: String
      },
      genre: {
        type: String
      },
      image: {
        type: String
      },
      follower_count: {
        type: Number
      },
      popularity: {
        type: Number
      },
      artist_uri: {
        type: String
      },
      showtime_details: [
        {
          set_length: {
            type: String
          },
          showtime: {
            type: String
          },
          stage: {
            type: String
          }
        }
      ]
    }
  ]
});

mongoose.model("events", eventsSchema);
