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
import {
  ImgColorBlack,
  ImgColorWhite,
} from "./creditcardgenerator/SVGCreditCard";
import Image from "next/image";
import CreditCardDetails from "./creditcardgenerator/CreditCardDetails";

const CreditCardGenerator = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { value: isDarkMode } = useDarkMode(true);

  const [creditCard, setCreditCard] = useState({
    number: "",
    name: "",
    expirationDate: "",
    cvv: "",
  });

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
                <CreditCardDetails
                  creditCard={creditCard}
                  generateCreditCard={generateCreditCard}
                />
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

export default CreditCardGenerator;
