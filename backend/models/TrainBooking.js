const mongoose = require("mongoose");

const TrainBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train", required: true },
  classType: { type: String, required: true },
  date: { type: String, required: true },
  fare: { type: Number, required: true },
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TrainBooking", TrainBookingSchema);
