import React, { useState } from "react";
import punycode from "punycode";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Input,
  Slider,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";

const EncoderDecoder = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [encodingType, setEncodingType] = useState("base64");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [copiedMessage, setCopiedMessage] = useState("");
  const { value: isDarkMode } = useDarkMode(true);

  const encodeText = () => {
    switch (encodingType) {
      case "base64":
        setResult(btoa(input));
        break;
      case "url":
        setResult(encodeURIComponent(input));
        break;
      case "binary":
        setResult(
          input
            .split("")
            .map((char) => char.charCodeAt(0).toString(2))
            .join(" ")
        );
        break;
      case "rot13":
        setResult(
          input.replace(/[a-zA-Z]/g, (char) => {
            const offset = char.toLowerCase() < "n" ? 13 : -13;
            return String.fromCharCode(char.charCodeAt(0) + offset);
          })
        );
        break;
      case "punycode":
        setResult(punycode.encode(input));
        break;
      default:
        setResult("Seleccione un tipo de codificación válido.");
    }
  };

  const decodeText = () => {
    switch (encodingType) {
      case "base64":
        setResult(atob(input));
        break;
      case "url":
        setResult(decodeURIComponent(input));
        break;
      case "binary":
        setResult(
          input
            .split(" ")
            .map((binary) => String.fromCharCode(parseInt(binary, 2)))
            .join("")
        );
        break;
      case "rot13":
        setResult(
          input.replace(/[a-zA-Z]/g, (char) => {
            const offset = char.toLowerCase() < "n" ? 13 : -13;
            return String.fromCharCode(char.charCodeAt(0) + offset);
          })
        );
        break;
      case "punycode":
        setResult(punycode.decode(input));
        break;
      default:
        setResult("Seleccione un tipo de codificación válido.");
    }
  };

  const handleInputChange = (event: any) => {
    setInput(event.target.value);
    setResult("");
  };

  const handleEncodingTypeChange = (event: any) => {
    setEncodingType(event.target.value);
    setResult("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result).then(
      function () {
        setCopiedMessage("Texto copiado");
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
    <>
      <a
        onClick={onOpen}
        className="transition-all cursor-pointer  duration-1000 dark:bg-white bg-[#0D001A]  hover:bg-[#3c2058] dark:hover:bg-[#3c2058] hover:shadow-xl m-2 p-4 relative z-40 group  "
      >
        <div className="bg-[#3c2058]]/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          <h3 className="mt-8 text-lg font-semibold text-white dark:text-black group-hover:text-white ">
            Generador de contraseñas
          </h3>
          <p className="mt-4 text-base  text-gray-300 dark:text-gray-600 group-hover:text-white  ">
            Puedes elegir la cantidad de caracteres desde 7 a 30, no se guardan
            en ningún lado.
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
                Herramienta de Codificación/Decodificación
              </ModalHeader>
              <ModalBody>
                <div className="px-4   items-center  sm:justify-center">
                  <div className="w-full mt-10">
                    <label>Tipo de Codificación:</label>

                    <div className="flex items-center">
                      <select
                        onChange={handleEncodingTypeChange}
                        value={encodingType}
                      >
                        <option value="base64">Base64</option>
                        <option value="url">URL</option>
                        <option value="binary">Código Binario</option>
                        <option value="rot13">ROT13</option>
                        <option value="punycode">Punycode</option>
                      </select>
                    </div>
                    <textarea
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ingrese el texto aquí"
                      rows={10}
                      cols={40}
                    />
                    <button
                      onClick={encodeText}
                      type="submit"
                      className="group relative h-10 w-full mt-3 sm:w-48 overflow-hidden rounded-[7px] bg-pink-500 text-sm font-bold text-white"
                    >
                      Codificar
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </button>
                    <button
                      onClick={decodeText}
                      type="submit"
                      className="group relative h-10 w-full mt-3 sm:w-48 overflow-hidden rounded-[7px] bg-pink-500 text-sm font-bold text-white"
                    >
                      Decodificar
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </button>
                  </div>

                  {result && (
                    <div className="relative mt-6 h-36 w-full flex flex-col rounded-xl dark:bg-white bg-black bg-clip-border text-gray-700 shadow-md">
                      <div className="p-6">
                        <h5 className="mb-2 block font-sans text-xl dark:text-black text-white font-semibold leading-snug tracking-normal antialiased">
                          Texto encriptado: {result}
                        </h5>

                        <div className="flex items-center">
                          <button
                            className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={copyToClipboard}
                          >
                            {copiedMessage ? (
                              <span className="mr-2">{copiedMessage}</span>
                            ) : (
                              <span>Copiar</span>
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

export default EncoderDecoder;
