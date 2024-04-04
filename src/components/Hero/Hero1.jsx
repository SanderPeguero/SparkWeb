import React, {useContext, useEffect, useState} from 'react'
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
const Hero1 = () => {
  const { locattion, setlocattion } = useContext(ContextVariable);
  // const location = useLocation();
  const [location, setlocation] = useState(useLocation())

  useEffect(() => {
    setlocattion(location.pathname);
  }, [location, setlocattion]);

  console.log(location.pathname)


  
  return (
    <header className={`${styles.header} flex justify-content-center`}>
      <ContainerCard className="flex flex-column">
        <div className={styles["blur-circle-shape"]}></div>
        {location.pathname === "/" && (
            <Navbar />
        )}
        <BrickLayout />
        <div className={`${styles["headings-header"]} flex justify-content-center flex-column `}>
          <div className='mb-[15rem]'>
            <h2 className={styles["heading-header-title"]}>Se parte del coro.</h2>
         
          </div>
             <HeaderBoxes titles_numbers={JsonHeader.informations} />
          {/* <h1 className={styles["heading-header-second-title"]}>
            Artists make The Arts better <br />
            The Arts design the <span>world</span> better
          </h1> */}

          {/* <div className={`${styles["search-bar"]} flex align-items-center`}>
            <SearchNormal1 size="30" color="var(--white-100)" />
            <input className={`${styles["search-input"]}`} placeholder="Search who can change the world" />
            <button className={`${styles["search-btn"]} flex justify-content-center align-items-center`}>
              <Setting4 size="20" color="var(--dark-900)" />
            </button>
          </div> */}

   
        </div>
      </ContainerCard>
     
    </header>
  )
}

export default Hero1