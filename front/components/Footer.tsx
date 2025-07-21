"use client";
import { Zap } from "lucide-react";
import React from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      {" "}
      <motion.footer
        className="border-t py-6 md:py-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container  px-6 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="h-5 w-5" />
              <span className="font-bold">Skipy</span>
            </motion.div>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built for developers, by developers.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <NextLink
                href="https://github.com/nitdraig/skipy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </NextLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <NextLink
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </NextLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <NextLink
                href="https://github.com/nitdraig/skipy/blob/master/README.md"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Docs
              </NextLink>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
