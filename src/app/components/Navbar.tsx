import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Switcher from "./darkMode/Switch";

export default function Nav() {
  return (
    <Navbar className="z-50" position="static">
      <NavbarBrand>
        <img className="h-36 w-48 mt-8 sm:ml-[-6em]" src="/logo.png" />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="mt-8">
          <Switcher />
        </NavbarItem>
        <NavbarItem className="mt-8 ">
          <a
            href="https://skipy.canny.io/sugerencias"
            target="_blank"
            className="px-3  py-1 shadow-lg shadow-[#387AF9]/50 bg-[#1A45DB] text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
          >
            Sugerencias
          </a>{" "}
          &#128072;
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
