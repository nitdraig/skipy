"use client";

import React from "react";
import NextLink from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 px-6 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <div className="flex items-center space-x-2">
            <Image
              src="/skipy-logo-clean.png"
              alt="Skipy"
              width={24}
              height={24}
            />
            <span className="font-bold">Skipy</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for developers, by developers.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <NextLink
            href="https://www.npmjs.com/package/skipy-devtools-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Npm
          </NextLink>
          <NextLink
            href="https://github.com/nitdraig/skipy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </NextLink>
          <NextLink
            href="/contact"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </NextLink>
          <NextLink
            href="https://github.com/nitdraig/skipy/blob/master/README.md"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </NextLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
