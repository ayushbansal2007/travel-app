const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");

const mongoURI =
  "mongodb+srv://ab_db_user:Ayush123@cluster1.2yqpnby.mongodb.net/travelapp";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

/* ================= NEW HOTEL DATA ================= */

const hotels = [
  // ================= GOA =================
  {
    name: "Ocean Pearl Resort",
    city: "Goa",
    address: "Baga Beach Road, North Goa",
    pricePerNight: 6500,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d1",
    ],
    amenities: [
      "Beach View",
      "Swimming Pool",
      "Free WiFi",
      "Breakfast Included",
      "Bar & Restaurant",
    ],
    description:
      "Ocean Pearl Resort is a premium beachside hotel located near Baga Beach. Perfect for couples and party lovers, offering modern rooms, sunset views and easy access to Goa nightlife.",
  },
  {
    name: "Golden Sands Beach Resort",
    city: "Goa",
    address: "Calangute Beach, Goa",
    pricePerNight: 7200,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    ],
    amenities: [
      "Private Beach Access",
      "Infinity Pool",
      "Luxury Rooms",
      "Free WiFi",
      "Spa",
    ],
    description:
      "Golden Sands Beach Resort offers a luxury beachfront experience in Calangute. Ideal for honeymooners and families seeking comfort, privacy and ocean views.",
  },
  {
    name: "Palm Breeze Boutique Stay",
    city: "Goa",
    address: "Anjuna, North Goa",
    pricePerNight: 4200,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    ],
    amenities: [
      "Garden View",
      "Free Parking",
      "Breakfast",
      "WiFi",
    ],
    description:
      "Palm Breeze Boutique Stay is a peaceful retreat in Anjuna, surrounded by palm trees. Ideal for travelers looking for a calm, budget-friendly and cozy Goan stay.",
  },

  // ================= MANALI =================
  {
    name: "Mountain View Inn",
    city: "Manali",
    address: "Old Manali, Himachal Pradesh",
    pricePerNight: 3000,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    ],
    amenities: [
      "Mountain View",
      "Heater",
      "Free Breakfast",
      "Bonfire",
    ],
    description:
      "Mountain View Inn is a cozy hotel located in Old Manali, offering breathtaking Himalayan views. Ideal for backpackers and nature lovers seeking peace and comfort.",
  },
  {
    name: "Snow Peak Chalet",
    city: "Manali",
    address: "Hadimba Road, Manali",
    pricePerNight: 6200,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    ],
    amenities: [
      "Snow View",
      "Luxury Rooms",
      "Heater",
      "Room Service",
    ],
    description:
      "Snow Peak Chalet is a luxury mountain hotel near Hadimba Temple. Known for elegant interiors, snow-covered views and premium comfort for couples.",
  },
  {
    name: "Himalayan Bliss Resort",
    city: "Manali",
    address: "Solang Valley Road, Manali",
    pricePerNight: 4800,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
    ],
    amenities: [
      "Valley View",
      "Adventure Activities",
      "Breakfast Included",
      "Parking",
    ],
    description:
      "Himalayan Bliss Resort is located near Solang Valley and is perfect for adventure seekers. Enjoy scenic views, snow activities and warm hospitality.",
  },
];

/* ================= SEED FUNCTION ================= */

async function seedHotels() {
  try {
    await Hotel.deleteMany(); // ❌ delete old data
    await Hotel.insertMany(hotels); // ✅ insert new data

    console.log("🔥 Goa & Manali hotels seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
}

seedHotels();
