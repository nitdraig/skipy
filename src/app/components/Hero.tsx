import React from "react";
import { InputShorter } from "./InputShorter";
import { InputUnShorter } from "./InputUnshorter";
import PasswordGenerator from "./PasswordGenerator";

const Hero = () => {
  return (
    <section className="w-full">
      <div className="relative flex flex-col min-h-screen px-6 py-8">
        <div className="flex flex-col w-full ">
          <h2 className="sm:text-6xl text-2xl">Bienvenido a Skipy</h2>
          <p className="text-1xl mt-4">
            Un servicio multi herramientas de código abierto
          </p>
          <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-3 lg:mt-20   ">
            <InputShorter />
            <InputUnShorter />
            <PasswordGenerator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
