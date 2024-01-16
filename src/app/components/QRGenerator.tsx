import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
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
      const fileName = result.urlWithProtocol.replace(/[^a-zA-Z0-9]/g, "_"); // Remueve caracteres no deseados
      link.href = result.dataURL;
      link.download = `${fileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const ImgColorBlack = () => {
    return (
      <svg
        fill="#000000"
        width="5em"
        height="5em"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M21,2H15a1,1,0,0,0-1,1V9a1,1,0,0,0,1,1h1v2h2V10h2v2h2V3A1,1,0,0,0,21,2ZM18,8H16V4h4V8ZM3,10H9a1,1,0,0,0,1-1V3A1,1,0,0,0,9,2H3A1,1,0,0,0,2,3V9A1,1,0,0,0,3,10ZM4,4H8V8H4ZM5,16v2H3V16ZM3,20H5v2H3Zm4-2v2H5V18Zm0-2H5V14H7V12H9v4ZM5,12v2H3V12Zm9,3v1H13V14H11v4h3v3a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V15a1,1,0,0,0-1-1H16V12H14Zm6,1v4H16V16ZM9,18h2v2h1v2H7V20H9ZM13,6H11V4h2ZM11,8h2v4H11ZM5,5H7V7H5ZM17,5h2V7H17Zm2,14H17V17h2Z"></path>
        </g>
      </svg>
    );
  };
  const ImgColorWhite = () => {
    return (
      <svg
        fill="#ffffff"
        width="5em"
        height="5em"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M21,2H15a1,1,0,0,0-1,1V9a1,1,0,0,0,1,1h1v2h2V10h2v2h2V3A1,1,0,0,0,21,2ZM18,8H16V4h4V8ZM3,10H9a1,1,0,0,0,1-1V3A1,1,0,0,0,9,2H3A1,1,0,0,0,2,3V9A1,1,0,0,0,3,10ZM4,4H8V8H4ZM5,16v2H3V16ZM3,20H5v2H3Zm4-2v2H5V18Zm0-2H5V14H7V12H9v4ZM5,12v2H3V12Zm9,3v1H13V14H11v4h3v3a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V15a1,1,0,0,0-1-1H16V12H14Zm6,1v4H16V16ZM9,18h2v2h1v2H7V20H9ZM13,6H11V4h2ZM11,8h2v4H11ZM5,5H7V7H5ZM17,5h2V7H17Zm2,14H17V17h2Z"></path>
        </g>
      </svg>
    );
  };
  return (
    <>
      <a
        onClick={onOpen}
        className="transition-all cursor-pointer duration-1000 dark:bg-white bg-[#0D001A] hover:bg-[#3c2058] dark:hover:bg-[#3c2058] hover:shadow-xl m-2 p-4 relative z-40 group  "
      >
        <div className="bg-[#3c2058]]/50 top-0 left-0 w-24 h-1 z-30 transition-all duration-200 group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          {isDarkMode ? <ImgColorBlack /> : <ImgColorWhite />}
          <h3 className="mt-8 text-lg font-semibold text-white dark:text-black group-hover:text-white ">
            Generador de Código QR
          </h3>
          <p className="mt-4 text-base text-gray-300 dark:text-gray-600 group-hover:text-white  ">
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
                Generador de Código QR
              </ModalHeader>
              <ModalBody>
                <div className="px-4 flex flex-col items-center">
                  <div className="">
                    <label>Ingrese el enlace para generar el código QR:</label>
                    <Input
                      type="text"
                      value={url}
                      onChange={handleUrlChange}
                      className="max-w-md"
                    />
                  </div>
                  {url && (
                    <>
                      <QRCode
                        value={url}
                        size={200}
                        level="H"
                        renderAs="canvas"
                        id="qrcode-canvas"
                        className="border border-blue-gray-200 mt-4"
                      />
                      <div className="flex items-center mt-2">
                        <Button color="success" onClick={handleDownloadClick}>
                          Descargar QR
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
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
