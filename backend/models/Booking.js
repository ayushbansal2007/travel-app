const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    hotelName: String,
    pricePerNight: Number,

    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },

    checkIn: Date,
    checkOut: Date,
    guests: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
