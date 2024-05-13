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

const Navbar = () => {
  const { setlocattion, locattion, auth, user, setIsOpenLogIn, setIsOpenSignUp, setGalleryVisible, GalleryVisible } = useContext(ContextVariable);

  const Location = useLocation();
  
  const getBoletasRutasAdmin = () => {
    if (Location.pathname === '/admin/comprar') {
      return '/admin/comprar';
    } else if (Location.pathname === '/admin/reservar') {
      return '/admin/reservar';
    } else {
      return '/admin/boletas';
    }
  };
  const getBoletasRutasCommon = () => {
    if (Location.pathname === '/comprar') {
      return '/comprar';
    } else if (Location.pathname === '/reservar') {
      return '/reservar';
    } else {
      return '/boletas';
    }
  };

  const links = [
    {
      name: 'Inicio',
      route: `${user && user.role === 'admin' ? '/admin' : '/'}`
    },
    {
      name: 'Boletas',
      route: `${user && user.role === 'admin' ? `${getBoletasRutasAdmin()}` : `${getBoletasRutasCommon()}`}`

    },

    {
      name: 'Activacion',
      route: `${user && user.role === 'admin' ? '/admin/activacion' : '/activacion'}`
    },
  ]

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = () => {
    localStorage.clear();
    window.Location.href = ''
  };

  const history = useNavigate()
  const handleGalleryVisible = () => {
    if (Location.pathname !== '/' && Location.pathname !== '/admin') {
      history('/')
      setGalleryVisible(true)
    } else {
      setGalleryVisible(true)
    }
  }

  const Obtenerruta = (Ruta) => {
    console.log("Ruta obtenidad")
    console.log(Ruta)
  }

  return (
    <>
      <Login />
      <SignIn />
      <EditIma />
      <nav className={`${styles.nav} flex align-items-center`}>
        {/*  */}
        <a href='/'>
          <div className='flex items-center'>
            <img className='w-[3.5rem] text-3xl font-bold text-[#00df9a]' src={Logo} alt="Sparkle Group Logo" />
            <h1 className={`ml-2 ${styles["nav-title"]}`}>Grupo Spark</h1>
          </div>
        </a>
        <ul className={`flex align-items-center ${styles["navbar-nav"]}`}>
          {links.map((link) => (
            <li key={link.name} className={`${styles["nav-item"]} ${Location.pathname === link.route ? `ml-2 ${styles.active}` : ''}`}>
              <Link className='text-white' to={link.route} onClick={() => setlocattion(link.route)}>
                {link.name}
              </Link>
            </li>
          ))}
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
              <li key={link.name} className={`block px-4 py-2 ${styles["nav-item"]} ${Location.pathname === link.route ? ` ${styles.active}` : ''}`}>
                <Link className='text-white' to={link.route} onClick={() => setlocattion(link.route)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Navbar