import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Herosection() {
  const heroLeftRef = useRef(null);
  const heroRightRef = useRef(null);

  useEffect(() => {
    if (!heroLeftRef.current || !heroRightRef.current) return;

    const onScroll = () => {
      const scrollY = window.scrollY;

      gsap.to(heroLeftRef.current, {
        y: scrollY * 0.06,
        ease: "none",
        overwrite: true,
      });

      gsap.to(heroRightRef.current, {
        y: scrollY * 0.1,
        ease: "none",
        overwrite: true,
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="grid lg:grid-cols-2 gap-14 items-center min-h-[70vh]">
      
      {/* LEFT */}
      <div ref={heroLeftRef} className="hero-left space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold ring-1 ring-indigo-200">
          🤖 AI Powered Trip Planner
        </div>

        <h2 className="text-5xl font-extrabold leading-tight">
          Plan Your Trip <br /> The Smart Way
        </h2>

        <p className="text-lg text-gray-600 max-w-md">
          Destination, budget aur dates daalo — Travelify hotels, taxi
          aur sightseeing sab plan kar deta hai.
        </p>

        <div className="card bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl ring-1 ring-black/5 space-y-4">
          <input
            placeholder="Destination"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-600"
          />
          <input
            placeholder="Budget (₹)"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-600"
          />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">
            Plan My Trip
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div
        ref={heroRightRef}
        className="hero-right card bg-white rounded-3xl shadow-xl ring-1 ring-black/5 overflow-hidden"
      >
        <div className="h-64 w-full bg-gray-200">
          <img
            src="https://scubadivingadventure.in/images/goa-tour/395ee502-fortaguada_13_11zon.webp"
            alt="Trip"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold">Goa Weekend Trip</h3>
          <p className="text-sm text-gray-500">3 Nights • Beach • Party</p>

          <div className="flex items-center mt-4">
            <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full">
              ₹9,999
            </span>
            <button className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded-lg">
              View
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Herosection;
