const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  trainNumber: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, required: true },

  seats: {
    Sleeper: { type: Number, default: 50 },
    AC3: { type: Number, default: 30 },
    AC2: { type: Number, default: 20 },
    AC1: { type: Number, default: 10 }
  },

  fare: {
    Sleeper: { type: Number, default: 300 },
    AC3: { type: Number, default: 800 },
    AC2: { type: Number, default: 1200 },
    AC1: { type: Number, default: 2000 }
  }
});

module.exports = mongoose.model("Train", TrainSchema);
