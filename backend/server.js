require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ✅ Sabko lowercase imports mein badal diya (Linux friendly)
const taxiRoutes = require("./routes/taxiRoutes");
const authRoutes = require("./routes/authroutes");
const trainRoutes = require("./routes/trainroutes");
const chatRoutes = require("./routes/chatroutes"); 
const aiRoute = require("./routes/airoutes");
const hotelRoutes = require("./routes/hotelroutes");
const bookingRoutes = require("./routes/bookingroutes");

const app = express();

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

app.use("/api/taxi", taxiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/chat", chatRoutes); 
app.use("/api/ai", aiRoute);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => res.send("Travel App API is Running..."));

app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));