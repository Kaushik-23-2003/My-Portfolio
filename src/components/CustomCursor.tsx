"use client";

import { motion, useMotionValue, useSpring, Variants, useMotionValueEvent } from "framer-motion";
import { useEffect } from "react";
import { useVariants } from "../utils/hooks";

function CustomCursor() {
  const { variant } = useVariants();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 100 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursorX.set(e.clientX - (variant === "PROJECT" ? 32 : 8));
        cursorY.set(e.clientY - (variant === "PROJECT" ? 32 : 8));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [variant, cursorX, cursorY]); // **Fixed Dependency Warning**

  // **Use Variants Object for Animation States**
  const variants: Variants = {
    DEFAULT: { width: 16, height: 16, border: "1px solid white" },
    PROJECT: { height: 100, width: 100 },
    BUTTON: { opacity: 0 },
    TEXT: { height: 100, width: 100, backgroundColor: "transparent", border: "1px solid white" },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 bg-white mix-blend-difference z-50 rounded-full pointer-events-none grid place-items-center max-md:hidden"
      variants={variants}
      animate={variant}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      {variant === "PROJECT" && <div className="text-black">OPEN</div>}
    </motion.div>
  );
}

export default CustomCursor;
