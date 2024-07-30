import React, { useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import { ImgColorBlack, ImgColorWhite } from "./components/SVGQRGenerator";
import QRCodeGeneratorDisplay from "./components/QRCodeGeneratorDisplay";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { value: isDarkMode } = useDarkMode(true);
  const handleUrlChange = (event: any) => {
    setUrl(event.target.value);
  };

  const generateQRCode = (): {
    dataURL: string;
    urlWithProtocol: string;
  } | null => {
    const canvas = document.getElementById(
      "qrcode-canvas"
    ) as HTMLCanvasElement;
    if (canvas) {
      const urlWithProtocol = url.startsWith("http") ? url : `https://${url}`;
      const dataURL = canvas.toDataURL("image/png");
      return { dataURL, urlWithProtocol };
    }
    return null;
  };

  const handleDownloadClick = () => {
    const result = generateQRCode();
    if (result && result.dataURL && result.urlWithProtocol) {
      const link = document.createElement("a");
      const fileName = result.urlWithProtocol.replace(/[^a-zA-Z0-9]/g, "_");
      link.href = result.dataURL;
      link.download = `${fileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const imgComponent = isDarkMode ? <ImgColorBlack /> : <ImgColorWhite />;
  return (
    <>
      <a
        onClick={onOpen}
        className="transition-all cursor-pointer duration-1000 dark:bg-white bg-[#1a45db] hover:bg-[#387af9] dark:hover:bg-[#387af9] hover:shadow-xl m-2 p-4 relative z-40 group  "
      >
        <div className="bg-[#387af9]]/50 top-0 left-0 w-24 h-1 z-30 transition-all duration-200 group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          {imgComponent}
          <h3 className="mt-8 text-lg font-semibold text-white dark:text-black group-hover:text-white ">
            Generador de Código QR
          </h3>
          <p className="mt-4 text-base text-gray-300 dark:text-gray-600 group-hover:text-white  ">
            Puedes crear tu QR para tu web o URL personal.
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
                Generador de Código QR
              </ModalHeader>
              <ModalBody>
                <div className="px-4 flex flex-col items-center">
                  <div>
                    <label>Ingrese el enlace para generar el código QR:</label>
                    <Input
                      type="text"
                      value={url}
                      onChange={handleUrlChange}
                      className="max-w-md"
                    />
                  </div>
                  {url && (
                    <QRCodeGeneratorDisplay
                      url={url}
                      handleDownloadClick={handleDownloadClick}
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

export default QRCodeGenerator;
