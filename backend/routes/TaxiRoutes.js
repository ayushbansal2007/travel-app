const express = require("express");
const router = express.Router();
const TaxiBooking = require("../models/Taxi");
const auth = require("../middleware/auth");

// -------------------------------------------
// 👉 CREATE TAXI BOOKING (JWT PROTECTED)
// -------------------------------------------
router.post("/book", auth, async (req, res) => {
  try {
    const { name, phone, pickup, drop, carType } = req.body;

    if (!name || !phone || !pickup || !drop || !carType) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    
    let price = 0;
    switch (carType.toLowerCase()) {
      case "sedan":
        price = 500;
        break;
      case "suv":
        price = 800;
        break;
      case "mini":
        price = 300;
        break;
      default:
        price = 400;
    }
    

    const newBooking = await TaxiBooking.create({
      name,
      phone,
      pickup,
      drop,
      carType,
      price,
      userId: req.user.userId, // 🔥 Auto from JWT
    });

    res.status(201).json({
      message: "Taxi booked successfully!",
      booking: newBooking,
    });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ error: "Booking failed", details: err.message });
  }
});


// -------------------------------------------
// 👉 GET USER'S OWN BOOKING HISTORY
// -------------------------------------------
router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await TaxiBooking.find({ userId: req.user.userId })
      .sort({ bookingTime: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "Error fetching records", details: err.message });
  }
});


// -------------------------------------------
// 👉 CANCEL BOOKING (Only your own booking)
// -------------------------------------------
router.delete("/cancel/:id", auth, async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await TaxiBooking.findOne({
      _id: bookingId,
      userId: req.user.userId, // 🔥 Only delete your booking
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found or not yours" });
    }

    await booking.deleteOne();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    console.error("Cancel Error:", err);
    res.status(500).json({ error: "Failed to cancel booking", details: err.message });
  }
});

module.exports = router;
