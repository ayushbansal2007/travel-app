import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chatbot from "./Chatbot";
import { useNavigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import Herosection from "./Herosection";
import HeroLenisSection from "./HeroLenisSection";




gsap.registerPlugin(ScrollTrigger);

export default function HomePage({ user, setUser }) {
  const sectionsRef = useRef([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    ).then(() => setUser(null));
  };

  useEffect(() => {
    gsap.from(".hero-left > *", {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".hero-right", {
      opacity: 0,
      x: 60,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    sectionsRef.current.forEach((el) => {
      gsap.from(el.querySelectorAll(".card"), {
        opacity: 0,
        y: 50,
        scale: 0.96,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });
  }, []);
  useEffect(() => {
    const counters = document.querySelectorAll(".count-up");
  
    counters.forEach((el) => {
      const target = +el.getAttribute("data-target");
  
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          snap: { innerText: 1 },
        }
      );
    });
  }, []);
  useEffect(() => {
  const section = sectionsRef.current[8];
  if (!section) return;

  const mask = section.querySelector(".img-mask");
  const contentA = section.querySelector(".content-a");
  const contentB = section.querySelector(".content-b");

  // initial mask (thoda visible start for smoothness)
  gsap.set(mask, {
    clipPath: "circle(0% at 50% 50%)",
    willChange: "clip-path",
  });

  gsap.set(contentB, { opacity: 0, y: 20 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=90%",          // 🔥 timing kam (120% → 90%)
      scrub: 1,              // 🔥 smooth but fast response
      pin: true,
      anticipatePin: 1,
    },
  });

  // MASK EXPAND (slightly faster + confident)
  tl.to(
    mask,
    {
      clipPath: "circle(80% at 50% 50%)",
      ease: "power1.out",
      duration: 0.6,
    },
    0
  );

  // CONTENT SWITCH (clean, premium)
  tl.to(
    contentA,
    {
      opacity: 0,
      y: -24,
      duration: 0.3,
      ease: "power2.out",
    },
    0.25
  ).to(
    contentB,
    {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    },
    0.45
  );
}, []);
useEffect(() => {
  const section = sectionsRef.current[0];
  if (!section) return;

  const cards = section.querySelectorAll(".spotlight-card");
  let activeIndex = 0;
  let interval;

  // base state
  gsap.set(cards, {
    scale: 0.95,
    opacity: 0.6,
    filter: "brightness(0.85)",
  });

  function spotlight(index) {
    cards.forEach((card, i) => {
      if (i === index) {
        gsap.to(card, {
          scale: 1,
          opacity: 1,
          filter: "brightness(1)",
          y: -10,
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(card, {
          scale: 0.95,
          opacity: 0.6,
          filter: "brightness(0.85)",
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    });
  }

  function startAuto() {
    interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % cards.length;
      spotlight(activeIndex);
    }, 2500);
  }

  // start
  spotlight(0);
  startAuto();

  // hover = user control
  cards.forEach((card, i) => {
    card.addEventListener("mouseenter", () => {
      clearInterval(interval);
      spotlight(i);
    });

    card.addEventListener("mouseleave", () => {
      activeIndex = i;
      startAuto();
    });
  });

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  const section = sectionsRef.current[0];
  if (!section) return;

  const wraps = section.querySelectorAll(".img-wrap");
  const images = section.querySelectorAll(".img-inner");

  wraps.forEach((wrap, i) => {
    gsap.set(images[i], {
      yPercent: -20,
      scale: 1.15,
    });

    gsap.fromTo(
      images[i],
      {
        clipPath: "inset(0 0 100% 0)", // 👈 hidden from bottom
      },
      {
        clipPath: "inset(0 0 0% 0)",   // 👈 wipe reveal
        yPercent: 0,
        scale: 1,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
          trigger: wrap,
          start: "top 85%",
          once: true, // 🔥 no disappear
        },
      }
    );
  });
}, []);
useEffect(() => {
  const section = sectionsRef.current[0];
  if (!section) return;

  const cards = section.querySelectorAll(".card");
  const titles = section.querySelectorAll("h4");

  cards.forEach((card, i) => {
    // card micro parallax
    gsap.to(card, {
      y: -15,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        end: "top 30%",
        scrub: 0.6,   // 🔥 smooth but controlled
      },
    });

    // title subtle reveal (premium feel)
    gsap.fromTo(
      titles[i],
      {
        y: 12,
        opacity: 0.6,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 70%",
          once: true, // 🔥 no disappear
        },
      }
    );
  });
}, []);


useEffect(() => {
  const section = sectionsRef.current[1];
  if (!section) return;

  const cards = section.querySelectorAll(".hotel-card");
  const images = section.querySelectorAll(".hotel-img");
  const prices = section.querySelectorAll(".hotel-price");

  cards.forEach((card, i) => {
    // IMAGE DEPTH (travel feel)
    gsap.fromTo(
      images[i],
      { scale: 1.15, y: 10 },
      {
        scale: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
      }
    );

    // PRICE EMPHASIS (booking psychology)
    gsap.fromTo(
      prices[i],
      { scale: 0.9, opacity: 0.6 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 70%",
          once: true,
        },
      }
    );
  });
}, []);
useEffect(() => {
  const section = sectionsRef.current[1];
  if (!section) return;

  const track = section.querySelector(".hotel-track");
  const cards = section.querySelectorAll(".hotel-card");

  // total scroll distance = cards width - viewport
  const totalWidth =
    cards.length * 360 - window.innerWidth + 20;

  gsap.to(track, {
    x: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      end: `+=${totalWidth}`,
      scrub: 1,
      pin: false, // ❗ no pin = no extra space
      anticipatePin: 1,
    },
  });
}, []);


  

  /* ---------- DATA (TU APNI IMAGE DALEGA) ---------- */
  const destinations = [
    { name: "Goa", image: "https://www.agoda.com/wp-content/uploads/2023/02/North-goa-beaches-things-to-do-in-goa.jpg" },
    { name: "Manali", image: "https://overatours.com/wp-content/uploads/2022/06/Beutifull-Solang-Valley-Shimla-Manali-Tour-Pakcages.jpg" },
    { name: "Jaipur", image: "https://wallpapers.com/images/hd/hawa-mahal-in-jaipur-q5ky7q0bhbrd9vbj.jpg" },
    { name: "Kerala", image: "https://wallpaperaccess.com/full/3185778.jpg" },
    { name: "Mumbai", image: "https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg" },
    { name: "Delhi", image: "https://www.holidify.com/images/bgImages/DELHI.jpg" },
    { name: "Agra", image: "https://tse3.mm.bing.net/th/id/OIP.-9m5NrH4R_fVSIX1ZMoUIgHaFF?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Rishikesh", image: "https://th.bing.com/th/id/R.f2257da2442701aba39349eb1128cc2a?rik=H%2fq3tvjE5DCHDA&riu=http%3a%2f%2frishikesh.net%2fwp-content%2fuploads%2f2019%2f11%2fbigstock-Rishikesh-India-Circa-April-329638714.jpg&ehk=Uptj5ZNmgYbgnXdTnXB21UeyOAYxRd7N2uJYsT4MWHM%3d&risl=1&pid=ImgRaw&r=0" },
    { name: "Udaipur", image: "https://cdn.pixabay.com/photo/2017/05/14/10/45/udaipur-2311788_1280.jpg" },
    { name: "Varanasi", image: "https://rishikeshdaytour.com/wp-content/uploads/2024/09/haridwar-ganga-arti-uttarakhand.jpg" },
    { name: "Shimla", image: "https://static.toiimg.com/photo/msid-102383896,width-96,height-65.cms" },
    { name: "Pune", image: "https://im.whatshot.in/img/2020/Jun/swaminarayan-cropped-1591099308.jpg" },



  ];

  const hotels = [
    { name: "Sea View Resort", price: 2000, image: "https://tse4.mm.bing.net/th/id/OIP.VIpvx9UWKQy4asebA6K2PQHaEp?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Mountain Stay", price: 1800, image: "https://th.bing.com/th/id/R.8392b0e2311352cedbcc92f02e7c11b3?rik=DXc3daZ3m6rgeA&riu=http%3a%2f%2fcache.marriott.com%2fmarriottassets%2fmarriott%2fLONPL%2flonpl-guestroom-0117-hor-clsc.jpg%3finterpolation%3dprogressive-bilinear%26&ehk=WQre5XE1XBiMC2CJR0OZktG3PwF%2fbqWF5%2f6XhpuXfaI%3d&risl=&pid=ImgRaw&r=0" },
    { name: "Luxury Inn", price: 2500, image: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?cs=srgb&dl=wood-hotel-house-1001965.jpg&fm=jpg" },
    { name: "Cozy Cottage", price: 1000, image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?cs=srgb&dl=dug-out-pool-hotel-pool-1134176.jpg&fm=jpg" },
    { name: "Beachfront Villa", price: 3999 , image: "https://wallpaperaccess.com/full/2690589.jpg" },
    {name: "City Center Hotel", price: 2200, image: "https://static.vecteezy.com/system/resources/previews/011/902/980/non_2x/luxury-hotel-with-water-villas-and-palm-tree-leaves-over-white-sand-close-to-blue-sea-seascape-beach-chairs-beds-with-white-umbrellas-summer-vacation-and-holiday-beach-resort-on-tropical-island-photo.jpg" },
    { name: "Mountain Retreat", price: 2700, image: "https://tse4.mm.bing.net/th/id/OIP.VIpvx9UWKQy4asebA6K2PQHaEp?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Cozy Cottage", price: 1000, image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?cs=srgb&dl=dug-out-pool-hotel-pool-1134176.jpg&fm=jpg" },

  ];
const testimonials = [
  {
    name: "Rohit Sharma",
    location: "Delhi",
    review:
      "Travelify ne meri Goa trip ko perfect bana diya. Budget ke andar best hotel aur taxi mil gayi.",
    rating: 5,
  },
  {
    name: "Anjali Verma",
    location: "Mumbai",
    review:
      "Mujhe sabse acha laga ki ek hi jagah se train, hotel aur taxi book ho gayi. Smooth experience!",
    rating: 5,
  },
  {
    name: "Aman Singh",
    location: "Bangalore",
    review:
      "AI planner kaafi accurate tha. Suggested destinations bilkul budget ke hisaab se the.",
    rating: 4,
  },
];

  return (
    <div className="min-h-screen bg-indigo-50 text-gray-900">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center">
              TR
            </div>
            <div>
              <h1 className="font-bold text-lg">Travelify</h1>
              <p className="text-xs text-gray-500">Smart Trip Planner</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 items-center text-sm">
            <Link to="/">Home</Link>
            <Link to="/hotels">Hotels</Link>
            <Link to="/taxi-booking">Taxi</Link>
            <Link to="/train">Trains</Link>

            {user ? (
              <>
                <span className="text-sm">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/SignIn"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Sign in
                </Link>
                <Link
                  to="/SignUp"
                  className="px-4 py-2 ring-1 ring-indigo-600 text-indigo-600 rounded-lg"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <main className="w-full mx-auto px-6 py-20">
        
        {/* ================= MASK REVEAL SCROLL SECTION ================= */}
        <Herosection/>
<section
  ref={(el) => (sectionsRef.current[8] = el)}
  className="relative h-screen overflow-hidden mt-40 rounded-3xl bg-black"
>
  {/* IMAGE 1 */}
  <img
    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    className="absolute inset-0 w-full h-full object-cover img-base"
    alt=""
  />

  {/* IMAGE 2 (MASKED) */}
  <div className="absolute inset-0 img-mask overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
      className="w-full h-full object-cover"
      alt=""
    />
  </div>

  {/* CONTENT */}
  <div className="relative z-10 h-full flex items-center">
    <div className="px-20 max-w-xl text-white">

      <div className="content-a">
        <h2 className="text-6xl font-extrabold leading-tight">
          Escape <br /> The Noise
        </h2>
        <p className="mt-6 text-lg text-white/80">
          Mountains, silence and mindful journeys crafted by AI.
        </p>
      </div>

      <div className="content-b absolute top-0 opacity-0">
        <h2 className="text-6xl font-extrabold leading-tight">
          Chase <br /> The Waves
        </h2>
        <p className="mt-6 text-lg text-white/80">
          Beaches, sunsets and unforgettable coastal experiences.
        </p>
      </div>

    </div>
  </div>
</section>

        

        {/* ================= DESTINATIONS ================= */}
<section ref={(el) => (sectionsRef.current[0] = el)} className="mt-24">
  <h3 className="text-3xl font-bold mb-10">Popular Destinations</h3>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {destinations.map((place, i) => (
      <div
        key={i}
        className="card bg-white rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden"
      >
        <div className="h-44 relative overflow-hidden img-wrap">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover img-inner"
          />
        </div>

        <div className="p-4">
          <h4 className="font-semibold">{place.name}</h4>
          <p className="text-xs text-gray-500">
            Best selling destination
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

  


<HeroLenisSection/>
        {/* ================= HOTELS ================= */}
<section
  ref={(el) => (sectionsRef.current[1] = el)}
  className="mt-28 overflow-hidden"
>
  <h3 className="text-3xl font-bold mb-8 px-2">
    Hotels You’ll Love
  </h3>

  <div className="relative">
    <div className="hotel-track flex gap-6">
      {hotels.map((hotel, i) => (
        <div
          key={i}
          className="card hotel-card min-w-[340px] bg-white rounded-xl shadow-lg ring-1 ring-black/5 flex overflow-hidden"
        >
          <div className="w-36 h-32 bg-gray-200">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 flex-1">
            <h4 className="font-semibold">{hotel.name}</h4>
            <p className="text-xs text-gray-500">
              Prime location • Breakfast
            </p>

            <div className="flex justify-between mt-4">
              <span className="font-semibold">
                ₹{hotel.price}/night
              </span>
              <span className="text-xs text-gray-500">
                4.5 ★
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



        {/* ================= CTA ================= */}
        <section className="mt-32">
          <div className="bg-indigo-600 rounded-3xl p-14 text-white text-center shadow-2xl">
            <h3 className="text-4xl font-bold">
              Ready to Travel Smarter?
            </h3>
            <p className="mt-4 text-indigo-100">
              One platform. Complete trip planning.
            </p>
           <button
  onClick={() => navigate("/ai-planner")}
  className="mt-8 bg-white text-indigo-600 px-10 py-3 rounded-xl font-semibold"
>
  Get Started
</button>
          </div>
        </section>
        <section
  ref={(el) => (sectionsRef.current[3] = el)}
  className="mt-32"
>
  <h3 className="text-3xl font-bold text-center mb-4">
    What Our Travelers Say
  </h3>

  <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
    Thousands of travelers trust Travelify to plan their trips smartly,
    safely and within budget.
  </p>

  <div className="grid md:grid-cols-3 gap-8">
    {testimonials.map((t, i) => (
      <div
        key={i}
        className="card bg-white rounded-2xl shadow-lg ring-1 ring-black/5 p-6"
      >
        {/* STARS */}
        <div className="flex mb-3">
          {Array.from({ length: t.rating }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">★</span>
          ))}
        </div>

        {/* REVIEW */}
        <p className="text-gray-700 text-sm leading-relaxed">
          “{t.review}”
        </p>

        {/* USER */}
        <div className="mt-6">
          <p className="font-semibold">{t.name}</p>
          <p className="text-xs text-gray-500">{t.location}</p>
        </div>
      </div>
    ))}
  </div>
</section>
      



        <section className="mt-32">
  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl px-16 py-24 text-white shadow-2xl">

    {/* HEADER */}
    <div className="max-w-2xl mb-16">
      <p className="text-sm tracking-widest text-indigo-200 font-mono">
        OUR COMMUNITY
      </p>
      <h2 className="text-4xl font-extrabold mt-3">
        Loved by Travelers Across India
      </h2>
      <p className="mt-4 text-indigo-100 leading-relaxed">
        Thousands of users trust Travelify to plan smarter trips using AI,
        real-time data and budget optimization.
      </p>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

      {/* USERS */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10">
        <p className="text-sm font-mono text-indigo-200">
          TOTAL USERS
        </p>
        <p
          className="count-up text-5xl font-extrabold mt-4"
          data-target="25000"
        >
          0
        </p>
        <p className="mt-3 text-sm text-indigo-100">
          Registered travelers on platform
        </p>
      </div>

      {/* TRIPS */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10">
        <p className="text-sm font-mono text-indigo-200">
          TRIPS PLANNED
        </p>
        <p
          className="count-up text-5xl font-extrabold mt-4"
          data-target="12400"
        >
          0
        </p>
        <p className="mt-3 text-sm text-indigo-100">
          AI-generated itineraries
        </p>
      </div>

      {/* STATES */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10">
        <p className="text-sm font-mono text-indigo-200">
          STATES COVERED
        </p>
        <p
          className="count-up text-5xl font-extrabold mt-4"
          data-target="28"
        >
          0
        </p>
        <p className="mt-3 text-sm text-indigo-100">
          Across India
        </p>
      </div>

    </div>
  </div>
</section>


        

        <footer className=" text-black-700 mt-32">
      <div className="w-full mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center">
                TR
              </div>
              <div>
                <h3 className="text-black font-bold text-lg">Travelify</h3>
                <p className="text-xs text-gray-400">Smart Trip Planner</p>
              </div>
            </div>

            <p className="text-sm text-black-400 leading-relaxed">
              Travelify helps you plan smarter trips using AI.  
              Hotels, taxis, trains and destinations — all in one place.
            </p>
          </div>
           <div>
            <h4 className="text-black font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/hotels" className="hover:text-white">Hotels</Link></li>
              <li><Link to="/taxi-booking" className="hover:text-white">Taxi</Link></li>
              <li><Link to="/train" className="hover:text-white">Trains</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer">Contact Us</li>
            </ul>
          </div>
           <div>
            <h4 className="text-black font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 +91 98765 43210</li>
              <li>📧 support@travelify.com</li>
              <li>📍 India</li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-10"></div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-black-400">
          <p>
            © {new Date().getFullYear()} Travelify. All rights reserved.
          </p>
            <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">🌐</span>
            <span className="cursor-pointer hover:text-white">🐦</span>
            <span className="cursor-pointer hover:text-white">📸</span>
            <span className="cursor-pointer hover:text-white">💼</span>
          </div>
        </div>
      </div>
        </footer>
      </main>
         <Chatbot />
    </div>
  );
}
