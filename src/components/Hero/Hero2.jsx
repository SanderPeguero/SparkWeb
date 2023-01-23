import { React, useState } from "react";
import DownloadAds from "./DownloadAds";
import VisibilitySensor from "react-visibility-sensor";
import { motion } from "framer-motion";

import P1 from '../../assets/p 1.png'
import P2 from '../../assets/p 2.png'
import P3 from '../../assets/p 3.png'
import P4 from '../../assets/p 4.png'
import Backgraphics from '../../assets/backgraphics.png'
import graphics from '../../assets/graphics.png'


function Hero() {
  const [elementIsVisible, setElementIsVisible] = useState(false);
  const bg = {
    true: {
      left: "7rem",
    },
    false: {
      left: "19rem",
    },
  };
  const musicPlayer = {
    true: {
      left: "-30px",
    },
    false: {
      left: "15px",
    },
  };
  const rect = {
    true: {
      left: "11rem",
    },
    false: {
      left: "13rem",
    },
  }
  const heart = {
    true: {
      left: "9rem",
    },
    false: {
      left: "12.5rem",
    },
  };
  return (
    <VisibilitySensor
      onChange={(isVisible) => setElementIsVisible(isVisible)}
      minTopValue={400}
    >
      <div className="wrapper flex md:flex-row flex-col items-center justify-between md:px-[5rem] px-[1rem] rounded-b-[5rem] w-[100%] md:h-[55rem] h-[55rem] relative">
        {/* left side */}
        <div className="headings flex flex-col items-start md:justify-center pb-[15rem] lg:pb-[5rem] justify-end h-[100%] md:pl-[10rem] md:text-[3rem] text-[2rem]  text-white">
          {/* <span>Experience The</span>{" "} */}
          <span>
            <b>Soluciones Almonte Gil</b>
          </span>
          <span className="text-[15px] text-[#525D6E]">
          Especialistas en el desarrollo de soluciones para la gestión de su empresa. 
          <br/> Desarrollamos el software necesario a la medida de las necesidades de nuestros clientes.
          </span>
          {/* download ads */}
          <div>
            <button className='bg-[#3aaa36] text-white w-[150px] rounded-md text-[1rem] my-6 mx-auto px-6 py-3'>Contactanos</button>
            {/* <span className="text-[13px]">Download now on IOS and Android</span> */}
            {/* <DownloadAds /> */}
          </div>
        </div>
        {/* right side */}
        <div className="images relative w-[20rem] md:w-[50rem]">
          {/* <img
            src={P1}
            alt=""
            className="absolute top-[-15rem] h-[34rem] left-[13rem]"
          /> */}
          <motion.img
            variants={musicPlayer}
            animate={`${elementIsVisible}`}
            transition={{
              duration: 1,
              type: "ease-out",
            }}
            src={graphics}
            alt=""
            className="absolute left-[-30px] sm:top-[-50rem] top-[-50rem] md:top-[-18rem] w-[675px]"
          />
          {/* <motion.img
            variants={rect}
            animate={`${elementIsVisible}`}
            transition={{
              type: "ease-out",
              duration: 1,
            }}
            src={P3}
            alt=""
            className="absolute w-[5rem] left-[13rem] top-[12rem]"
          /> */}
          {/* <motion.img
            variants={heart}
            animate={`${elementIsVisible}`}
            transition={{
              type: "ease-out",
              duration: 1,
            }}
            src={P4}
            alt=""
            className="absolute w-[5rem] left-[12.5rem] top-[12rem]"
          /> */}
        </div>
      </div>
    </VisibilitySensor>
  );
}

export default Hero;