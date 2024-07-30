import React from "react";
import { FaBook } from "react-icons/fa";
import { BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className=" mx-auto m-auto">
      <div className="  h-full flex flex-col gap-8 items-center text-center justify-between p-10 sm:p-7">
        <span className="h-[1.1px] right-0 absolute w-full bg-gray-300 block"></span>
        <div className="mt-5 mb-[-1em]">
          <p className="dark:text-white text-[#162255]">
            Proyecto sin fines de lucro, de libre uso.
          </p>
          <span className="text-[0.6rem] uppercase ">
            (El creador no se responsabiliza por el mal uso de las herramientas
            ofrecidas)
          </span>
        </div>
        <div className="dark:text-white text-[#162255] flex items-center mb-[-1em]   justify-center gap-8 sm:gap-5">
          <p className="lg:text-md text-sm">Puedes seguirme en mis redes:</p>
          <a
            data-aos="fade-up"
            data-aos-duration="1000"
            href="https://www.linkedin.com/in/avellaneda-agustín-tns"
            target="_blank"
            className="box font-medium text-white   flex items-center justify-center flex-col"
          >
            <BsLinkedin className="dark:text-white text-black hover:text-[#6e6e6e] text-3xl hover:scale-125 cursor-pointer" />
          </a>
          <a
            data-aos="fade-up"
            data-aos-duration="1200"
            href="https://twitter.com/nitdraig"
            target="_blank"
            className="box font-medium text-white  flex items-center justify-center flex-col"
          >
            <BsTwitter className=" dark:text-white text-black hover:text-[#6e6e6e] text-3xl hover:scale-125 cursor-pointer" />
          </a>
          <a
            data-aos="fade-up"
            data-aos-duration="1200"
            href="https://es.blog.agustin.top"
            target="_blank"
            className="box font-medium text-white  flex items-center justify-center flex-col"
          >
            <FaBook className="dark:text-white text-black hover:text-[#6e6e6e] text-3xl hover:scale-125 cursor-pointer" />
          </a>
        </div>
        <div className="text-sm dark:text-white text-[#162255] hover:text-[#1b39b2]">
          <a href="https://www.agustin.top" target="_blank">
            Dev with love by Agustín Avellaneda
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
