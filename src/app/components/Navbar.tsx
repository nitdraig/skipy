import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Switcher from "./darkMode/Switch";

export default function Nav() {
  return (
    <Navbar className="z-50 " position="static">
      <NavbarBrand>
        <img className="h-36 w-48 mt-8 sm:ml-[-6em]" src="/logo.png" />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="mt-8">
          <Switcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
