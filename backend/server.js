require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes
const taxiRoutes = require("./routes/TaxiRoutes");
const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const chatRoutes = require("./routes/ChatRoutes");
const aiRoute = require("./routes/aiRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// 🔹 CORS: Live URL aur Localhost dono allow karo
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ROUTES
app.use("/api/taxi", taxiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/chat", chatRoutes); 
app.use("/api/ai", aiRoute);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// Health Check (Live hone ke baad check karne ke liye)
app.get("/", (req, res) => res.send("Travel App API is Running..."));

// 404 & Error Handler
app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// 🔹 Port: Render/Railway dynamic port dete hain
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));