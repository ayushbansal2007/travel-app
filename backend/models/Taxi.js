const mongoose = require("mongoose");

const TaxiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pickup: { type: String, required: true },
  drop: { type: String, required: true },
  carType: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookingTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TaxiBooking", TaxiSchema);
