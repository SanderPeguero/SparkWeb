import { React, useState } from "react";
import DownloadAds from "./DownloadAds";
import VisibilitySensor from "react-visibility-sensor";
import { motion } from "framer-motion";


import graphics from '../../assets/SparkleMania.png'
import LandingPage from '../../assets/Bg.png'


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
      <div>


        <img src={LandingPage} className="object-cover w-full h-[40rem]"/>
        <div className="wrapper flex md:flex-row flex-col items-center justify-between md:px-[6rem] px-[1rem] rounded-b-[5rem] w-[100%] md:h-[55rem] h-[55rem] relative">
          {/* left side */}
          <div className="images relative w-[20rem] md:w-[50rem]">
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
            <span className="text-[17px] text-[#ffffff]">
              Sparklemania sera una celebración deslumbrante que iluminara la<br />
              noche con su encanto y diversión desenfrenada!<br />
              Los disfraces son la esencia de Sparklemania, donde la<br />
              imaginación se convertira en realidad.<br />
              Así que, vístete con tus atuendos más brillantes y únetenos,<br />
              La diversión, la música y la amistad te esperan.
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
