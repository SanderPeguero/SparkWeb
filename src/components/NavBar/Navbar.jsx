import React, { useState, useEffect, useContext } from 'react'

import Logo from '../../assets/Logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ContextVariable } from '../../Context';
import UserMenu from './UserMenu';

import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import styles from "./Nav.module.css"
import Button from '../Elements/Button/Button';

import SignIn from '../../layout/SignIn/SignIn';
import Login from '../../layout/Login/Login';
import EditIma from '../BrickLayout/EditIma';
import img1 from '../../../public/dummy_image/1.jpg';
import img2 from '../../../public/dummy_image/dj.avif';
import img3 from '../../../public/dummy_image/djrecord.webp';
import img4 from '../../../public/dummy_image/4.jpg';
import img5 from '../../../public/dummy_image/luces.avif';
import img6 from '../../../public/dummy_image/6.jpg';
import img7 from '../../../public/dummy_image/7.jpg';
import img8 from '../../../public/dummy_image/8.jpg';
import img9 from '../../../public/dummy_image/9.jpg';

const images = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
  { id: 4, image: img4 },
  { id: 5, image: img5 },
  { id: 6, image: img6 },
  { id: 7, image: img7 },
  { id: 8, image: img8 },
  { id: 9, image: img9 },
];


const Navbar = () => {
  const { setlocattion, auth, user, setIsOpenLogIn, setIsOpenSignUp, setGalleryVisible, GalleryVisible, setFiestaVisible } = useContext(ContextVariable);
  // console.log(user?.role)
  // /activacion
  const links = [
    {
      name: 'Inicio',
      route: `${user && user.role === 'admin' ? '/admin' : '/'}`
    },
    {
      name: 'Boletas',
      route: `${user && user.role === 'admin' ? '/admin/boletas' : '/boletas'}`

    },


    // {
    //   name: 'Galeria',
    //   route: `${user && user.role === 'admin' ? '/admin/allImage' : '/allImage'}`
    // },

  ]

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = ''
  };

  const history = useNavigate()
  const handleGalleryVisible = () => {
    if (location.pathname !== '/' && location.pathname !== '/admin') {
      history('/')
      setGalleryVisible(true)
    } else {
      setGalleryVisible(true)
    }
  }

  const handleFiestaVisible = () => {
    if (location.pathname !== '/' && location.pathname !== '/admin') {
      history('/')
      setFiestaVisible(true)
    } else {
      setFiestaVisible(true)
    }
  }

  return (

    // etiqueta vacia componentete login y SingIn,  el navar completo
    <>
      <Login />
      <SignIn />
      <EditIma images={images} />
      <nav className={`${styles.nav} flex align-items-center`}>
        {/*  */}
        <a href='/'>
          <div className='flex items-center'>
            <img className='w-[3.5rem] text-3xl font-bold text-[#00df9a]' src={Logo} alt="Sparkle Group Logo" />
            <h1 className={`ml-2 ${styles["nav-title"]}`}>Grupo Spark</h1>
          </div>
        </a>
        {/* <img src={Logo} className='h-6 w-6'/>
      <h1 className={styles["nav-title"]} >Grupo Spark</h1> */}
        <ul className={`flex align-items-center ${styles["navbar-nav"]}`}>
          {links.map((link) => (
            <li key={link.name} className={`${styles["nav-item"]} ${location.pathname === link.route ? `ml-2 ${styles.active}` : ''}`}>
              <Link className='text-white' to={link.route} onClick={() => setlocattion(link.route)}>
                {link.name}
              </Link>
            </li>
          ))}
          <li className={`${styles["nav-item"]} `}>
            <button onClick={handleFiestaVisible} className='text-white' >
              Fiesta
            </button>
          </li>
          <li className={`${styles["nav-item"]} `}>
            <button onClick={handleGalleryVisible} className='text-white' >
              Galeria
            </button>
          </li>
        </ul>
        {
          auth == null ?
            <div className={`flex ${styles["navbar-buttons"]}`}>

              <Button onClick={() => setIsOpenLogIn(true)} theme="transparent" className="hover:bg-gradient-to-r hover:from-[#9340FF] hover:to-[#ba36ba]">Login</Button>
              <Button onClick={() => setIsOpenSignUp(true)} theme="matrix" className="text-white  bg-gradient-to-r from-[#9340FF] to-[#ba36ba]">Sign up</Button>
            </div>
            :
            <UserMenu user={user} />
        }

        <div className={`${styles["navbar-responsive-menu"]}`}>
          {isMobileMenuOpen === true ?
            <Button onClick={toggleMobileMenu} theme="transparent">
              <IoMdClose size="32" color="var(--white-100)" />
            </Button>
            :
            <Button onClick={toggleMobileMenu} theme="transparent">
              <GiHamburgerMenu size="32" color="var(--white-100)" />
            </Button>
          }

        </div>

      </nav>
      {isMobileMenuOpen && (
        <>
          <ul className={`fixed   left-0 right-0 bg-gray-900 py-2 flex flex-col items-center  z-50 `}>
            {links.map((link) => (
              <li key={link.name} className={`block px-4 py-2 ${styles["nav-item"]} ${location.pathname === link.route ? ` ${styles.active}` : ''}`}>
                <Link className='text-white' to={link.route} onClick={() => setlocattion(link.route)}>
                  {link.name}
                </Link>
              </li>
            ))}
            <li className={`block px-4 py-2 ${styles["nav-item"]} `}>
              <button onClick={handleFiestaVisible} className='text-white' >
                Fiesta
              </button>
            </li>
            <li className={`block px-4 py-2 ${styles["nav-item"]} `}>
              <button onClick={handleGalleryVisible} className='text-white' >
                Galeria
              </button>
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default Navbar;

{/* <div>Fijar NavBar 

     
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        <a href='/'>
          <div className='flex items-center'>
            <img className='w-[3.5rem] text-3xl font-bold text-[#00df9a]' src={Logo} alt="Sparkle Group Logo" />
            <h1 className='w-full ml-2 text-3xl font-bold text-[#ffffff]'>Spark Group</h1>
          </div>
        </a>
        <ul className='hidden md:flex'>
          {links.map((link) => (
            <li key={link.text} className={`px-[1.5vw] pt-4 ${link.link == 'login' ? 'ml-[2vw]' : ''}`}><Link className='text-white' to={link.link} replace={link.replace}>{link.text}</Link></li>
          ))}
          {
            auth == null ?
              <Link to='login' className='px-[1.5vw] ml-[2vw]'>
                <button className="group relative h-8 w-24 overflow-hidden rounded-xl bg-[#3d36ba] text-md text-white my-[1.20rem]">
                  Log In
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                </button>
              </Link>
              :
              <UserMenu user={user}/>
          }
        </ul>
         <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul className={nav ? 'z-10 fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 ' : 'ease-in-out duration-500 fixed left-[-100%] z-10'}
          onClick={handleNav}
          onKeyDown={handleNav}
        >
          <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>
          <img className='w-[6rem] text-3xl font-bold text-[#00df9a] p-4' src={Logo} alt="SAG Logo" />
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='/'>Inicio</Link></li>
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='boletas'>Boletas</Link></li>
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='activacion'>Activacion</Link></li>
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='/'>Tienda</Link></li>
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='/'>Info</Link></li>
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='/'>Info</Link></li>
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='/'>Info</Link></li>
        </ul>
      </div>
    </div> */}