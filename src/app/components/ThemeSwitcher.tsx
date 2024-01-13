"use client";

import { Button } from "@nextui-org/react";
import useDarkMode from "use-dark-mode";

export const ThemeSwitcher = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <Button
        onClick={darkMode.disable}
        color="secondary"
        href="#"
        variant="flat"
      >
        Light Mode
      </Button>

      <Button onClick={darkMode.enable} color="primary" href="#" variant="flat">
        Dark Mode
      </Button>
    </div>
  );
};
