"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import Link from "next/link";

import { SectionHeading, TextReveal } from "./ui/Typography";
import { Project } from "../utils/interface";
import ProjectDialog from "./ProjectDialog";
import { ArrowUpRight } from "./ui/Icons";
import Filters from "./filters";
import { useVariants } from "../utils/hooks";
import { SlideIn, Transition } from "./ui/Transitions";

interface ProjectsProps {
  projects: Project[];
}

function Projects({ projects }: ProjectsProps) {
  // **Ensure you have this useState hook defined:**
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filterValue, setFilterValue] = useState<string>("all");
  const [showMore, setShowMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const numProjectToShow = 6;

  const applyFilters = (data: Project[], filterValue: string): Project[] => {
    if (filterValue === "all" || !filterValue) {
      return data;
    }
    return data.filter((project) => project.projectCategories.includes(filterValue));
  };

  useEffect(() => {
    setFilteredProjects(applyFilters(projects, filterValue));
  }, [projects, filterValue]);

  return (
    <section className="md:p-8 p-4 mt-10 relative" id="projects"> {/* Responsive section padding */}
      <SectionHeading className="md:pl-12">
        <SlideIn className="text-white/40">Selected</SlideIn>
        <br />
        <SlideIn>works</SlideIn>
      </SectionHeading>
      <Filters
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />

      {/* Responsive Grid Columns and Gap */}
      <motion.div className="grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-4 relative"> {/* Updated grid-cols and gap */}
        {filteredProjects
          .slice(0, showMore ? filteredProjects.length : numProjectToShow)
          .map((project, index) => (
            <Transition
              transition={{ delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              key={project._id}
              layoutId={project._id}
              onClick={() => {
                setSelectedProject(project);
              }}
            >
              <Card {...project} />
            </Transition>
          ))}
        <AnimatePresence>
          {selectedProject && (
            <div className="rounded-lg cursor-pointer absolute inset-0 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col">
              <ProjectDialog
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="grid place-items-center py-8">
        {filteredProjects.length > numProjectToShow && (
          <button
            className="flex items-center justify-center gap-4 py-3 px-6 rounded-full border mt-6 group relative overflow-hidden"
            onClick={() => setShowMore(!showMore)}
          >
            <TextReveal>{showMore ? "Show less" : "Show more"}</TextReveal>
          </button>
        )}
      </div>
    </section>
  );
}

export default Projects;

const Card = ({ title, image, description }: Project) => {
  const [hover, setHover] = useState(false);
  const { setVariant } = useVariants();

  const mouseEnter = () => {
    setHover(true);
    setVariant("PROJECT");
  };
  const mouseLeave = () => {
    setHover(false);
    setVariant("DEFAULT");
  };

  return (
    <motion.div
    layout
    className="relative rounded-xl md:rounded-3xl overflow-hidden bg-gray-800 border border-gray-700 shadow-lg transition-shadow duration-300 hover:shadow-xl md:px-6 px-4 py-4 flex flex-col h-auto min-h-[300px] md:min-h-[350px]"
    onMouseEnter={mouseEnter}
    onMouseLeave={mouseLeave}
  >
    {/* Top Right Icon (Mobile - Adjusted for Better Spacing) */}
    <div className="absolute top-3 right-3 md:hidden z-10">
      <div className="bg-white/90 size-7 rounded-full text-black grid place-items-center shadow-md">
        <ArrowUpRight />
      </div>
    </div>

    {/* Title & Button Container */}
    <div className="md:py-3 relative flex flex-col gap-2 flex-grow-0">
      <motion.div className="flex justify-between items-start">
        {/* Ensure Title is Always Visible */}
        <p className="text-lg md:text-2xl font-semibold text-white break-words">
          {title}
        </p>

        {/* Visit Button - Added `md:flex` to hide on mobile */}
        <button className="hidden md:flex gap-2 items-center justify-center group border border-gray-700 rounded-md transition-colors duration-300 hover:border-indigo-500 px-3 py-1.5">
          <TextReveal className="text-gray-300 group-hover:text-white transition-colors duration-300">
            Visit
          </TextReveal>
          <span className="bg-white/90 text-black rounded-full p-1.5 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
            <ArrowUpRight />
          </span>
        </button>
      </motion.div>
    </div>

    {/* Image Area - Ensures Proper Spacing */}
    <motion.div
      layout
      className="overflow-hidden rounded-xl md:rounded-2xl mt-4 relative flex-grow"
      animate={{ scale: hover ? 1.1 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.img
        layout
        src={image.url}
        alt={title}
        className="object-cover w-full h-[180px] md:h-[250px] rounded-xl md:rounded-2xl transition-transform duration-500 grayscale-0 hover:grayscale hover:translate-y-[-4px]"
      />
      <motion.div
        layout
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"
      />
    </motion.div>
    </motion.div>

  );
};
