import React, { useState } from "react";

export default function Payment() {
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));

  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        No booking data found
      </div>
    );
  }

  const totalAmount = hotel.pricePerNight + 299;

  const isUpiValid = upi.includes("@");
  const isCardValid =
    card.number.length >= 12 &&
    card.expiry.length >= 4 &&
    card.cvv.length >= 3 &&
    card.name.length >= 3;

  const canPay =
    (method === "upi" && isUpiValid) ||
    (method === "card" && isCardValid) ||
    method === "wallet";

  const handlePay = () => {
    setProcessing(true);

    // 🔥 simulate real gateway delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      localStorage.removeItem("selectedHotel");
    }, 2500);
  };

  /* ================= SUCCESS SCREEN ================= */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="bg-white text-center text-gray-800 p-10 rounded-3xl shadow-2xl max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-extrabold mb-2">
            Payment Successful
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Your hotel booking is confirmed
          </p>

          <div className="border rounded-xl p-4 mb-6 text-left text-sm">
            <p><strong>Hotel:</strong> {hotel.name}</p>
            <p><strong>Amount:</strong> ₹{totalAmount}</p>
            <p><strong>Status:</strong> Paid</p>
          </div>

          <a
            href="/"
            className="inline-block w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* ================= PAYMENT ================= */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-extrabold mb-6">
            Secure Payment
          </h2>

          {/* METHODS */}
          <div className="flex gap-4 mb-8">
            {[
              { id: "upi", label: "UPI" },
              { id: "card", label: "Card" },
              { id: "wallet", label: "Wallet" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex-1 py-3 rounded-xl font-semibold transition
                  ${
                    method === m.id
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-gray-100 text-gray-600"
                  }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* UPI */}
          {method === "upi" && (
            <div className="space-y-4">
              <input
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                placeholder="yourname@upi"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none"
              />
              <p className="text-xs text-gray-500">
                A payment request will be sent to your UPI app
              </p>
            </div>
          )}

          {/* CARD */}
          {method === "card" && (
            <div className="space-y-4">
              <input
                placeholder="Card Number"
                value={card.number}
                onChange={(e) =>
                  setCard({ ...card, number: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-gray-50"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="MM / YY"
                  value={card.expiry}
                  onChange={(e) =>
                    setCard({ ...card, expiry: e.target.value })
                  }
                  className="px-4 py-3 rounded-xl bg-gray-50"
                />
                <input
                  placeholder="CVV"
                  value={card.cvv}
                  onChange={(e) =>
                    setCard({ ...card, cvv: e.target.value })
                  }
                  className="px-4 py-3 rounded-xl bg-gray-50"
                />
              </div>

              <input
                placeholder="Card Holder Name"
                value={card.name}
                onChange={(e) =>
                  setCard({ ...card, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-gray-50"
              />
            </div>
          )}

          {/* WALLET */}
          {method === "wallet" && (
            <div className="space-y-3">
              {["Paytm", "PhonePe", "Amazon Pay"].map((w) => (
                <div
                  key={w}
                  className="border rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                >
                  <span className="font-semibold">{w}</span>
                  <span>→</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="bg-white rounded-3xl shadow-xl p-8 h-fit">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Hotel</span>
              <span className="font-semibold">{hotel.name}</span>
            </div>

            <div className="flex justify-between">
              <span>Price / night</span>
              <span>₹{hotel.pricePerNight}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span>₹299</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-indigo-600">₹{totalAmount}</span>
            </div>
          </div>

          <button
            disabled={!canPay || processing}
            onClick={handlePay}
            className={`w-full mt-8 py-4 rounded-xl font-semibold shadow-lg
              ${
                canPay
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {processing ? "Processing Payment..." : "Pay ₹" + totalAmount}
          </button>

          <p className="text-xs text-gray-400 mt-4 text-center">
            🔒 100% secure payment • Powered by Travelify
          </p>
        </div>
      </div>
    </div>
  );
}
