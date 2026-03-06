import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function generateBudget(budget, mode) {
  const total = Number(budget);
  return {
    travel: mode === "cab" ? total * 0.25 : total * 0.15,
    hotel: total * 0.45,
    food: total * 0.15,
    misc: total * 0.15,
  };
}

export default function TripPlanner() {
  const navigate = useNavigate();
  const trip = JSON.parse(localStorage.getItem("tripInput"));

  const [mode, setMode] = useState("");
  const [days, setDays] = useState(3);

  if (!trip) return <div>No trip data</div>;

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-4">
          Trip to {trip.destination}
        </h2>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("train")}
            className={`flex-1 py-3 rounded-xl ${
              mode === "train" ? "bg-indigo-600 text-white" : "bg-gray-100"
            }`}
          >
            🚆 Train
          </button>

          <button
            onClick={() => setMode("cab")}
            className={`flex-1 py-3 rounded-xl ${
              mode === "cab" ? "bg-indigo-600 text-white" : "bg-gray-100"
            }`}
          >
            🚕 Cab
          </button>
        </div>

        <input
          type="number"
          min="1"
          max="7"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mb-6"
          placeholder="Days"
        />

        <button
          onClick={() => {
            if (!mode) return alert("Select travel mode");

            const breakup = generateBudget(trip.budget, mode);

            localStorage.setItem(
              "tripPlan",
              JSON.stringify({
                ...trip,
                days,
                mode,
                breakup,
              })
            );

            navigate("/trip-results");
          }}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
