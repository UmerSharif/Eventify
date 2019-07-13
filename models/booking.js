const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event" // reference to event model
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User" // reference to user model
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
