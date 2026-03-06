import React from "react";

export default function HotelDetails() {
  const hotel = JSON.parse(localStorage.getItem("hotelDetails"));

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No hotel details found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-16">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* IMAGE */}
        <div className="h-80 w-full">
          <img
            src={hotel.images?.[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-6">

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">
                {hotel.name}
              </h1>
              <p className="text-gray-500 mt-1">
                📍 {hotel.address}, {hotel.city}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">
                ₹{hotel.pricePerNight}
              </p>
              <p className="text-sm text-gray-500">per night</p>
              <p className="text-sm mt-1">⭐ {hotel.rating}</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              About this hotel
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* AMENITIES */}
          {hotel.amenities?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-3">
                {hotel.amenities.map((a, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={() => {
                localStorage.setItem("selectedHotel", JSON.stringify(hotel));
                window.location.href = "/hotel-booking";
              }}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-semibold"
            >
              Book Now
            </button>

            <button
              onClick={() => window.history.back()}
              className="flex-1 border py-4 rounded-xl font-semibold"
            >
              Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
