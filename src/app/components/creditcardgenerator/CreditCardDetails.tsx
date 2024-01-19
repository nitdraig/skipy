import React from "react";
import Image from "next/image";
interface CreditCardDetailsProps {
  creditCard: any;
  generateCreditCard: () => void;
}
const CreditCardDetails: React.FC<CreditCardDetailsProps> = ({
  creditCard,
  generateCreditCard,
}) => (
  <div>
    <div className="text-center">
      <button
        className="group relative  h-10 w-full sm:w-48 overflow-hidden rounded-[7px] bg-[#162255] text-lg font-bold text-white"
        onClick={generateCreditCard}
      >
        Generar Tarjeta
        <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
      </button>
    </div>
    {creditCard.number && (
      <div className="w-96 h-56 m-auto mt-5 bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform ">
        <img
          alt="CreditCard"
          className="relative object-cover w-full h-full rounded-xl"
          src="CreditCardImage.png"
        />

        <div className="w-full px-8 absolute top-8">
          <div className="flex justify-between">
            <div className="">
              <p className="font-light">Name</p>
              <p className="font-medium tracking-widest">{creditCard.name}</p>
            </div>
            <img
              alt="MasterCardLogo"
              className="w-14 h-14"
              src="MasterCardLogo.png"
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
                <p className="font-medium tracking-wider text-sm">15/24</p>
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
  </div>
);

export default CreditCardDetails;
