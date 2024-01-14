import React from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import useDarkMode from "use-dark-mode";

export default function Switcher() {
  const darkMode = useDarkMode(false);

  const handleToggle = () => {
    darkMode.toggle();
  };

  return (
    <Switch
      isSelected={darkMode.value}
      onChange={handleToggle}
      size="lg"
      color="secondary"
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
