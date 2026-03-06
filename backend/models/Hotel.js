const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: String,
    pricePerNight: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    images: [String],
    amenities: [String],
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
