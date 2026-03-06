import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AIPlanner({ user }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlan = async () => {
    if (!prompt) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/plan",
        {
          prompt,
          userName: user?.name,
        },
        { withCredentials: true }
      );

      setResponse(res.data.result);
    } catch (err) {
      setResponse("❌ AI planning failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-20">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-xl">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            🤖 AI Trip Planner {user?.name && `for ${user.name}`}
          </h1>
          <Link to="/" className="text-indigo-600 font-semibold">
            ← Back
          </Link>
        </div>

        <textarea
          rows="4"
          placeholder="Describe your ideal trip (destinations, interests, budget, etc.)"
          className="w-full p-4 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={handlePlan}
          className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          {loading ? "Planning your trip..." : "Generate Plan"}
        </button>

        {response && (
          <div className="mt-6 bg-indigo-50 p-6 rounded-xl whitespace-pre-line text-sm">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}
