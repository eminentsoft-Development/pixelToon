// components/ScrollReveal.jsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "" 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animates only once
        }
      },
      { rootMargin: "-50px" } // Triggers slightly before it comes into view
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Determine starting position based on direction
  const getTransform = () => {
    if (isVisible) return "translate-y-0 translate-x-0";
    switch (direction) {
      case "up": return "translate-y-12";
      case "down": return "-translate-y-12";
      case "left": return "-translate-x-12";
      case "right": return "translate-x-12";
      default: return "";
    }
  };

  return (
    <div
      ref={ref}
      style={{ 
        transitionDelay: `${delay}ms`, 
        transitionDuration: '700ms' 
      }}
      className={`transition-all ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}