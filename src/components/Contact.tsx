// Contact.tsx
"use client";

import { AnimatePresence, motion, px } from "motion/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { About, SocialHandle } from "../utils/interface";
import { cn } from "../utils/cn";
import Link from "next/link";
import { SectionHeading, TextReveal } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";
import { Input, Textarea } from "./ui/Input";
import { sendEmail } from "@/actions/sendEmail";
import toast from "react-hot-toast";
import {
  Instagram,
  LinkedIn,
  Twitter,
  Github,
} from "./ui/Icons";

import "./ui/ContactButtons.css";

interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}

const Contact = ({ email, social_handle, about }: ContactProps) => {
  const [status, setStatus] = useState<"SENDING" | "DONE" | "ERROR" | "IDLE">("IDLE");
  const [statusText, setStatusText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [hoverStates, setHoverStates] = useState({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleMouseEnter = (platform: string) => {
    setHoverStates(prevState => ({ ...prevState, [platform]: true }));
  };

  const handleMouseLeave = (platform: string) => {
    setHoverStates(prevState => ({ ...prevState, [platform]: false }));
  };

  const socialPlatformConfig = {
    Instagram: { icon: Instagram, bgColor: "instagram-gradient", textColor: "text-white" },
    LinkedIn: { icon: LinkedIn, bgColor: "linkedin", textColor: "text-white" },
    Twitter: { icon: Twitter, bgColor: "x", textColor: "text-fdfdfd" }, // Corrected textColor to match CSS
    GitHub: { icon: Github, bgColor: "github", textColor: "text-white" },
  };

  return (
    <motion.section className="relative" id="contact">
      <AnimatePresence initial={false}>
        {status !== "IDLE" && (
          <motion.li
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={cn(
              "fixed top-4 right-4 p-2 px-4 w-[300px] z-50 h-16 rounded-xl bg-white flex items-center",
              status === "ERROR" ? "bg-red-500" : status === "DONE" ? "bg-green-400" : ""
            )}
          >
            <p className="text-black font-semibold">{statusText}</p>
          </motion.li>
        )}
      </AnimatePresence>
      <span className="blob size-1/2 absolute top-20 right-0 blur-[100px] -z-10" />
      <div className="p-4 md:p-8 md:px-16">
        <SectionHeading className="">
          <SlideIn className="text-white/40">Interested in talking,</SlideIn>  <br /> 
          let’s do it.
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-10 md:pt-16">
          {/* Contact Form */}
          <form  className="space-y-4" action={async (formData) => {
              setStatus("SENDING");
              const result = await sendEmail(formData);
              setStatus("IDLE");

              if (result?.error) {
                setStatusText(result.error);
                setStatus("ERROR");
                toast.error(result.error);
              } else if (result?.success) {
                setStatusText(result.success);
                setStatus("DONE");
                toast.success(result.success);
                setFormData({ email: "", message: "", name: "", subject: "" });
              }
            }}
          >
            <div className="flex gap-4">
              <Transition className="w-full">
                <Input id="name" name="name" placeholder="Full name" className="border-0 border-b rounded-none" required value={formData.name} onChange={handleInputChange} />
              </Transition>
              <Transition className="w-full">
                <Input id="email" name="email" placeholder="Email" type="email" className="border-0 border-b rounded-none" required value={formData.email} onChange={handleInputChange} />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Input id="subject" name="subject" placeholder="Enter the subject" className="border-0 border-b rounded-none" required value={formData.subject} onChange={handleInputChange} />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Textarea className="min-h-[100px] rounded-none border-0 border-b resize-none" id="message" name="message" placeholder="Enter your message" required value={formData.message} onChange={handleInputChange} />
              </Transition>
            </div>
            <div>
              <Transition>
                <motion.button
                  whileHover="whileHover"
                  initial="initial"
                  className="border border-white/30 px-8 py-2 rounded-3xl relative overflow-hidden"
                  type="submit"
                  disabled={status === "SENDING"}
                >
                  <TextReveal className="uppercase">
                    {status === "SENDING" ? "Sending..." : "discuss project"}
                  </TextReveal>
                </motion.button>
              </Transition>
            </div>
          </form>

          {/* Social Links - Applying OAuth Button Styles */}
          <div className="md:justify-self-end flex flex-col items-center">
            <div className="pb-4 text-center">
              <Transition>
                <span className="text-white/90">Get in touch</span>
              </Transition>
              <div className="text-base md:text-2xl font-bold py-2">
                <Transition>
                  <TextReveal>{email}</TextReveal>
                </Transition>
              </div>
              <Transition>
                <div className="pb-1 text-white/80">{about.phoneNumber}</div>
              </Transition>
              <Transition>
                <div className="text-white/80">{about.address}</div>
              </Transition>
            </div>

            {/* Social Buttons Container - Applying OAuth Button Styles */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-auto md:pb-16 justify-items-stretch">
              {social_handle.map(
                (social, index) =>
                  social.enabled && (
                    <Transition key={social._id} transition={{ delay: 0.4 + index * 0.1 }}>
                      <Link href={social.url} target="_blank">
                        <motion.button
                          className={cn(
                            "socialMediaButton", // Using socialMediaButton CSS class - OAuth Style
                            socialPlatformConfig[social.platform]?.bgColor || "bg-gray-700", // Fallback
                            socialPlatformConfig[social.platform]?.bgColor  // Brand-specific background class
                          )}
                          style={{ color: socialPlatformConfig[social.platform]?.textColor }} // Inline style for text color
                          onMouseEnter={() => handleMouseEnter(social.platform)}
                          onMouseLeave={() => handleMouseLeave(social.platform)}
                          whileHover={{ opacity: 0.9 }} // Opacity hover - subtle
                          whileTap={{ scale: 0.98 }}    // Scale down on tap/click
                        >
                          {socialPlatformConfig[social.platform]?.icon && (
                            <motion.span
                              className="socialMediaIcon" // Using socialMediaIcon CSS class - OAuth Style
                              whileHover={{ rotate: 360 }} // Icon rotation on hover
                              transition={{ duration: 0.3, ease: "easeOut" }} // Transition duration - OAuth Style
                            >
                              {socialPlatformConfig[social.platform].icon()}
                            </motion.span>
                          )}
                          <span className="socialMediaButton-text">{social.platform}</span>{/* Using socialMediaButton-text CSS class - OAuth Style */}
                        </motion.button>
                      </Link>
                    </Transition>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;