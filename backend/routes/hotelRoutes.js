const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

/*
  GET /api/hotels
  Optional query params:
  - city=Goa
  - maxPrice=5000
*/

router.get("/", async (req, res) => {
  try {
    const { city, maxPrice } = req.query;

    const query = {};

    // ✅ City filter (case-insensitive exact match)
    if (city) {
      query.city = { $regex: new RegExp(`^${city}$`, "i") };
    }

    // ✅ Budget filter (optional)
    if (maxPrice) {
      query.pricePerNight = { $lte: Number(maxPrice) };
    }

    const hotels = await Hotel.find(query).sort({ rating: -1 });

    res.status(200).json(hotels);
  } catch (err) {
    console.error("Hotel fetch error:", err);
    res.status(500).json({ message: "Failed to fetch hotels" });
  }
});

module.exports = router;
