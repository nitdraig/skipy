"use client";

import React, { useEffect, useState } from "react";
import NextLink from "next/link";
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
    <section className="container relative space-y-6 py-20 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
        <div>
          <Badge variant="outline" className="mb-4">
            Open Source Developer Tools
          </Badge>
        </div>

        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Your multipurpose tool
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            for developers
          </span>
        </h1>

        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          A clean, fast, and powerful collection of developer utilities.
          Generate passwords, create QR codes, encode data, and much more—all in
          one place.
        </p>

        <div className="mt-6 flex gap-4">
          <Button size="sm" asChild className="group">
            <NextLink href="/app" className="inline-flex items-center gap-2">
              Try the App
              <ArrowRight className="h-4 w-4" />
            </NextLink>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <NextLink
              href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}
              target="_blank"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub Repo
            </NextLink>
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{stars.toLocaleString()} stars</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span>{forks.toLocaleString()} forks</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{watchers.toLocaleString()} watchers</span>
          </div>
          <div className="flex items-center gap-1">
            <Bug className="h-4 w-4" />
            <span>{issues.toLocaleString()} issues</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform text-muted-foreground">
        <ChevronDown className="h-6 w-6" aria-hidden />
      </div>
    </section>
  );
};

export default HeroSection;
