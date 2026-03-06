import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import videoSrc from "../video/signup.mp4";

export default function SignUp({ setUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ SIGNUP
      await axios.post("http://localhost:5000/api/auth/signup", form);

      // 2️⃣ AUTO LOGIN
      const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", loginRes.data.token);
      setUser(loginRes.data.user);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🎥 VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✨ GLASS CARD */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">

        {/* Heading */}
        <h1 className="text-4xl text-white font-bold text-center drop-shadow-lg">
          Create Account
        </h1>
        <p className="text-center text-gray-200 mt-1 text-sm">
          Join Travelify today
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* NAME */}
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-4 pl-12 bg-white/20 text-white rounded-xl 
              border border-white/30 placeholder-gray-300
              focus:ring-2 focus:ring-white focus:bg-white/30 outline-none transition"
            />
            <span className="absolute left-4 top-4 text-white/80 text-lg"></span>
          </div>

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-4 pl-12 bg-white/20 text-white rounded-xl 
              border border-white/30 placeholder-gray-300
              focus:ring-2 focus:ring-white focus:bg-white/30 outline-none transition"
            />
            <span className="absolute left-4 top-4 text-white/80 text-lg"></span>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 pl-12 bg-white/20 text-white rounded-xl 
              border border-white/30 placeholder-gray-300
              focus:ring-2 focus:ring-white focus:bg-white/30 outline-none transition"
            />
            <span className="absolute left-4 top-4 text-white/80 text-lg"></span>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-300 text-center text-sm mt-1">{error}</p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-white/20 border border-white/30 text-white 
            font-semibold rounded-xl backdrop-blur-sm hover:bg-white/30 transition"
          >
            Sign Up
          </button>

          {/* Switch to Sign In */}
          <p className="text-center text-gray-200 text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-white underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
