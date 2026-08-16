"use client"; // falls Next.js App Router

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CountingNumber({ endValue = 100, duration = 2, suffix = "" }) {
  const numberRef = useRef(null);

  useEffect(() => {
    const el = numberRef.current as HTMLSpanElement | null;
    if (!el) return;
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: endValue,
        duration,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%", // startet, wenn Element bei 80% Viewport-Höhe ankommt
          toggleActions: "play none none none",
          // markers: true, // zum Debuggen aktivieren
        },
        onUpdate: () => {
          el.textContent = Math.floor(counter.value) + suffix;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [endValue, duration, suffix]);

  return <span ref={numberRef}>0{suffix}</span>
}