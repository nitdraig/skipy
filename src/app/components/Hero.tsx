"use client";
import React from "react";
import { InputShorter } from "./InputShorter";
import { InputUnShorter } from "./InputUnshorter";
import PasswordGenerator from "./PasswordGenerator";
import QRCodeGenerator from "./QRGenerator";
import CreditCardGenerator from "./CreditCardGenerator";
import EncoderDecoder from "./Encoder";
import useDarkMode from "use-dark-mode";
import Footer from "./Footer";
import Nav from "./Navbar";

const Hero = () => {
  const darkMode = useDarkMode(false);
  return (
    <main
      className={`${
        darkMode.value ? "dark" : ""
      } text-foreground bg-background`}
    >
      <Nav />
      <div className="relative flex flex-col min-h-screen px-6 py-8">
        <div className="flex flex-col w-full ">
          <h2 className="sm:text-6xl text-2xl dark:text-white text-[#162255]">
            Bienvenido a <span className=" text-[#91c1ff] ">Skipy,</span>
            tu aliado indispensable.
          </h2>
          <p className="text-lg mt-4 dark:text-white text-[#162255]">
            Un servicio multi-herramientas de uso libre diseñado específicamente
            para desarrolladores y profesionales del ámbito IT. Descubre la
            libertad de contar con recursos esenciales sin coste alguno.
            Simplifica tu jornada laboral y lleva tu productividad a nuevos
            niveles.
          </p>
          <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-3 lg:mt-20">
            <InputShorter />
            <InputUnShorter />
            <PasswordGenerator />
            <QRCodeGenerator />
            <CreditCardGenerator />
            <EncoderDecoder />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Hero;
