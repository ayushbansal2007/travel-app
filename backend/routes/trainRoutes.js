const express = require("express");
const router = express.Router();
const Train = require("../models/Train");
const TrainBooking = require("../models/TrainBooking");
const auth = require("../middleware/auth"); // JWT Middleware

// 🔍 SEARCH TRAINS
router.get("/search", async (req, res) => {
  const { from, to, date } = req.query;

  try {
    const trains = await Train.find({ from, to });
    res.json(trains);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🚆 BOOK TRAIN
router.post("/book", auth, async (req, res) => {
  const { trainId, classType, date } = req.body;

  try {
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ error: "Train not found" });

    const fare = train.fare[classType];
    const seatAvailable = train.seats[classType];

    if (seatAvailable <= 0)
      return res.status(400).json({ error: "No seats available!" });

    // reduce seat
    train.seats[classType] -= 1;
    await train.save();

    const booking = await TrainBooking.create({
      userId: req.user.userId,
      trainId,
      classType,
      date,
      fare
    });

    res.json({ message: "Train booked!", booking });
  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
});

// 📚 USER BOOKINGS
router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await TrainBooking.find({ userId: req.user.userId })
      .populate("trainId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching bookings" });
  }
});

// ❌ CANCEL BOOKING
router.delete("/cancel/:id", auth, async (req, res) => {
  try {
    await TrainBooking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ error: "Cancel failed" });
  }
});

module.exports = router;
