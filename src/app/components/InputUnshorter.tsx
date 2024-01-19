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
import useDarkMode from "use-dark-mode";
import { ImgColorBlack, ImgColorWhite } from "./unshorter/SVGUnshorter";
import URLInputUnshorter from "./unshorter/URLInputUnshorter";
import UnShortenedURLDisplay from "./unshorter/UnShortenedURLDisplay";
export const InputUnShorter = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");
  const [error, setError] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { value: isDarkMode } = useDarkMode(true);

  const handleShortenedUrlChange = (event: any) => {
    setShortenedUrl(event.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(originalUrl).then(
      function () {
        setCopiedMessage("¡Link copiado!");
        setTimeout(() => {
          setCopiedMessage("");
        }, 3000);
      },
      function (err) {
        console.error("No se pudo copiar: ", err);
      }
    );
  };

  const expandUrl = async () => {
    if (!shortenedUrl.trim()) {
      setError("¡Debes ingresar un enlace acortado!");
      return;
    }

    const slug = shortenedUrl.substring(shortenedUrl.lastIndexOf("/") + 1);

    try {
      console.log("Antes de la llamada a la API");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/shorter/${slug}`,
        {
          method: "GET",
        }
      );

      if (response.status === 404) {
        setError("Enlace acortado no encontrado");
        setOriginalUrl("");
        return;
      }

      const data = await response.json();
      setOriginalUrl(data.redirectedUrl);
      setError("");
    } catch (error) {
      console.error("Error al expandir la URL:");
      setError("Error al expandir la URL");
      setOriginalUrl("");
    }
  };

  const imgComponent = isDarkMode ? <ImgColorBlack /> : <ImgColorWhite />;
  return (
    <>
      <a
        onClick={onOpen}
        className="transition-all cursor-pointer  duration-1000 dark:bg-white bg-[#1a45db]  hover:bg-[#387af9] dark:hover:bg-[#387af9] hover:shadow-xl m-2 p-4 relative z-40 group  "
      >
        <div className="bg-[#387af9]]/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200  group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative">
          {imgComponent}
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
                <div className="w-full mt-4">
                  <URLInputUnshorter
                    shortenedUrl={shortenedUrl}
                    handleShortenedUrlChange={handleShortenedUrlChange}
                    error={error}
                    expandUrl={expandUrl}
                  />
                  <UnShortenedURLDisplay
                    originalUrl={originalUrl}
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
