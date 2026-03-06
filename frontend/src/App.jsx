import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import HomePage from "./components/HomePage";
import HotelCard from "./components/HotelCard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TaxiBooking from "./components/TaxiBooking";
import BookingCardsPage from "./components/BookingCardsPage";
import TrainBooking from "./components/TrainBooking";
import TrainResultsPage from "./components/TrainResultsPage";
import AIPlanner from "./components/AIPlanner";
import HotelBooking from "./components/HotelBooking";
import Payment from "./components/Payment";
import TripPlanner from "./components/TripPlanner";
import TripResults from "./components/TripResults";
import HotelDetails from "./components/HotelDetails";
import TrainTicket from "./components/TrainTicket";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // 🔐 Check logged-in user on app load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoadingUser(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }, []);

  // ⏳ Optional loading state
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking login...
      </div>
    );
  }

  const testHotel = {
    hotelName: "Snow View Resort",
    hotelPrice: 4500,
    image: "https://picsum.photos/300",
    places: ["Mall Road", "Kufri", "The Ridge"],
    description: "Best budget friendly hotel.",
  };

  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={<HomePage user={user} setUser={setUser} />}
      />

      {/* Hotels */}
      <Route
        path="/hotels"
        element={<HotelCard hotel={testHotel} />}
      />

      {/* Auth */}
      <Route
        path="/signin"
        element={<SignIn setUser={setUser} />}
      />
      <Route
        path="/signup"
        element={<SignUp setUser={setUser} />}
      />

      {/* Taxi */}
      <Route
        path="/taxi-booking"
        element={<TaxiBooking />}
      />

      {/* Bookings */}
      <Route
        path="/bookings"
        element={<BookingCardsPage />}
      />

      {/* Train */}
      <Route
        path="/train"
        element={<TrainBooking />}
      />
      <Route
        path="/train-results"
        element={<TrainResultsPage />}
      />

      {/* 🤖 AI Trip Planner */}
      <Route
        path="/ai-planner"
        element={<AIPlanner user={user} />}
      />
      <Route path="/hotel-booking" element={<HotelBooking />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/trip-planner" element={<TripPlanner />} />
<Route path="/trip-results" element={<TripResults />} />
<Route path="/hotel-details" element={<HotelDetails />} />
<Route path="/train-ticket" element={<TrainTicket />} />


    </Routes>
  );
}

export default App;
