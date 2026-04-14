import React, { useRef, useLayoutEffect, useState } from 'react';
import { 
  motion, useScroll, useSpring, useTransform, 
  useMotionValue, useVelocity, useAnimationFrame 
} from 'framer-motion';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// --- KOMPONEN SCROLL VELOCITY (INTERNAL) ---
function useElementWidth(ref) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) setWidth(ref.current.offsetWidth);
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);
  return width;
}

const ScrollVelocity = ({
  texts = [],
  velocity = 100,
  className = '',
  numCopies = 6,
}) => {
  function VelocityText({ children, baseVelocity, className }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
    const copyRef = useRef(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min, max, v) {
      const range = max - min;
      return ((((v - min) % range) + range) % range) + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      if (velocityFactor.get() < 0) directionFactor.current = -1;
      else if (velocityFactor.get() > 0) directionFactor.current = 1;
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div className="parallax-container">
        <motion.div className="scroller-track" style={{ x }}>
          {[...Array(numCopies)].map((_, i) => (
            <span className={className} key={i} ref={i === 0 ? copyRef : null}>
              {children}&nbsp;
            </span>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <section className="scroll-velocity-bg">
      <style>{`
        .scroll-velocity-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }
        .parallax-container {
          display: flex;
          white-space: nowrap;
          overflow: hidden;
        }
        .scroller-track {
          display: flex;
          white-space: nowrap;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(3rem, 12vw, 12rem);
          font-weight: 900;
          text-transform: uppercase;
        }
        
        /* WARNA OUTLINE ADAPTIF: Hanya Pinggiran */
        .adaptive-outline-text {
          /* Bagian tengah huruf menjadi transparan */
          color: transparent; 
          
          /* Memberikan warna pinggiran adaptif (currentColor mengikuti foreground) */
          -webkit-text-stroke: 1px hsl(var(--foreground)); 
          
          /* Sedikit opasitas agar tetap samar dan elegan */
          opacity: 0.15; 
          
          padding-right: 40px;
          transition: -webkit-text-stroke-color 0.3s ease; /* Transisi halus saat ganti tema */
        }
      `}</style>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className="adaptive-outline-text"
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

// --- MAIN APP COMPONENT ---
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      {/* BACKGROUND LAYER DENGAN OUTLINE ADAPTIF */}
      <ScrollVelocity 
        texts={["Visual Designer", "Web Developer", "Abyan Portfolio"]} 
        velocity={30}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;