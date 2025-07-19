"use client";

import React from "react";
import NextLink from "next/link";
import { Github, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <>
      <motion.header
        className="fixed px-6 top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <NextLink
              href="/#"
              className="mr-6 flex items-center space-x-2 group"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="h-6 w-6" />
              </motion.div>
              <span className="font-bold">Skipy</span>
            </NextLink>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextLink href="#features">Features</NextLink>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextLink href="#roadmap">Roadmap</NextLink>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextLink
                  href="https://github.com/nitdraig/skipy"
                  className="flex items-center space-x-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </NextLink>
              </motion.div>
            </nav>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
