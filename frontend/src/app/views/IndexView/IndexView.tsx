"use client";
import React from "react";
import { Shorter } from "./Shorter/Shorter";
import { UnShorter } from "./UnShorter/Unshorter";
import PasswordGenerator from "./PasswordGenerator/PasswordGenerator";
import QRCodeGenerator from "./QRGenerator/QRGenerator";
import CreditCardGenerator from "./CredictCardGenerator/CreditCardGenerator";
import EncoderDecoder from "./Encoder/Encoder";
import Nav from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import useDarkMode from "use-dark-mode";

const IndexView = () => {
  const darkMode = useDarkMode(false);
  return (
    <>
      <main
        className={`${
          darkMode.value ? "dark" : ""
        } text-foreground bg-background `}
      >
        <Nav />
        <div className="relative flex flex-col max-w-[1400px] mx-auto  px-6 py-8">
          <div className="flex flex-col w-full">
            <h2 className="sm:text-6xl text-3xl dark:text-white text-[#162255]">
              Bienvenido a
              <span className="text-[#91c1ff]">
                <h1>Skipy</h1>
              </span>
              tu aliado indispensable.
            </h2>
            <p className="text-lg mt-4 dark:text-white text-[#162255]">
              Un servicio multi-herramientas de uso libre diseñado
              específicamente para desarrolladores y profesionales del IT.
              <br />
              Descubre la libertad de contar con recursos esenciales sin coste
              alguno. <br />
              Simplifica tu jornada laboral y eleva tu productividad. <br />
            </p>
            <span className="text-md font-bold dark:text-white text-[#162255]">
              Recuerda que puedes contribuir a mejorar Skipy, añadiendo
              funcionalidades y corrigiendo errores desde{" "}
              <a
                href="https://github.com/nitdraig/skipy"
                className="underline "
                target="_blank"
              >
                github
              </a>
              . &#128072;
            </span>
            <section className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-3 lg:mt-10">
              <Shorter />
              <UnShorter />
              <PasswordGenerator />
              <QRCodeGenerator />
              <CreditCardGenerator />
              <EncoderDecoder />
            </section>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default IndexView;
