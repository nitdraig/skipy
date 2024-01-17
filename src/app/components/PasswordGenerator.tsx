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
import useDarkMode from "use-dark-mode";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [copiedMessage, setCopiedMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { value: isDarkMode } = useDarkMode(true);
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
            d="M9 12L11 14L15 9.99999M20 12C20 16.4611 14.54 19.6937 12.6414 20.683C12.4361 20.79 12.3334 20.8435 12.191 20.8712C12.08 20.8928 11.92 20.8928 11.809 20.8712C11.6666 20.8435 11.5639 20.79 11.3586 20.683C9.45996 19.6937 4 16.4611 4 12V8.21759C4 7.41808 4 7.01833 4.13076 6.6747C4.24627 6.37113 4.43398 6.10027 4.67766 5.88552C4.9535 5.64243 5.3278 5.50207 6.0764 5.22134L11.4382 3.21067C11.6461 3.13271 11.75 3.09373 11.857 3.07827C11.9518 3.06457 12.0482 3.06457 12.143 3.07827C12.25 3.09373 12.3539 3.13271 12.5618 3.21067L17.9236 5.22134C18.6722 5.50207 19.0465 5.64243 19.3223 5.88552C19.566 6.10027 19.7537 6.37113 19.8692 6.6747C20 7.01833 20 7.41808 20 8.21759V12Z"
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
            d="M9 12L11 14L15 9.99999M20 12C20 16.4611 14.54 19.6937 12.6414 20.683C12.4361 20.79 12.3334 20.8435 12.191 20.8712C12.08 20.8928 11.92 20.8928 11.809 20.8712C11.6666 20.8435 11.5639 20.79 11.3586 20.683C9.45996 19.6937 4 16.4611 4 12V8.21759C4 7.41808 4 7.01833 4.13076 6.6747C4.24627 6.37113 4.43398 6.10027 4.67766 5.88552C4.9535 5.64243 5.3278 5.50207 6.0764 5.22134L11.4382 3.21067C11.6461 3.13271 11.75 3.09373 11.857 3.07827C11.9518 3.06457 12.0482 3.06457 12.143 3.07827C12.25 3.09373 12.3539 3.13271 12.5618 3.21067L17.9236 5.22134C18.6722 5.50207 19.0465 5.64243 19.3223 5.88552C19.566 6.10027 19.7537 6.37113 19.8692 6.6747C20 7.01833 20 7.41808 20 8.21759V12Z"
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
        <div className="bg-[#387af9]/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          {isDarkMode ? <ImgColorBlack /> : <ImgColorWhite />}
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
                      className="group relative h-10 w-full mt-3 sm:w-48 overflow-hidden rounded-[7px] bg-[#162255] text-sm font-bold text-white"
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

export default PasswordGenerator;
