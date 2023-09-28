import { React, useState } from "react";
// import DownloadAds from "./DownloadAds";
import VisibilitySensor from "react-visibility-sensor";
import { motion } from "framer-motion";


import graphics from '../../assets/SparkleMania.png'
// import LandingPage from '../../assets/Bg.png'


function PayNow({ name, price, discount}) {
  return (
    <>
      <div className="px-4 mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
          <img alt="logo" width="520" height="120" src={graphics} />
          <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5 md:mt-8 max-w-min">
            <div className="mb-6">
              <h2 className="font-sans text-3xl sm:mt-0 mt-6 font-medium tracking-tight text-white sm:text-4xl sm:leading-none max-w-lg mb-3">
                Hola <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#9340FF] from-[#FF3C5F]">{name}</span>
              </h2>
              <div className="text-white mt-10">
                Puedes pagar tu boleta comunicandote con:<br/><br/>
                 Sander Peguero<br/>
                 Keyla Herrera<br/>
              </div>
              <span className="text-[17px] text-[#ffffff] font-anonymous w-[350px] md:w-[446.98px]">

              </span>
              <div className="text-[30px] text-[#ffffff] font-anonymous w-[350px] md:w-[446.98px]">
                <br />RD${price - discount}.00
                {
                  discount ? <div className="text-[12px]">Un descuento de RD${discount} se aplicó automaticamente al precio regular de RD${price}</div> : null
                }
              </div>
            </div>
            {/* <div className='space-x-4'>
              <button className='bg-gradient-to-r from-[#9340FF] to-[#FF3C5F] text-white rounded-[4rem] text-[1rem] my-6 mx-auto px-6 py-3'>Pagar Ahora</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}


function unpaid({ name, price, discount }) {
  const [elementIsVisible, setElementIsVisible] = useState(false);

  const [payNow, setpayNow] = useState(false);

  if(payNow) {
    return(<PayNow name={name} price={price} discount={discount}/>)
  }

  return (
    <>
      <div className="px-4 mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
          <img alt="logo" width="520" height="120" src={graphics} />
          <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5 md:mt-8 max-w-min">
            <div className="mb-6">
              <h2 className="font-sans text-3xl sm:mt-0 mt-6 font-medium tracking-tight text-white sm:text-4xl sm:leading-none max-w-lg mb-3">
                Hola <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#9340FF] from-[#FF3C5F]">{name}</span>
              </h2>
              <p className="text-white text-base md:text-md mb-4">
                Tu boleta no se ha podido activar en este momento porque aun no está paga.<br /><br />
              </p>
              <span className="text-[17px] text-[#ffffff] font-anonymous w-[350px] md:w-[446.98px]">
                Sparkle Mania es un evento que iluminará la noche con su encanto, los disfraces son la esencia de este evento, asi que vistete como quieras y ven a brillar con nosotros esta noche, la música, la amistad y las buenas vibras te esperan.
              </span>
              <div className="text-[30px] text-[#ffffff] font-anonymous w-[350px] md:w-[446.98px]">
                <br />RD${price - discount}.00
                {
                  discount ? <div className="text-[11px]">Un descuento de RD${discount}.00 se aplicó automaticamente al precio regular de RD${price}.00</div> : null
                }
              </div>
            </div>
            <div className='space-x-4'>
              <button onClick={() => setpayNow(true)} className='bg-gradient-to-r from-[#9340FF] to-[#FF3C5F] text-white rounded-[4rem] text-[1rem] my-6 mx-auto px-6 py-3'>Pagar Ahora</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  // return ()

}

export default unpaid;
