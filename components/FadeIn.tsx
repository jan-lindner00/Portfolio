"use client"
import { useEffect, useRef } from "react";

export default function FadeIn({ children, delay = 0, className = "" }: 
    { children: React.ReactNode; delay?: number; className?: string }
) {
    const ref = useRef<HTMLDivElement>(null);
    
      useEffect(() => {
        const node = ref.current;
        if (!node) return;
    
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              node.classList.add("is-visible");
              observer.unobserve(node);
            }
          },
          { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );
    
        observer.observe(node);
        return () => observer.disconnect();
      }, []);
    
      return (
        <div
          ref={ref}
          className={`fade-in ${className}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {children}
        </div>
      )
}