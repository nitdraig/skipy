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

const CreditCardGenerator = () => {
  const [creditCard, setCreditCard] = useState({
    number: "",
    name: "",
    expirationDate: "",
    cvv: "",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { value: isDarkMode } = useDarkMode(true);
  const generateCreditCard = () => {
    const random16Digits = () =>
      Math.floor(
        1000000000000000 + Math.random() * 9000000000000000
      ).toString();
    const randomName = () => "Cardholder Name";

    const randomExpirationDate = () => {
      const currentYear = new Date().getFullYear();
      const randomYear = currentYear + Math.floor(Math.random() * 5);
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      return `${String(randomMonth).padStart(2, "0")}/${randomYear}`;
    };
    const randomCVV = () => Math.floor(100 + Math.random() * 900).toString();

    setCreditCard({
      number: random16Digits(),
      name: randomName(),
      expirationDate: randomExpirationDate(),
      cvv: randomCVV(),
    });
  };
  const ImgColorBlack = () => {
    return (
      <svg
        fill="#000000"
        width="5em"
        height="5em"
        viewBox="0 0 60 60"
        id="Capa_1"
        version="1.1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <path d="M48,14c-1.276,0-2.469,0.349-3.5,0.947C43.469,14.349,42.276,14,41,14c-3.859,0-7,3.14-7,7s3.141,7,7,7 c1.276,0,2.469-0.349,3.5-0.947C45.531,27.651,46.724,28,48,28c3.859,0,7-3.14,7-7S51.859,14,48,14z M46,21 c0,1.394-0.576,2.654-1.5,3.562C43.576,23.654,43,22.394,43,21s0.576-2.654,1.5-3.562C45.424,18.346,46,19.606,46,21z M36,21 c0-2.757,2.243-5,5-5c0.631,0,1.23,0.13,1.787,0.345C41.68,17.583,41,19.212,41,21s0.68,3.417,1.787,4.655 C42.23,25.87,41.631,26,41,26C38.243,26,36,23.757,36,21z M48,26c-0.631,0-1.23-0.13-1.787-0.345C47.32,24.417,48,22.788,48,21 s-0.68-3.417-1.787-4.655C46.77,16.13,47.369,16,48,16c2.757,0,5,2.243,5,5S50.757,26,48,26z"></path>
            <path d="M55.783,8H4.217C1.892,8,0,9.892,0,12.217v35.566C0,50.108,1.892,52,4.217,52h51.566C58.108,52,60,50.108,60,47.783V12.217 C60,9.892,58.108,8,55.783,8z M58,47.783C58,49.005,57.006,50,55.783,50H4.217C2.994,50,2,49.005,2,47.783V12.217 C2,10.995,2.994,10,4.217,10h51.566C57.006,10,58,10.995,58,12.217V47.783z"></path>
            <path d="M6,18h9c0.553,0,1-0.448,1-1s-0.447-1-1-1H6c-0.553,0-1,0.448-1,1S5.447,18,6,18z"></path>
            <path d="M28,16h-9c-0.553,0-1,0.448-1,1s0.447,1,1,1h9c0.553,0,1-0.448,1-1S28.553,16,28,16z"></path>
            <path d="M6,23h1c0.553,0,1-0.448,1-1s-0.447-1-1-1H6c-0.553,0-1,0.448-1,1S5.447,23,6,23z"></path>
            <path d="M11,21c-0.553,0-1,0.448-1,1s0.447,1,1,1h2c0.553,0,1-0.448,1-1s-0.447-1-1-1H11z"></path>
            <path d="M19,22c0-0.552-0.447-1-1-1h-1c-0.553,0-1,0.448-1,1s0.447,1,1,1h1C18.553,23,19,22.552,19,22z"></path>
            <path d="M24,23c0.553,0,1-0.448,1-1s-0.447-1-1-1h-2c-0.553,0-1,0.448-1,1s0.447,1,1,1H24z"></path>
            <path d="M27.3,21.29C27.109,21.48,27,21.73,27,22s0.109,0.52,0.29,0.71C27.479,22.89,27.74,23,28,23s0.52-0.11,0.71-0.29 C28.89,22.52,29,22.26,29,22c0-0.26-0.11-0.52-0.29-0.7C28.34,20.92,27.66,20.92,27.3,21.29z"></path>
            <path d="M5,45h11v-8H5V45z M7,39h7v4H7V39z"></path>
            <path d="M18,45h11v-8H18V45z M20,39h7v4h-7V39z"></path>
            <path d="M31,45h11v-8H31V45z M33,39h7v4h-7V39z"></path>
            <path d="M44,45h11v-8H44V45z M46,39h7v4h-7V39z"></path>
          </g>
          <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>
          <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>
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
        viewBox="0 0 60 60"
        id="Capa_1"
        version="1.1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <path d="M48,14c-1.276,0-2.469,0.349-3.5,0.947C43.469,14.349,42.276,14,41,14c-3.859,0-7,3.14-7,7s3.141,7,7,7 c1.276,0,2.469-0.349,3.5-0.947C45.531,27.651,46.724,28,48,28c3.859,0,7-3.14,7-7S51.859,14,48,14z M46,21 c0,1.394-0.576,2.654-1.5,3.562C43.576,23.654,43,22.394,43,21s0.576-2.654,1.5-3.562C45.424,18.346,46,19.606,46,21z M36,21 c0-2.757,2.243-5,5-5c0.631,0,1.23,0.13,1.787,0.345C41.68,17.583,41,19.212,41,21s0.68,3.417,1.787,4.655 C42.23,25.87,41.631,26,41,26C38.243,26,36,23.757,36,21z M48,26c-0.631,0-1.23-0.13-1.787-0.345C47.32,24.417,48,22.788,48,21 s-0.68-3.417-1.787-4.655C46.77,16.13,47.369,16,48,16c2.757,0,5,2.243,5,5S50.757,26,48,26z"></path>
            <path d="M55.783,8H4.217C1.892,8,0,9.892,0,12.217v35.566C0,50.108,1.892,52,4.217,52h51.566C58.108,52,60,50.108,60,47.783V12.217 C60,9.892,58.108,8,55.783,8z M58,47.783C58,49.005,57.006,50,55.783,50H4.217C2.994,50,2,49.005,2,47.783V12.217 C2,10.995,2.994,10,4.217,10h51.566C57.006,10,58,10.995,58,12.217V47.783z"></path>
            <path d="M6,18h9c0.553,0,1-0.448,1-1s-0.447-1-1-1H6c-0.553,0-1,0.448-1,1S5.447,18,6,18z"></path>
            <path d="M28,16h-9c-0.553,0-1,0.448-1,1s0.447,1,1,1h9c0.553,0,1-0.448,1-1S28.553,16,28,16z"></path>
            <path d="M6,23h1c0.553,0,1-0.448,1-1s-0.447-1-1-1H6c-0.553,0-1,0.448-1,1S5.447,23,6,23z"></path>
            <path d="M11,21c-0.553,0-1,0.448-1,1s0.447,1,1,1h2c0.553,0,1-0.448,1-1s-0.447-1-1-1H11z"></path>
            <path d="M19,22c0-0.552-0.447-1-1-1h-1c-0.553,0-1,0.448-1,1s0.447,1,1,1h1C18.553,23,19,22.552,19,22z"></path>
            <path d="M24,23c0.553,0,1-0.448,1-1s-0.447-1-1-1h-2c-0.553,0-1,0.448-1,1s0.447,1,1,1H24z"></path>
            <path d="M27.3,21.29C27.109,21.48,27,21.73,27,22s0.109,0.52,0.29,0.71C27.479,22.89,27.74,23,28,23s0.52-0.11,0.71-0.29 C28.89,22.52,29,22.26,29,22c0-0.26-0.11-0.52-0.29-0.7C28.34,20.92,27.66,20.92,27.3,21.29z"></path>
            <path d="M5,45h11v-8H5V45z M7,39h7v4H7V39z"></path>
            <path d="M18,45h11v-8H18V45z M20,39h7v4h-7V39z"></path>
            <path d="M31,45h11v-8H31V45z M33,39h7v4h-7V39z"></path>
            <path d="M44,45h11v-8H44V45z M46,39h7v4h-7V39z"></path>
          </g>
          <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>
          <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>
        </g>
      </svg>
    );
  };

  return (
    <>
      <a
        onClick={onOpen}
        className="transition-all cursor-pointer  duration-1000 dark:bg-white bg-[#1a45db] hover:bg-[#387af9] dark:hover:bg-[#387af9] hover:shadow-xl m-2 p-4 relative z-40 group  "
      >
        <div className="bg-[#387af9]]/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          {isDarkMode ? <ImgColorBlack /> : <ImgColorWhite />}
          <h3 className="mt-8 text-lg font-semibold text-white dark:text-black group-hover:text-white ">
            Generador de tarjetas de crédito
          </h3>
          <p className="mt-4 text-base  text-gray-300 dark:text-gray-600 group-hover:text-white  ">
            Para fines educativos y de testeo, se genera aleatoriamente la
            información necesaria.
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
                Generador de Tarjetas de Crédito
              </ModalHeader>
              <ModalBody>
                <button
                  className="group relative h-10 w-full sm:w-48 overflow-hidden rounded-[7px] bg-[#162255] text-lg font-bold text-white"
                  onClick={generateCreditCard}
                >
                  Generar Tarjeta
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                </button>
                {creditCard.number && (
                  <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform ">
                    <img
                      className="relative object-cover w-full h-full rounded-xl"
                      src="https://i.imgur.com/kGkSg1v.png"
                    />

                    <div className="w-full px-8 absolute top-8">
                      <div className="flex justify-between">
                        <div className="">
                          <p className="font-light">Name</p>
                          <p className="font-medium tracking-widest">
                            {creditCard.name}
                          </p>
                        </div>
                        <img
                          className="w-14 h-14"
                          src="https://i.imgur.com/bbPHJVe.png"
                        />
                      </div>
                      <div className="pt-1">
                        <p className="font-light">Card Number</p>
                        <p className="font-medium tracking-more-wider">
                          {creditCard.number}
                        </p>
                      </div>
                      <div className="pt-6 pr-6">
                        <div className="flex justify-between">
                          <div className="">
                            <p className="font-light text-xs">Valid</p>
                            <p className="font-medium tracking-wider text-sm">
                              15/24
                            </p>
                          </div>
                          <div className="">
                            <p className="font-light text-xs text-xs">Expiry</p>
                            <p className="font-medium tracking-wider text-sm">
                              {creditCard.expirationDate}
                            </p>
                          </div>

                          <div className="">
                            <p className="font-light text-xs">CVV</p>
                            <p className="font-bold tracking-more-wider text-sm">
                              {creditCard.cvv}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

export default CreditCardGenerator;
