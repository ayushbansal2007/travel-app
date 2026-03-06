import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

export default function TrainBooking() {
  const navigate = useNavigate();
  const coachRef = useRef(null);
  const engineRef = useRef(null);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    classType: "Sleeper",
  });

  const steps = [
    { label: "From Station", name: "from", type: "text", placeholder: "e.g. New Delhi" },
    { label: "To Station", name: "to", type: "text", placeholder: "e.g. Mumbai" },
    { label: "Journey Date", name: "date", type: "date" },
    {
      label: "Class",
      name: "classType",
      type: "select",
      options: ["Sleeper", "AC3", "AC2", "AC1"],
    },
  ];

  const s = steps[step];

  /* ---------------- LENIS SMOOTH SCROLL ---------------- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  /* ---------------- ANIMATIONS ---------------- */
  useEffect(() => {
    gsap.from(engineRef.current, {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(coachRef.current, {
      x: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    gsap.from(".coach-content", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [step]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextCoach = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevCoach = () => {
    if (step > 0) setStep(step - 1);
  };

  const searchTrains = async () => {
    const res = await fetch(
      `http://localhost:5000/api/trains/search?from=${form.from}&to=${form.to}&date=${form.date}`
    );
    const data = await res.json();

    navigate("/train-results", { state: { trains: data, form } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-6 overflow-hidden">

      <div className="flex items-center gap-8">

        {/* 🚂 ENGINE */}
        <div
          ref={engineRef}
          className="w-52 h-52 bg-black rounded-2xl text-white flex flex-col items-center justify-center shadow-2xl relative"
        >
          <div className="text-8xl animate-bounce">🚂</div>
          <p className="text-xs tracking-widest mt-2">ENGINE</p>

          <div className="absolute bottom-2 flex gap-6">
            <div className="wheel"></div>
            <div className="wheel"></div>
          </div>
        </div>

        {/* CONNECTOR */}
        <div className="w-12 h-4 bg-gray-700 rounded-md"></div>

        {/* 🚆 COACH */}
        <div
          ref={coachRef}
          className="relative w-[420px] bg-[#e5e5e5] rounded-2xl shadow-2xl ring-2 ring-gray-700 p-6"
        >
          {/* Yellow Strip */}
          <div className="w-full h-3 bg-yellow-400 rounded mb-4"></div>

          {/* Windows */}
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 bg-gray-900 rounded-md"></div>
            ))}
          </div>

          {/* STEP INDICATOR */}
          <p className="text-center text-gray-700 font-semibold mb-4">
            Coach S3 • Step {step + 1} / {steps.length}
          </p>

          {/* FORM */}
          <div className="coach-content text-center">
            <label className="block font-semibold mb-3">{s.label}</label>

            {s.type === "select" ? (
              <select
                name={s.name}
                value={form[s.name]}
                onChange={handleChange}
                className="w-64 p-3 rounded-lg bg-white shadow focus:ring-2 focus:ring-indigo-600"
              >
                {s.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                type={s.type}
                name={s.name}
                placeholder={s.placeholder}
                value={form[s.name]}
                onChange={handleChange}
                className="w-64 p-3 rounded-lg bg-white shadow focus:ring-2 focus:ring-indigo-600"
              />
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button
                onClick={prevCoach}
                className="px-5 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 transition"
              >
                Back
              </button>
            ) : <span />}

            {step < steps.length - 1 ? (
              <button
                onClick={nextCoach}
                className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={searchTrains}
                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Search Trains
              </button>
            )}
          </div>

          {/* Wheels */}
          <div className="absolute bottom-2 w-full flex justify-between px-10">
            <div className="wheel"></div>
            <div className="wheel"></div>
          </div>
        </div>
      </div>

      {/* EXTRA CSS */}
      <style>{`
        .wheel {
          width: 22px;
          height: 22px;
          background: black;
          border-radius: 50%;
          border: 2px solid white;
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
