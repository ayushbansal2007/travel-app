import React from "react";
import { useLocation ,useNavigate } from "react-router-dom";

export default function TrainResultsPage() {
  const location = useLocation();
  const trains = location.state?.trains || [];
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6">Available Trains</h1>

      {trains.length === 0 ? (
        <p className="text-gray-600 text-lg">No trains found.</p>
      ) : (
        <div className="grid gap-6">
          {trains.map((train) => (
            <div
              key={train._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{train.trainName}</h2>
                <span className="text-gray-600 text-sm">
                  {train.trainNumber}
                </span>
              </div>

              <p className="mt-2 text-gray-700 text-lg">
                {train.from} → {train.to}
              </p>

              <div className="flex gap-10 mt-4">
                <div>
                  <p className="font-semibold">{train.departureTime}</p>
                  <p className="text-gray-500 text-sm">Departure</p>
                </div>
                <div>
                  <p className="font-semibold">{train.arrivalTime}</p>
                  <p className="text-gray-500 text-sm">Arrival</p>
                </div>
                <div>
                  <p className="font-semibold">{train.duration}</p>
                  <p className="text-gray-500 text-sm">Duration</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
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

              <button
  onClick={() => {
    navigate("/train-ticket", { state: { train } });
  }}
  className="mt-5 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
>
  Book Now
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
