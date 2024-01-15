import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export const InputUnShorter = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");
  const [error, setError] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleShortenedUrlChange = (event: any) => {
    setShortenedUrl(event.target.value);
  };

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
    setError("");
    setOriginalUrl(""); // Limpiar la URL original después de acortar
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(originalUrl).then(
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

  const expandUrl = async () => {
    // Validar si el campo de entrada está vacío
    if (!shortenedUrl.trim()) {
      setError("¡Debes ingresar un enlace acortado!");
      return;
    }

    // Extraer el slug de la URL acortada
    const slug = shortenedUrl.substring(shortenedUrl.lastIndexOf("/") + 1);

    // Realizar una solicitud para obtener la URL original desde el backend
    const response = await fetch(`/api/unshorter?slug=${slug}`, {
      method: "GET",
    });

    if (response.status === 404) {
      setError("Enlace acortado no encontrado");
      setOriginalUrl("");
      return;
    }

    const data = await response.json();
    setOriginalUrl(data.originalUrl);
    setError(""); // Limpiar el mensaje de error si existe
  };

  return (
    <>
      <a
        onClick={onOpen}
        className="transition-all cursor-pointer  duration-1000 dark:bg-white bg-[#0D001A]  hover:bg-[#3c2058] dark:hover:bg-[#3c2058] hover:shadow-xl m-2 p-4 relative z-40 group  "
      >
        <div className="bg-[#3c2058]]/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200  group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          <svg
            className="w-16 h-16 fill-gray-400 group-hover:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            id="polo-tshirt"
          >
            <path d="m16.962 5.841 3.582.717-.716-4.115zM12.172 2.443l-.716 4.115 3.582-.717z"></path>
            <path d="M28.488 7.301a5.354 5.354 0 0 0-2.743-3.305c-.112-.056-2.96-1.2-4.942-1.996l.87 4.987a.52.52 0 0 1-.488.746.535.535 0 0 1-.101-.01L16.5 6.806V12a.5.5 0 1 1-1 0V6.806l-4.583.917a.518.518 0 0 1-.613-.598L11.196 2c-1.982.796-4.828 1.94-4.94 1.996a5.36 5.36 0 0 0-2.75 3.328l-1.492 6.26c-.042.175.01.359.138.486l.608.608a5.487 5.487 0 0 0 3.907 1.618c.196 0 .375-.111.464-.287l1.072-2.145c.013.292.02.584.02.876V28.48c0 .231.153.435.375.499A27.03 27.03 0 0 0 16 30c2.508 0 5.015-.34 7.402-1.022a.52.52 0 0 0 .376-.5V14.74c0-.292.006-.584.019-.876l1.073 2.145a.519.519 0 0 0 .463.287 5.487 5.487 0 0 0 3.907-1.618l.608-.608a.518.518 0 0 0 .138-.487l-1.498-6.282zM17.03 11.5c-.276 0-.505-.224-.505-.5s.219-.5.495-.5h.01a.5.5 0 0 1 0 1zm0-2c-.276 0-.505-.224-.505-.5s.219-.5.495-.5h.01a.5.5 0 0 1 0 1z"></path>
          </svg>
          <h3 className="mt-8 text-lg font-semibold text-white dark:text-black group-hover:text-white ">
            Desacortador de Links
          </h3>
          <p className="mt-4 text-base  text-gray-300 dark:text-gray-600 group-hover:text-white  ">
            Ingresa cualquier URL acortada y podrás ver la URL original.
          </p>
        </div>
      </a>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Desacortador de links
              </ModalHeader>
              <ModalBody>
                <div className="w-full  mt-4">
                  <div className="flex flex-col  sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem] rounded-xl shadow-md">
                      <input
                        type="text"
                        value={shortenedUrl}
                        onChange={handleShortenedUrlChange}
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
                        onClick={expandUrl}
                        type="submit"
                        className="group relative h-10 w-full sm:w-48 overflow-hidden rounded-[7px] bg-pink-500 text-lg font-bold text-white"
                      >
                        Desacortar
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                      </button>
                    </div>
                  </div>
                  {error && (
                    <p className="text-red-500 mt-2 text-sm">{error}</p>
                  )}
                </div>

                <div className="w-full sm:w-1/2 mt-4 sm:mt-0 text-center sm:text-left">
                  {originalUrl && (
                    <div className="relative mt-6 w-full flex flex-col rounded-xl dark:bg-white bg-black bg-clip-border text-gray-700 shadow-md">
                      <div className="p-6">
                        <h5 className="mb-2 block font-sans text-xl dark:text-black text-white font-semibold leading-snug tracking-normal antialiased">
                          {"Enlace Original:"}
                        </h5>
                        <a
                          href={originalUrl}
                          target="_blank"
                          className="block font-sans dark:text-black text-white text-base font-light leading-relaxed text-inherit antialiased"
                        >
                          {originalUrl}
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
                            <span>Copiar </span>
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
