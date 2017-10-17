/*
  I kept this as an example of how to save things, like itineraries, or hair styles, user profile pictures, posts, etc, to users data

*/

// grab the things we need
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a Saved Profile schema
const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    image: {
      type: [],
      required: true
    }
  },
  {
    timestamps: true
  }
);

let Profiles = mongoose.model('user_profiles', ProfileSchema);

module.exports = Profiles;
