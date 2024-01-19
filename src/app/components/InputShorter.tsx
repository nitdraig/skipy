import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import useDarkMode from "use-dark-mode";
import ShortenedURLDisplay from "./shorter/ShortenedURLDisplay";
import URLInput from "./shorter/URLInputShorter";
import { ImgColorBlack, ImgColorWhite } from "./shorter/SVGShorter";

export const InputShorter = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");
  const [error, setError] = useState("");
  const { value: isDarkMode } = useDarkMode(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const shortenUrl = async () => {
    if (!originalUrl.trim()) {
      setError("¡Debes ingresar una URL!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/shorter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalUrl }),
        }
      );

      const data = await response.json();

      if (response.ok && data.shortenedUrl) {
        setShortenedUrl(data.shortenedUrl);
        setError("");
      } else {
        setError("Error al acortar la URL");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Error de red");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl).then(
      function () {
        setCopiedMessage("¡Link copiado!");
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
        className="transition-all cursor-pointer  duration-1000 dark:bg-white bg-[#1a45db] hover:bg-[#387af9] dark:hover:bg-[#387af9] hover:shadow-xl m-2 p-4 relative z-40 group  "
      >
        <div className="bg-[#387af9]]/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          {imgComponent}
          <h3 className="mt-8 text-lg font-semibold text-white dark:text-black group-hover:text-white ">
            Acortador de Link
          </h3>
          <p className="mt-4 text-base  text-gray-300 dark:text-gray-600 group-hover:text-white  ">
            Ingresa cualquier URL y se te ofrecerá un link acortado que te
            redirecciona.
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
                Acortador de links
              </ModalHeader>
              <ModalBody>
                <div className="w-full  mt-4">
                  <URLInput
                    originalUrl={originalUrl}
                    setOriginalUrl={setOriginalUrl}
                    shortenUrl={shortenUrl}
                    error={error}
                  />
                  <ShortenedURLDisplay
                    shortenedUrl={shortenedUrl}
                    copiedMessage={copiedMessage}
                    copyToClipboard={copyToClipboard}
                  />
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
