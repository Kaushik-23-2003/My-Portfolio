"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "motion/react";

import { Project } from "../utils/interface";
import { ExternalLink, Github, XMark } from "./ui/Icons";

interface DialogProps {
  selectedProject: Project;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>;
}

const ProjectDialog = ({
  selectedProject,
  setSelectedProject,
}: DialogProps) => {
  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    };

    const enableScroll = () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };

    disableScroll();

    return () => {
      enableScroll();
    };
  }, []);

  const getParagraphs = (description: string) => {
    if (!description) return [];
    return description
      .split("$")
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0);
  };

  const descriptionParagraphs = getParagraphs(selectedProject.description);

  return (
    <motion.div
      layoutId={selectedProject._id}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 md:p-0 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
    >
      <motion.div
        className="bg-gray-900 text-white w-full md:w-11/12 lg:w-[70%] xl:w-1/2 rounded-xl max-h-[90vh] shadow-2xl flex flex-col"
        style={{ maxHeight: "95vh" }}
      >
        <div className="relative">
          <button
            className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 size-8 rounded-full border border-white/20 grid place-items-center text-white transition-colors z-10"
            onClick={() => setSelectedProject(null)}
          >
            <XMark />
          </button>
          <div className="h-40 md:h-48 overflow-hidden mb-5 relative">
            <img
              src={selectedProject.image.url}
              width={300}
              height={300}
              alt={selectedProject.title}
              className="w-full h-full aspect-video md:aspect-[12/6] object-cover object-center"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow overflow-y-auto ">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                {selectedProject.title}
              </h3>
              <div className="flex items-center gap-4">
                <Link
                  href={selectedProject.githuburl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span className="hover:text-indigo-500 transition-colors">
                    <Github />
                  </motion.span>
                </Link>
                <Link
                  href={selectedProject.liveurl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span className="hover:text-indigo-500 transition-colors">
                    <ExternalLink />
                  </motion.span>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap mt-1">
              {selectedProject.techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium border border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="text-gray-400 leading-relaxed break-words text-lg">
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDialog;
