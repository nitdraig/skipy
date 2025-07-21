"use client";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Github,
  Star,
  GitFork,
  ChevronDown,
  Eye,
  Bug,
} from "lucide-react";
import {
  containerVariants,
  floatingVariants,
  itemVariants,
} from "@/hooks/Motion-Variants";

const REPO_OWNER = "nitdraig";
const REPO_NAME = "skipy";

const HeroSection = () => {
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);
  const [watchers, setWatchers] = useState(0);
  const [issues, setIssues] = useState(0);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count != null) {
          setStars(data.stargazers_count);
          setForks(data.forks_count);
          setWatchers(data.subscribers_count);
          setIssues(data.open_issues_count);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="container space-y-6 py-8 md:py-12 lg:py-24 relative">
      <motion.div
        className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Badge variant="outline" className="mb-4 animate-glow">
            Open Source Developer Tools
          </Badge>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]"
          variants={itemVariants}
        >
          Your multipurpose tool
          <br className="hidden sm:inline" />
          <motion.span
            className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            for developers
          </motion.span>
        </motion.h1>

        <motion.p
          className="max-w-[750px] text-lg text-muted-foreground sm:text-xl"
          variants={itemVariants}
        >
          A clean, fast, and powerful collection of developer utilities.
          Generate passwords, create QR codes, encode data, and much more—all in
          one place.
        </motion.p>

        <motion.div className="flex gap-4 mt-6" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" asChild className="group">
              <NextLink href="/app">
                Try the App
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </NextLink>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" asChild>
              <NextLink
                href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}
                target="_blank"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub Repo
              </NextLink>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-muted-foreground"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
          >
            <Star className="h-4 w-4" />
            <span>{stars.toLocaleString()} stars</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
          >
            <GitFork className="h-4 w-4" />
            <span>{forks.toLocaleString()} forks</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
          >
            <Eye className="h-4 w-4" />
            <span>{watchers.toLocaleString()} watchers</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
          >
            <Bug className="h-4 w-4" />
            <span>{issues.toLocaleString()} issues</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={floatingVariants}
        animate="animate"
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
