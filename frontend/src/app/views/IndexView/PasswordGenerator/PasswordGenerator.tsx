import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Slider,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import {
  ImgColorBlack,
  ImgColorWhite,
} from "./components/SVGPasswordGenerator";
import PasswordDisplay from "./components/PasswordDisplay";

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

  const imgComponent = isDarkMode ? <ImgColorBlack /> : <ImgColorWhite />;
  return (
    <>
      <a
        onClick={onOpen}
        className="transition-all cursor-pointer  duration-1000 dark:bg-white bg-[#1a45db]  hover:bg-[#387af9] dark:hover:bg-[#387af9] hover:shadow-xl m-2 p-4 relative z-40 group  "
      >
        <div className="bg-[#387af9]]/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative">
          {imgComponent}
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
                <div className="px-4 items-center sm:justify-center">
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
                    <PasswordDisplay
                      password={password}
                      copiedMessage={copiedMessage}
                      onCopyToClipboard={copyToClipboard}
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cerrar
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
