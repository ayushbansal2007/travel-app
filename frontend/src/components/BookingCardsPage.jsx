import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import gsap from "gsap";

const TABS = ["All", "Active", "Completed", "Cancelled"];

const BookingCardsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.from(".ride-card", {
        opacity: 0,
        y: 25,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [loading, tab]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/taxi/my-bookings",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this ride?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/taxi/cancel/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(bookings.filter((b) => b._id !== id));
    } catch {
      alert("Failed to cancel ride");
    }
  };

  /* ---------- STATUS HANDLING ---------- */
  const getStatus = (b) => b.status || "Completed";

  const statusColor = (status) => {
    if (status === "Active") return "bg-blue-100 text-blue-700";
    if (status === "Cancelled") return "bg-red-100 text-red-700";
    return "bg-green-100 text-green-700";
  };

  /* ---------- FILTER ---------- */
  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const statusMatch =
        tab === "All" ? true : getStatus(b) === tab;

      const searchMatch =
        b.pickup.toLowerCase().includes(search.toLowerCase()) ||
        b.drop.toLowerCase().includes(search.toLowerCase());

      return statusMatch && searchMatch;
    });
  }, [bookings, tab, search]);

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-4 py-10">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Your Trips</h1>
        <p className="text-gray-500">All your rides in one place</p>
      </div>

      {/* TABS */}
      <div className="max-w-5xl mx-auto flex gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition
              ${
                tab === t
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 ring-1 ring-black/5"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div className="max-w-5xl mx-auto mb-8">
        <input
          placeholder="Search by pickup or drop"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl ring-1 ring-black/5 focus:ring-2 focus:ring-black"
        />
      </div>

      {/* LIST */}
      <div className="max-w-5xl mx-auto space-y-6">

        {/* LOADING */}
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            🚕 No rides found
          </div>
        )}

        {!loading &&
          filtered.map((b) => {
            const status = getStatus(b);

            return (
              <div
                key={b._id}
                className="ride-card bg-white rounded-3xl shadow-md ring-1 ring-black/5 p-6"
              >
                {/* TOP */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold capitalize">
                      {b.carType} Ride
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(b.bookingTime).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${statusColor(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </div>

                {/* MAP PREVIEW */}
                <div className="h-28 rounded-xl bg-gray-100 mb-4 flex items-center justify-center text-gray-400 text-sm">
                  Map Preview
                </div>

                {/* ROUTE */}
                <div className="flex gap-4 text-sm mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <div className="w-px flex-1 bg-gray-300 my-1" />
                    <div className="w-2 h-2 bg-black rounded-full" />
                  </div>

                  <div className="space-y-3">
                    <p>
                      <span className="text-gray-500">Pickup</span><br />
                      <span className="font-medium">{b.pickup}</span>
                    </p>
                    <p>
                      <span className="text-gray-500">Drop</span><br />
                      <span className="font-medium">{b.drop}</span>
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">₹{b.price}</p>

                  {status !== "Cancelled" && (
                    <button
                      onClick={() => handleCancel(b._id)}
                      className="text-sm px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
                    >
                      Cancel Ride
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BookingCardsPage;
