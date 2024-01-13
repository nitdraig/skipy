"use client";
import React from "react";
import useDarkMode from "use-dark-mode";
import { App } from "./components/App";

export default function Home() {
  const darkMode = useDarkMode(false);

  return (
    <main
      className={`${
        darkMode.value ? "dark" : ""
      } text-foreground bg-background`}
    >
      <App />
    </main>
  );
}
