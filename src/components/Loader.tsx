"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { OpacityTransition, Transition } from "./ui/Transitions";

interface PageLoadProps {
  setHideLoader: (value: boolean) => void;
}

const Loader = ({ setHideLoader }: PageLoadProps) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const count = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 100) {
          return prevCounter + 2;
        } else {
          clearInterval(count);
          return prevCounter;
        }
      });
    }, 25);

    return () => clearInterval(count);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ delay: 2.5, duration: 1, type: "tween" }}
      onAnimationComplete={() => setHideLoader(false)}
      className="fixed top-0 left-0 z-[9999] w-full h-full bg-background"
    >
      <div className="p-4 md:p-10 flex flex-col md:justify-between max-md:gap-8 w-full h-full">
        <Transition transition={{ delay: 0.2 }}>
          <span className="font-semibold text-white/40">Kaushik&apos;s Portfolio</span>
        </Transition>
        <div className="flex flex-col max-md:justify-between max-md:h-full">
          <Transition transition={{ delay: 0.7 }}>
            <div
              className="text-3xl md:text-5xl w-full md:w-2/5 whitespace-pre-wrap font-semibold text-white tracking-tight leading-relaxed"
              style={{ wordBreak: "break-word" }}
            >
              <OpacityTransition>
                I develop full-stack web apps and create AI-powered solutions.
              </OpacityTransition>
            </div>
          </Transition>
          <div className="flex justify-between items-end">
            <span className="text-white/30">Loading...</span>
            <motion.span className="md:text-9xl text-7xl font-semibold md:font-bold">
              {counter}%
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
