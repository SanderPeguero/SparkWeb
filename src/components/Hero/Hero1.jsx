import React, { useContext, useEffect, useState } from 'react'
import styles from "./Hero1.module.css"
import ContainerCard from '../ContainerCard/ContainerCard'
import Navbar from '../NavBar/Navbar'
import BrickLayout from '../BrickLayout/BrickLayout'

import { SearchNormal1 } from "iconsax-react";
import { Setting4 } from "iconsax-react";

import HeaderBoxes from './HeaderBoxes/HeaderBoxes'
import Features from '../Features/Features'
// import JsonHeader from '../../Jsons/HeaderBoxes.json';
import JsonHeader from './HeaderBoxes.json'
import { useLocation } from 'react-router-dom'
import { ContextVariable } from '../../Context'

//Icon
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




const Hero1 = () => {
  const { locattion, setlocattion, user, isOpenEditImg, setisOpenEditImg } = useContext(ContextVariable);
  // const location = useLocation();
  const [location, setlocation] = useState(useLocation())
  const [TextHero, setTextHero] = useState('Se parte del coro.')

  useEffect(() => {
    setlocattion(location.pathname);
  }, [location, setlocattion]);


  const handleEditTextHero = () => {
    const newTitle = prompt('Edit text Hero1:', TextHero);
    if (newTitle !== null) {
      setTextHero(newTitle);
    }
  }

  const handleOpenEditImage = () => {
    setisOpenEditImg(!isOpenEditImg)
  }


  return (
    <>

      <header className={`${styles.header} flex justify-content-center`}>
        <ContainerCard className="flex flex-column">
          <div className={styles["blur-circle-shape"]}></div>
          {location.pathname === "/" && (
            <Navbar />
          )}
          {location.pathname === '/admin' && (
            <Navbar />
          )}
          <BrickLayout  />

          <div className={`${styles["headings-header"]} flex justify-content-center flex-column `}>
            <div className='mb-[15rem]'>
              <div className="flex flex-row my-2 items-center">
                <h2 className={styles["heading-header-title"]}>{TextHero}</h2>
                {user && user.role === 'admin' && (
                  <div className="px-3 py-2 text-right  text-xs leading-4">
                    <button onClick={handleEditTextHero} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                      <FaEdit size={14} className="text-yellow-400" />
                    </button>
                  </div>
                )}

              </div>

              {user && user.role === 'admin' && (
                <div className="px-3 py-2 ml-[20rem]  text-xs leading-4">
                  <button onClick={() => handleOpenEditImage()} className="group relative flex items-center justify-center h-12 w-1/2 md:w-48 overflow-hidden rounded-xl text-lg font-bold text-white">
                    <span className="mr-2">Edit images</span>
                    <FaEdit size={14} className="text-yellow-400" />
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                  </button>
                </div>
              )}

            </div>
            <HeaderBoxes titles_numbers={JsonHeader.informations} />
          </div>
        </ContainerCard>

      </header>
    </>
  )
}

export default Hero1