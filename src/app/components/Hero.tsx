import React from "react";
import { InputShorter } from "./InputShorter";

const Hero = () => {
  return (
    <section className="w-full h-screen min-h-screen  ">
      <div className="container relative flex flex-col min-h-screen px-6 py-8 mx-auto">
        <section className="flex items-center flex-1">
          <div className="flex flex-col w-full ">
            <h2>Bienvenido a Samurai-Cut</h2>
            <p>
              ingresa la URL que desees acortar, en caso de existir se te
              muestra el link acortado correspondiente
            </p>

            <InputShorter />

            <p className="mt-8 text-center text-gray-700  text-md md:text-xl">
              Notify me when App is launched :)
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Hero;
