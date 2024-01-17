"use client";
import React from "react";
import useDarkMode from "use-dark-mode";
import { App } from "./components/App";
import Nav from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  const darkMode = useDarkMode(false);

  return (
    <main
      className={`${
        darkMode.value ? "dark" : ""
      } text-foreground bg-background`}
    >
      <Nav />
      <App />
      <Footer />
    </main>
  );
}
