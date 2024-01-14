import React from "react";
import { InputShorter } from "./InputShorter";
import { InputUnShorter } from "./InputUnshorter";

const Hero = () => {
  return (
    <section className="w-full h-screen ">
      <div className="relative flex flex-col min-h-screen px-6 py-8">
        <div className="flex flex-col w-full ">
          <h2 className="text-6xl">Bienvenido a Skipy</h2>
          <p className="text-1xl mt-4">
            Ingresa la URL que desees acortar, en caso de existir se te muestra
            el link acortado correspondiente
          </p>
          <InputShorter />
          <InputUnShorter />
        </div>
      </div>
    </section>
  );
};

export default Hero;
