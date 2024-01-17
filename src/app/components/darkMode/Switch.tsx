"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import useDarkMode from "use-dark-mode";

export default function Switcher() {
  const darkMode = useDarkMode(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode !== null) {
      const storedDarkModeBool = storedDarkMode === "true";
      darkMode.value !== storedDarkModeBool && darkMode.toggle(); // Toggle only if there's a mismatch
      setInitialLoad(false);
    }
  }, [darkMode]);

  useEffect(() => {
    if (!initialLoad) {
      localStorage.setItem("darkMode", darkMode.value.toString());
    }
  }, [darkMode.value, initialLoad]);

  const handleToggle = () => {
    darkMode.toggle();
  };

  return (
    <Switch
      isSelected={darkMode.value}
      onChange={handleToggle}
      size="lg"
      color="primary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    />
  );
}
