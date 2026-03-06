import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";

export default function HotelCard() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cityInput, setCityInput] = useState("");
  const [budgetInput, setBudgetInput] = useState("");

  const cardsRef = useRef([]);

  /* ================= FETCH HOTELS ================= */
  const fetchHotels = async (city, budget) => {
    setLoading(true);

    let url = "http://localhost:5000/api/hotels";
    const params = new URLSearchParams();

    if (city) params.append("city", city);
    if (budget) params.append("maxPrice", budget);

    if ([...params].length > 0) {
      url += `?${params.toString()}`;
    }

    try {
      const res = await axios.get(url, { withCredentials: true });
      setHotels(res.data);
    } catch (err) {
      console.error("Hotel fetch error", err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetchHotels();
  }, []);

  /* ================= APPLY FILTER ================= */
  const handleApply = () => {
    const cleanCity = cityInput.trim().toLowerCase(); // 🔥 FIX
    const cleanBudget = budgetInput ? Number(budgetInput) : "";

    fetchHotels(cleanCity, cleanBudget);
  };

  /* ================= CARD ANIMATION ================= */
  useEffect(() => {
    cardsRef.current = [];

    hotels.forEach((_, i) => {
      const card = cardsRef.current[i];
      if (!card) return;

      gsap.fromTo(
        card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: i * 0.06,
          ease: "power3.out",
        }
      );
    });
  }, [hotels]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading hotels...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 pb-24">

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-600">
            Hotels For Your Trip
          </h1>
          <a href="/" className="px-5 py-2 bg-indigo-600 text-white rounded-xl">
            Back
          </a>
        </div>
      </header>

      {/* FILTER */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow flex flex-wrap gap-4">
          <input
            placeholder="Enter city (Goa, Manali...)"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-50 border"
          />

          <input
            type="number"
            placeholder="Max budget (₹)"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            className="w-48 px-4 py-3 rounded-lg bg-gray-50 border"
          />

          <button
            onClick={handleApply}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl"
          >
            Search
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {hotels.length === 0 && (
          <div className="col-span-full text-center text-gray-600 text-lg">
            No hotels found for this search.
          </div>
        )}

        {hotels.map((hotel, i) => (
          <div
            key={hotel._id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden
                       transition hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={hotel.images?.[0]}
                alt={hotel.name}
                className="w-full h-full object-cover transition duration-500
                           group-hover:scale-110"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <h2 className="font-semibold">{hotel.name}</h2>
                <div className="text-right">
                  <p className="font-bold text-indigo-600">
                    ₹{hotel.pricePerNight}/night
                  </p>
                  <p className="text-xs text-gray-500">
                    {hotel.rating} ★
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3">
                {hotel.description}
              </p>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => {
                    localStorage.setItem("selectedHotel", JSON.stringify(hotel));
                    window.location.href = "/hotel-booking";
                  }}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-xl"
                >
                  Book Now
                </button>
                <button
  onClick={() => {
    localStorage.setItem("hotelDetails", JSON.stringify(hotel));
    window.location.href = "/hotel-details";
  }}
  className="flex-1 border rounded-xl py-2"
>
  Details
</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
