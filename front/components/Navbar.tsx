import React from "react";
import NextLink from "next/link";
import { Github, Zap } from "lucide-react";
const Navbar = () => {
  return (
    <header className="sticky px-10 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <NextLink href="/" className="mr-6 flex items-center space-x-2">
            <Zap className="h-6 w-6" />
            <span className="font-bold">Skipy</span>
          </NextLink>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NextLink href="#features">Features</NextLink>
            <NextLink href="#roadmap">Roadmap</NextLink>
            <NextLink
              href="https://github.com"
              className="flex items-center space-x-1"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </NextLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
