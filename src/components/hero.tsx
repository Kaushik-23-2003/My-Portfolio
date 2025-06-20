"use client";

import Link from "next/link";
import { motion } from "motion/react"; 

import { About } from "../utils/interface";
import { cn } from "../utils/cn"; 
import { SectionHeading, TextReveal } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";
import { ArrowUpRight, DownloadIcon } from "./ui/Icons";
import LoaderWrapper from "./LoaderWrapper";

interface HeroProps {
  about: About;
}

const Hero = ({ about }: HeroProps) => {
  return (
    <section className="h-dvh w-dvw overflow-hidden relative">
      <Transition>
        <span className="blob size-1/2 absolute top-20 left-0 blur-[100px]" />
      </Transition>
      <LoaderWrapper>
        <div className="relative h-full w-full">
          <div className="flex items-center justify-center flex-col h-full pb-10">
            <Transition>
              <img
                src="/hero.jpg"
                alt={about.name}
                className="rounded-full size-28 object-cover"
              />
            </Transition>
            <div className="py-6 flex items-center flex-col">
              <h2 className="md:text-7xl text-2xl font-bold overflow-hidden text-center w-full">
                <SlideIn>Hello! I&apos;m {about.name}</SlideIn> 
              </h2>
              <h1 className="md:text-6xl text-xl overflow-hidden text-center w-full">
                <SlideIn>{about.title}</SlideIn>
              </h1>
            </div>
            <Transition viewport={{ once: true }} className="w-full">
              <p className="opacity-70 md:text-xl py-4 w-10/12 md:w-2/3 mx-auto flex flex-wrap justify-center gap-2">
                {about.subTitle.split(" ").map((word, index) => (
                  <span key={index}>{word}</span>
                ))}
              </p>
            </Transition>

            <Transition viewport={{ once: true }}>
              <motion.a
                href="/resume.pdf"
                download="Hariharan_Kaushik_Resume.pdf"
                className="px-5 py-3 mt-4 rounded-full border border-white/50 flex items-center gap-2 group" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-base tracking-wider mr-2">Fetch My Resume ( )</span>
                <DownloadIcon /> 
              </motion.a>
            </Transition>
          </div>
        </div>
      </LoaderWrapper>
    </section>
  );
};

export default Hero;
