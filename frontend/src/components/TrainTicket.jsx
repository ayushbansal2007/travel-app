import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TrainTicket() {
  const location = useLocation();
  const navigate = useNavigate();

  const train = location.state?.train;

  if (!train) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No ticket data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-indigo-600 text-white p-6">
          <h1 className="text-2xl font-bold">Train Ticket</h1>
          <p className="text-sm opacity-90">
            {train.trainName} • {train.trainNumber}
          </p>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-6">

          {/* ROUTE */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">From</p>
              <p className="font-semibold text-lg">{train.from}</p>
              <p className="text-indigo-600">{train.departureTime}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold">{train.duration}</p>
            </div>

            <div className="text-right">
              <p className="text-gray-500 text-sm">To</p>
              <p className="font-semibold text-lg">{train.to}</p>
              <p className="text-indigo-600">{train.arrivalTime}</p>
            </div>
          </div>

          <hr />

          {/* SEATS */}
          <div>
            <h3 className="font-semibold mb-3">Seat Availability</h3>
            <div className="flex flex-wrap gap-3">
              {Object.keys(train.seats).map((cls) => (
                <span
                  key={cls}
                  className={`px-4 py-2 rounded-full text-sm ${
                    train.seats[cls] > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {cls}: {train.seats[cls] > 0 ? "Available" : "Full"}
                </span>
              ))}
            </div>
          </div>

          <hr />

          {/* PASSENGER (DEMO) */}
          <div>
            <h3 className="font-semibold mb-2">Passenger</h3>
            <p className="text-gray-600">1 Adult • General</p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => alert("🎉 Ticket booked successfully (Demo)")}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex-1 border py-3 rounded-xl font-semibold"
            >
              Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
