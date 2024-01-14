import { Button } from "@nextui-org/react";
import React, { useState } from "react";

export const InputShorter = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");
  const [error, setError] = useState("");

  const shortenUrl = async () => {
    // Validar si el campo de entrada está vacío
    if (!originalUrl.trim()) {
      setError("¡Debes ingresar una URL!");
      return;
    }

    const response = await fetch("/api/shorter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();
    setShortenedUrl(data.shortenedUrl);
    setError(""); // Limpiar el mensaje de error si existe
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl).then(
      function () {
        setCopiedMessage("¡Link copiado al portapapeles!");
        setTimeout(() => {
          setCopiedMessage("");
        }, 3000);
      },
      function (err) {
        console.error("No se pudo copiar al portapapeles: ", err);
      }
    );
  };

  return (
    <div className="px-4 mt-16 flex flex-col items-center sm:flex-row sm:justify-center">
      <div className="w-full sm:w-1/2 mt-10">
        <h3 className="text-2xl  text-center sm:text-left">
          Acortador de links
        </h3>
        <div className="flex flex-col mt-8 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem] rounded-xl shadow-md">
            <input
              id="email"
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              ejemplo.com
            </label>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={shortenUrl}
              type="submit"
              className="group relative h-10 w-full sm:w-48 overflow-hidden rounded-[7px] bg-zinc-500 text-lg font-bold text-white"
            >
              Acortar
              <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>

      <div className="w-full sm:w-1/2 mt-4 sm:mt-0 text-center sm:text-left">
        {shortenedUrl && (
          <div className="relative mt-6 w-full flex flex-col rounded-xl dark:bg-white bg-black bg-clip-border text-gray-700 shadow-md">
            <div className="p-6">
              <h5 className="mb-2 block font-sans text-xl dark:text-black text-white font-semibold leading-snug tracking-normal antialiased">
                Link acortado:
              </h5>
              <a
                href={shortenedUrl}
                target="_blank"
                className="block font-sans dark:text-black text-white text-base font-light leading-relaxed text-inherit antialiased"
              >
                {shortenedUrl}
              </a>
            </div>
            <div className="p-6 pt-0">
              <button
                className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={copyToClipboard}
              >
                {copiedMessage ? (
                  <span className="mr-2">{copiedMessage}</span>
                ) : (
                  <span>Copiar Link</span>
                )}
                <img
                  width="28"
                  height="28"
                  className="bg-white dark:text-black"
                  src="https://img.icons8.com/material-sharp/48/copy.png"
                  alt="copy"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
