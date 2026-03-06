const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// 🔹 CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({
      message: "Hotel booked successfully",
      booking,
    });
  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
});

module.exports = router;
