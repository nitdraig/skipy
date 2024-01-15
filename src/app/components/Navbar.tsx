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
    <Navbar>
      <NavbarBrand>
        <img className="h-36 w-48 mt-8 sm:ml-[-6em]" src="/logo.png" />
        {/* <p className="font-bold">Skipy</p> */}
      </NavbarBrand>

      {/* <NavbarContent className=" sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="#">Features</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Integrations</Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        <NavbarItem className="mt-8">
          <Switcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
