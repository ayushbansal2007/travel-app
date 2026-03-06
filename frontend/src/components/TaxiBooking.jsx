import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from "./CustomAlert";  // <-- IMPORT ALERT

const TaxiBooking = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    carType: "",
  });

  const [error, setError] = useState(null);
  const [alertShow, setAlertShow] = useState(false); // <-- ALERT STATE
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/taxi/book",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // SHOW CUSTOM ALERT
      setAlertShow(true);

    } catch (err) {
      console.error("Axios Error:", err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      {/* MAIN LAYOUT */}
      <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-between px-10 py-16">

        {/* LEFT FORM SECTION */}
        <div className="w-full lg:w-1/2 pr-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-indigo-600 leading-tight">
            Need taxi cab <br /> service in your city?
          </h1>

          <p className="text-gray-600 mt-4 text-lg max-w-lg">
            Enjoy the flexibility of a taxi cab combined with premium ride features.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-4 max-w-md">

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black"
            />

            <div className="flex items-center space-x-3 bg-gray-100 border border-gray-300 rounded-xl p-4">
              <span className="w-4 h-4 bg-black rounded-full"></span>
              <input
                type="text"
                name="pickup"
                value={form.pickup}
                onChange={handleChange}
                placeholder="Enter pickup location"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-3 bg-gray-100 border border-gray-300 rounded-xl p-4">
              <span className="w-4 h-4 border-4 border-black rounded-full"></span>
              <input
                type="text"
                name="drop"
                value={form.drop}
                onChange={handleChange}
                placeholder="Enter destination"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            <select
              name="carType"
              value={form.carType}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black text-gray-700"
            >
              <option value="">Select Car Type</option>
              <option value="Mini">Mini</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
            </select>

            <button
              type="submit"
              className="w-full md:w-40 bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition-all"
            >
              Book Now
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <img
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=1344/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85N2QwMmI1MC0xYzFkLTQ5ZmUtODhlYy0yMjNiMjM4MGY5M2UuanBn"
            alt="Taxi passenger"
            className="rounded-2xl shadow-2xl w-[500px] object-cover"
          />
        </div>

      </div>

      {/* CUSTOM ALERT POPUP */}
      <CustomAlert
        show={alertShow}
        title="Ride Booked Successfully!"
        message="Your taxi has been booked. You can check details in My Bookings."
        onClose={() => {
          setAlertShow(false);
          navigate("/bookings");
        }}
      />
    </>
  );
};

export default TaxiBooking;
