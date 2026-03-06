const mongoose = require("mongoose");
const Train = require("./models/Train");

const uri = "mongodb+srv://ab_db_user:Ayush123@cluster1.2yqpnby.mongodb.net/travelapp";

mongoose.connect(uri)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error(err));

const trains = [
  {
    trainName: "Rajdhani Express",
    trainNumber: "12423",
    from: "Delhi",
    to: "Mumbai",
    departureTime: "16:30",
    arrivalTime: "09:20",
    duration: "16h 50m",
    seats: { Sleeper: 50, AC3: 30, AC2: 20, AC1: 10 },
    fare: { Sleeper: 500, AC3: 1200, AC2: 1800, AC1: 2500 }
  },
  {
    trainName: "Shatabdi Express",
    trainNumber: "12010",
    from: "Delhi",
    to: "Lucknow",
    departureTime: "06:00",
    arrivalTime: "12:45",
    duration: "6h 45m",
    seats: { Sleeper: 40, AC3: 25, AC2: 18, AC1: 8 },
    fare: { Sleeper: 300, AC3: 800, AC2: 1100, AC1: 1600 }
  }
];

Train.insertMany(trains)
  .then(() => {
    console.log(" trains inserted successfully!");
    mongoose.disconnect();
  })
  .catch((err) => console.log(err));
