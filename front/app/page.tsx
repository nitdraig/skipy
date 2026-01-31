"use client";

import { motion } from "framer-motion";

import HeroSection from "./views/components/HeroSection";
import FeaturesGridSection from "./views/components/FeaturesGridSection";
import ScreenshotsSection from "./views/components/ScreenshotsSection";
import RoadmapSection from "./views/components/RoadmapSection";
import CtaSection from "./views/components/CtaSection";
import CliSection from "./views/components/CliSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] mx-auto bg-background overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
      {/* Hero Section */}
      <HeroSection />
      {/* Features Grid */}
      <FeaturesGridSection />
      {/* Screenshots Section */}
      {/* <ScreenshotsSection /> */}
      {/* Roadmap */}
      <RoadmapSection />
      {/* CLI Section */}
      <CliSection />
      {/* CTA Section */}
      <CtaSection />{" "}
    </div>
  );
}
