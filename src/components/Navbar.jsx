import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import Logo from '../assets/Logo.svg'

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <img className='w-[7rem] text-3xl font-bold text-[#00df9a]' src={Logo} alt="SAG Logo" />
      {/* <h1 className='w-full text-3xl font-bold text-[#00df9a]'>REACT.</h1> */}
      <ul className='hidden md:flex'>
        <li className='p-4'>Inicio</li>
        <li className='p-4'>Productos</li>
        <li className='p-4'>Servicios</li>
        <li className='p-4'>Soporte</li>
        <li className='p-4'>Nosotros</li>
        <li className='p-4'>Contacto</li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        {/* <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1> */}
        <img className='w-[8rem] text-3xl font-bold text-[#00df9a] p-4' src={Logo} alt="SAG Logo" />
          <li className='p-4 border-b border-gray-600'>Inicio</li>
          <li className='p-4 border-b border-gray-600'>Productos</li>
          <li className='p-4 border-b border-gray-600'>Servicios</li>
          <li className='p-4 border-b border-gray-600'>Soporte</li>
          <li className='p-4 border-b border-gray-600'>Nosotros</li>
          <li className='p-4'>Contacto</li>
      </ul>
    </div>
  );
};

export default Navbar;