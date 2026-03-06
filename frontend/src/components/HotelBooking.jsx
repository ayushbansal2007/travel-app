import React, { useEffect, useState } from "react";
import axios from "axios";
import Lenis from "@studio-freight/lenis";

export default function HotelBooking() {
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));

  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  /* ✅ SAFE LENIS (NO GSAP, NO LAG) */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        No hotel selected
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🔒 GUEST LIMIT (MAX 2)
    if (name === "guests") {
      const num = Math.min(2, Math.max(1, Number(value)));
      setForm({ ...form, guests: num });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      hotelId: hotel._id,
      hotelName: hotel.name,
      pricePerNight: hotel.pricePerNight,
      ...form,
    };

    try {
     await axios.post("http://localhost:5000/api/bookings", bookingData);

// booking data save rahe
localStorage.setItem("bookingData", JSON.stringify(bookingData));

// 👉 direct payment page
window.location.href = "/payment";
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">

        {/* 🏨 HOTEL SUMMARY */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden">
          <img
            src={hotel.images?.[0]}
            alt={hotel.name}
            className="w-full h-72 object-cover"
          />

          <div className="p-8 space-y-4">
            <h2 className="text-3xl font-extrabold text-indigo-600">
              {hotel.name}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {hotel.description}
            </p>

            <div className="flex justify-between items-center pt-4">
              <span className="text-2xl font-bold text-indigo-600">
                ₹{hotel.pricePerNight} / night
              </span>
              <span className="text-sm text-gray-500">
                ⭐ {hotel.rating}
              </span>
            </div>
          </div>
        </div>

        {/* 📝 BOOKING FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl space-y-6"
        >
          <h3 className="text-2xl font-bold text-gray-800">
            Complete Your Booking
          </h3>

          <input
            name="userName"
            placeholder="Your Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none"
          />

          <input
            name="userEmail"
            type="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none"
          />

          <input
            name="userPhone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="checkIn"
              required
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
            <input
              type="date"
              name="checkOut"
              required
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <input
            type="number"
            name="guests"
            min="1"
            max="2"
            value={form.guests}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none"
            placeholder="Guests (Max 2)"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold tracking-wide shadow-lg"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
