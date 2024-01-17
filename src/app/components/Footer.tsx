import React from "react";
import { GiCoffeeCup } from "react-icons/gi";
import { SiMercadopago } from "react-icons/si";
import { FaCcPaypal } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" mx-auto m-auto">
      <div className="  h-full flex flex-col gap-8 items-center justify-between p-10 sm:p-7">
        <span className="h-[1.1px] right-0 absolute w-full bg-gray-300 block"></span>
        <div className="mt-5">
          <p className="dark:text-white text-[#162255]">
            Proyecto sin fines de lucro
          </p>
        </div>
        <div className="dark:text-white text-[#162255] flex items-center  mb-2 justify-center gap-8 sm:gap-5">
          <p>Pero puedes donar para mantener a flote el mismo:</p>
          <a
            data-aos="fade-up"
            data-aos-duration="1000"
            href="https://www.linkedin.com/in/avellaneda-agustín-tns"
            target="_blank"
            className="box font-medium text-white   flex items-center justify-center flex-col"
          >
            <GiCoffeeCup className="dark:text-white text-black hover:text-[#dbdbdb] text-3xl hover:scale-125 cursor-pointer" />
          </a>
          <a
            data-aos="fade-up"
            data-aos-duration="1200"
            href="https://twitter.com/nitdraig"
            target="_blank"
            className="box font-medium text-white  flex items-center justify-center flex-col"
          >
            <SiMercadopago className=" dark:text-white text-black hover:text-[#dbdbdb] text-3xl hover:scale-125 cursor-pointer" />
          </a>
          <a
            data-aos="fade-up"
            data-aos-duration="1200"
            href="https://twitter.com/nitdraig"
            target="_blank"
            className="box font-medium text-white  flex items-center justify-center flex-col"
          >
            <FaCcPaypal className=" dark:text-white text-black hover:text-[#dbdbdb] text-3xl hover:scale-125 cursor-pointer" />
          </a>
        </div>
        <div className="sm:text-1xl dark:text-white text-[#162255] hover:text-[#1b39b2]">
          <a href="https://www.agustin.top" target="_blank">
            Dev with love by Agustín Avellaneda
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
