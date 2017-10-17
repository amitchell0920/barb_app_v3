/*
  I kept this as an example of how to save things, like itineraries, or hair styles, user profile pictures, posts, etc, to users data

*/

// grab the things we need
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a Saved Itineraries schema
const ApptSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        service: {
            type: String,
            required: true
        },
        message: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

let Appointments = mongoose.model('user_appointments', ApptSchema);

module.exports = Appointments;
