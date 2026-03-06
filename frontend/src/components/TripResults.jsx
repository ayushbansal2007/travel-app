import React from "react";
import { useNavigate } from "react-router-dom";

export default function TripResults() {
  const navigate = useNavigate();
  const plan = JSON.parse(localStorage.getItem("tripPlan"));

  if (!plan) return <div>No plan</div>;

  // AUTO TAXI
  const taxi = {
    type: plan.mode === "cab" ? "Private Cab" : "Station Taxi",
    price: Math.round(plan.breakup.travel),
  };
  localStorage.setItem("selectedTaxi", JSON.stringify(taxi));

  const hotels = [
    { id: 1, name: "Beach Resort", price: 12000 },
    { id: 2, name: "City Hotel", price: 9000 },
    { id: 3, name: "Budget Stay", price: 7000 },
  ];

  const maxHotelPrice = plan.breakup.hotel / plan.days;
  const filteredHotels = hotels.filter(
    (h) => h.price <= maxHotelPrice
  );

  return (
    <div className="min-h-screen bg-indigo-50 p-10">

      <h2 className="text-3xl font-bold mb-6">
        Hotels in {plan.destination}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold">{hotel.name}</h3>
            <p>₹{hotel.price}/night</p>

            <button
              onClick={() => {
                localStorage.setItem(
                  "selectedHotel",
                  JSON.stringify(hotel)
                );
                navigate("/hotel-booking");
              }}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              Book Hotel
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-3">
          Places You Can Visit
        </h3>
        <ul className="list-disc ml-6">
          <li>Baga Beach</li>
          <li>Calangute</li>
          <li>Anjuna</li>
          <li>Fort Aguada</li>
        </ul>
      </div>
    </div>
  );
}
