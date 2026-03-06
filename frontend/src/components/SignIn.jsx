import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import videoSrc from "../video/sign.mp4";

export default function SignIn({ setUser }) { // ✅ Receive setUser from App
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token); 
      

      // ✅ Update App state with logged-in user
      setUser(res.data.user);

      navigate("/"); // ✅ redirect to home so HomePage sees updated user
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative w-full max-w-md bg-white/15 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl text-white font-semibold text-center">Welcome Back</h1>
        <p className="text-center text-gray-200 mt-1 text-sm">Sign in to continue your journey</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-white/90 text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:ring-1 focus:ring-white/70 outline-none"
            />
          </div>

          <div>
            <label className="text-white/90 text-sm">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:ring-1 focus:ring-white/70 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-200 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-300 text-sm text-center mt-2">{error}</p>}

          <div className="flex justify-end">
            <button className="text-gray-200 text-sm hover:text-white">Forgot Password?</button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white/20 border border-white/30 text-white font-medium backdrop-blur-sm hover:bg-white/25 transition"
          >
            Sign In
          </button>

          <p className="text-center text-gray-200 text-sm mt-4">
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-white underline cursor-pointer"
            >
              Create an account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
