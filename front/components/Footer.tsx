import { Zap } from "lucide-react";
import React from "react";
import NextLink from "next/link";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0 px-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span className="font-bold">Skipy</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for developers, by developers.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <NextLink
            href="https://github.com"
            className="text-muted-foreground hover:text-foreground"
          >
            GitHub
          </NextLink>
          <NextLink
            href="/contact"
            className="text-muted-foreground hover:text-foreground"
          >
            Contact
          </NextLink>
          <NextLink
            href="/docs"
            className="text-muted-foreground hover:text-foreground"
          >
            Docs
          </NextLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
