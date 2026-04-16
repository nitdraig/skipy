"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { Github, Menu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import PwaInstallButton from "@/components/PwaInstallButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const mobileNavLinkClass = cn(
  "flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-foreground",
  "transition-colors hover:bg-accent hover:text-accent-foreground",
  "active:bg-accent/80"
);

function MobileNavMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-lg border border-border/60 bg-background/50 hover:bg-accent"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[min(100vw,20rem)] flex-col border-l bg-background/95 backdrop-blur-xl"
      >
        <SheetHeader className="text-left">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Site sections and links</SheetDescription>
        </SheetHeader>
        <nav className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto pb-6">
          <NextLink href="/#features" className={mobileNavLinkClass} onClick={close}>
            Features
          </NextLink>
          <NextLink href="/#roadmap" className={mobileNavLinkClass} onClick={close}>
            Roadmap
          </NextLink>
          <NextLink href="/#cli" className={mobileNavLinkClass} onClick={close}>
            CLI
          </NextLink>
          <NextLink
            href="https://github.com/nitdraig/skipy"
            className={mobileNavLinkClass}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            <Github className="h-5 w-5 shrink-0" />
            GitHub
          </NextLink>
          <NextLink
            href="https://www.npmjs.com/package/skipy-devtools-cli"
            className={mobileNavLinkClass}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            <img
              alt="npm"
              className="h-5 w-5 shrink-0 rounded-full"
              src="https://avatars.githubusercontent.com/u/6078720?s=200&v=4"
            />
            npm
          </NextLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

const Navbar = () => {
  return (
    <>
      <motion.header
        className="fixed top-0 z-50 w-full border-b bg-background/80 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sm:px-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container flex h-14 items-center justify-between gap-3">
          <div className="flex min-w-0 shrink-0 items-center">
            <NextLink
              href="/#"
              className="group flex items-center gap-2 pr-2"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/skipy-logo-clean.png"
                  alt="Skipy"
                  width={24}
                  height={24}
                />
              </motion.div>
              <span className="font-bold tracking-tight">Skipy</span>
            </NextLink>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
            <div className="flex shrink-0 items-center gap-2 md:hidden">
              <PwaInstallButton />
              <MobileNavMenu />
            </div>

            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextLink href="/#features">Features</NextLink>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextLink href="/#roadmap">Roadmap</NextLink>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextLink href="/#cli">CLI</NextLink>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextLink
                  href="https://github.com/nitdraig/skipy"
                  className="flex items-center gap-1.5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </NextLink>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextLink
                  href="https://www.npmjs.com/package/skipy-devtools-cli"
                  className="flex items-center gap-1.5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="npm"
                    className="h-4 w-4 rounded-full"
                    src="https://avatars.githubusercontent.com/u/6078720?s=200&v=4"
                  />
                  <span>npm</span>
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
