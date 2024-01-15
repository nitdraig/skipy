import React, { useState } from "react";
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

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [copiedMessage, setCopiedMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?/{}[]|";
    let newPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
  };

  const handlePasswordLengthChange = (value: any) => {
    setPasswordLength(value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      function () {
        setCopiedMessage("Contraseña copiada");
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
                Generador de contraseñas
              </ModalHeader>
              <ModalBody>
                <div className="px-4   items-center  sm:justify-center">
                  <div className="w-full mt-10">
                    <label>Longitud de la Contraseña:</label>
                    <div className="flex items-center">
                      <Slider
                        color="primary"
                        step={1}
                        showOutline={true}
                        maxValue={30}
                        minValue={7}
                        value={passwordLength}
                        onChange={handlePasswordLengthChange}
                        aria-label="Longitud de la Contraseña"
                        className="max-w-md"
                      />
                      <span className="ml-2">{passwordLength} caracteres</span>
                    </div>
                    <button
                      onClick={generatePassword}
                      type="submit"
                      className="group relative h-10 w-full mt-3 sm:w-48 overflow-hidden rounded-[7px] bg-pink-500 text-sm font-bold text-white"
                    >
                      Generar Contraseña
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </button>
                  </div>

                  {password && (
                    <div className="relative mt-6 h-36 w-full flex flex-col rounded-xl dark:bg-white bg-black bg-clip-border text-gray-700 shadow-md">
                      <div className="p-6">
                        <h5 className="mb-2 block font-sans text-xl dark:text-black text-white font-semibold leading-snug tracking-normal antialiased">
                          Contraseña Generada:
                        </h5>

                        <div className="flex items-center">
                          <Input
                            type="text"
                            color="secondary"
                            variant="bordered"
                            value={password}
                            readOnly
                            placeholder=""
                            className="max-w-xs mr-2 text-white"
                          />
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

export default PasswordGenerator;
