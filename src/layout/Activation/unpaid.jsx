import { React, useState } from "react";
// import DownloadAds from "./DownloadAds";
import VisibilitySensor from "react-visibility-sensor";
import { motion } from "framer-motion";


import graphics from '../../assets/SparkleMania.png'
// import LandingPage from '../../assets/Bg.png'


function Hero({ name, price, discount }) {
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
    <>
      <div className="px-4 mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
          <img alt="logo" width="520" height="120" src={graphics} />
          <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
            <div className="max-w-xl mb-6">
              <h2 className="font-sans text-3xl sm:mt-0 mt-6 font-medium tracking-tight text-white sm:text-4xl sm:leading-none max-w-lg mb-3">
                Hola <span className="text-[#ff35bf]">{name}</span>
              </h2>
              <p className="text-white text-base md:text-md mb-4">
                Tu boleta no se ha podido activar en este momento
              </p>
              <span className="text-[17px] text-[#ffffff] font-anonymous w-[446.98px]">
                Sparkle Mania es un evento que iluminara la <br />
                noche con su encanto, los disfraces son la<br />
                esencia de este evento, asi que vistete como<br />
                quieras y ven a brillar con nosotros esta noche,<br />
                la musica, la amistad y las buenas vibras te esperan.
              </span>
              <div className="text-[30px] text-[#ffffff] font-anonymous w-[446.98px] mt-[1rem]">
                RD${price - discount}.00
                {
                  discount ? <div className="text-[10px]">Un descuento de RD${discount} se aplicó automaticamente al precio regular de RD${price}</div> : null
                }
              </div>
            </div>
            <div className='space-x-4'>
              <button className='bg-gradient-to-r from-[#9340FF] to-[#FF3C5F] text-white rounded-[4rem] text-[1rem] my-6 mx-auto px-6 py-3'>Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )



  return (
    <VisibilitySensor
      onChange={(isVisible) => setElementIsVisible(isVisible)}
      minTopValue={400}
    >
      <div>


        {/* <img src={LandingPage} className="object-cover w-full h-[40rem]"/> */}
        <div className="wrapper flex md:flex-row flex-col items-center justify-between md:px-[6rem] px-[1rem] rounded-b-[5rem] w-[100%] md:h-[55rem] h-[55rem] relative">
          {/* left side */}
          <div className="images absolute md:relative w-[20rem] md:w-[675px]">
            <motion.img
              variants={musicPlayer}
              animate={`${elementIsVisible}`}
              transition={{
                duration: 1,
                type: "ease-out",
              }}
              src={graphics}
              alt=""
              className="absolute left-[-30px] sm:top-[0rem] top-[0rem] md:top-[-30rem] w-[675px]"
            />

          </div>

          {/* right side */}
          <div className="headings flex flex-col items-start md:justify-center pb-[15rem] lg:pb-[20rem] justify-end h-[100%] md:pl-[10rem] md:text-[3rem] text-[2rem]  text-white">
            {/* <span>Experience The</span>{" "} */}
            {/* <span>
            <b>Soluciones Almonte Gil</b>
          </span> */}
            <span className="text-[17px] text-[#ffffff] font-anonymous w-[446.98px]">
              Sparkle Mania es un evento que iluminara la <br />
              noche con su encanto, los disfraces son la<br />
              esencia de este evento, asi que vistete como<br />
              quieras y ven a brillar con nosotros esta noche,<br />
              la musica, la amistad y las buenas vibras te esperan.
            </span>
            {/* download ads */}
            <div>
              <button className='bg-gradient-to-r from-[#9340FF] to-[#FF3C5F] text-white rounded-[4rem] text-[1rem] my-6 mx-auto px-6 py-3'>Mas Informacion</button>
              {/* <span className="text-[13px]">Download now on IOS and Android</span> */}
              {/* <DownloadAds /> */}
            </div>
          </div>

        </div>
      </div>
    </VisibilitySensor>
  );
}

export default Hero;
