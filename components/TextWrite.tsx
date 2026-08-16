"use client";

import { useRef, useEffect, Fragment } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

export default function TypewriterText({ lines = [], speed = 0.1, className = "" }:
 { lines: string[]; speed?: number; className?: string }
) {
  const headingRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current as HTMLHeadingElement | null;
    if(!heading) return;
    const lineEls = heading.querySelectorAll(".line");
    if(lineEls.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          once: true
        },
      });

      lineEls.forEach((lineEl) => {
        const text = lineEl.textContent ?? "";
        gsap.set(lineEl, { text: "" });

        tl.to(lineEl, {
          duration: text.length * speed,
          text: text,
          ease: "none"
        });
      });
    }, heading);

    return () => ctx.revert();
  }, [lines, speed]);

  return (
    <h1 ref={headingRef} className={className}>
      {lines.map((line, i) => (
        <Fragment key={line}>
            <span className={`line ${i === 1 || i === 2 ? "text-lightgreen-500" : ""}`}>
                {line}
                {i===2 && <span className="text-neutral-50">,</span>}
            </span>
            <br></br>
        </Fragment>
     ))}
    </h1>
  );
}