import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroLenisSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    /* ---------------- LENIS ---------------- */
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* 🔥 CONNECT LENIS + GSAP */
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({
      scroller: document.body,
    });

    /* ---------------- LINE ANIMATION ---------------- */
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      }
    );

    /* ---------------- CONTENT ANIMATION ---------------- */
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      }
    );

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] mt-32 rounded-3xl bg-[#0b1220] overflow-hidden flex items-center"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      {/* LINE */}
      <div
        ref={lineRef}
        className="absolute left-20 right-20 top-1/2 h-[3px] bg-sky-400 origin-left"
      />

      {/* DOTS */}
      <div className="absolute left-20 top-1/2 w-4 h-4 bg-sky-400 rounded-full" />
      <div className="absolute right-20 top-1/2 w-4 h-4 bg-sky-400 rounded-full" />

      {/* CONTENT */}
      <div ref={contentRef} className="relative z-10 px-20 max-w-xl text-white">
        <span className="tracking-widest text-sm text-sky-300">
          TRAVEL FLOW
        </span>

        <h2 className="text-5xl font-extrabold mt-4 leading-tight">
          One Route. <br /> One Experience.
        </h2>

        <p className="mt-6 text-lg text-white/80">
          From planning to destination — everything connected in one smooth
          journey.
        </p>

        <button className="mt-8 px-8 py-3 bg-sky-400 text-black rounded-xl font-semibold">
          Start Journey
        </button>
      </div>
    </section>
  );
}
