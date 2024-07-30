import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Switcher from "./darkMode/Switch";

import useDarkMode from "use-dark-mode";
import { ImgColorBlack, ImgColorWhite } from "./svg/SVGGithub";
export default function Nav() {
  const { value: isDarkMode } = useDarkMode(true);
  const imgComponent = isDarkMode ? <ImgColorBlack /> : <ImgColorWhite />;
  return (
    <Navbar className="z-50" position="static">
      <NavbarBrand>
        <img
          className="h-36 w-48 mt-8 sm:ml-[-6em]"
          alt="Skipy Logo"
          src="/skipy-logo.png"
        />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="mt-8 ">
          <a
            href="https://skipy.canny.io/sugerencias"
            target="_blank"
            className="px-3 lg:flex hidden py-1 shadow-lg shadow-[#387AF9]/50 bg-[#1A45DB] text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
          >
            Sugerencias
          </a>
        </NavbarItem>
        <NavbarItem className="mt-10 ml-2 ">
          <div className="w-10 h-10">
            <a href="https://github.com/nitdraig/skipy" target="_blank">
              {" "}
              {imgComponent}
            </a>
          </div>
        </NavbarItem>
        <NavbarItem className="mt-8">
          <Switcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
