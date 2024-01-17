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
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import { encryptingTypes } from "./../constants/encryptingTypes";
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
  const ImgColorBlack = () => {
    return (
      <svg
        viewBox="0 0 24 24"
        width="5em"
        height="5em"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M20 10V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12.5M18 21C18 21 21 19.5701 21 17.4252V14.9229L18.8124 14.1412C18.2868 13.9529 17.712 13.9529 17.1864 14.1412L15 14.9229V17.4252C15 19.5701 18 21 18 21Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
    );
  };
  const ImgColorWhite = () => {
    return (
      <svg
        viewBox="0 0 24 24"
        width="5em"
        height="5em"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M20 10V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12.5M18 21C18 21 21 19.5701 21 17.4252V14.9229L18.8124 14.1412C18.2868 13.9529 17.712 13.9529 17.1864 14.1412L15 14.9229V17.4252C15 19.5701 18 21 18 21Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
    );
  };

  return (
    <>
      <a
        onClick={onOpen}
        className="transition-all cursor-pointer  duration-1000 dark:bg-white bg-[#1a45db]  hover:bg-[#387af9] dark:hover:bg-[#387af9] hover:shadow-xl m-2 p-4 relative z-40 group  "
      >
        <div className="bg-[#387af9]]/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          {isDarkMode ? <ImgColorBlack /> : <ImgColorWhite />}
          <h3 className="mt-8 text-lg font-semibold text-white dark:text-black group-hover:text-white ">
            Codificador & decodificador
          </h3>
          <p className="mt-4 text-base  text-gray-300 dark:text-gray-600 group-hover:text-white  ">
            Codificador en múltiples formatos de encriptamiento. Binario,
            Base64, URL, y ROT13.
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
                      <Select
                        placeholder="Seleccionar"
                        onChange={handleEncodingTypeChange}
                        value={encodingType}
                      >
                        {encryptingTypes.map((types: any) => (
                          <SelectItem key={types.value} value={types.value}>
                            {types.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <Textarea
                      className="mt-6 "
                      value={input}
                      label=""
                      onChange={handleInputChange}
                      placeholder="Ingrese el texto aquí"
                    />
                    <button
                      onClick={encodeText}
                      type="submit"
                      className="group relative h-10 w-full mt-3 sm:w-40 overflow-hidden rounded-[7px] bg-[#162255] text-sm font-bold text-white"
                    >
                      Codificar
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </button>
                    <button
                      onClick={decodeText}
                      type="submit"
                      className="group relative h-10 w-full mt-3 sm:w-40 overflow-hidden rounded-[7px] bg-[#162255] text-sm font-bold text-white"
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
                <Button color="primary" variant="light" onPress={onClose}>
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
