import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setNav(!nav);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, left: open });
  };

  return (
    <div>{/*Fijar NavBar */}
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        <a href='/'>
          <div className='flex items-center'>
            <img className='w-[3.5rem] text-3xl font-bold text-[#00df9a]' src={Logo} alt="Sparkle Group Logo" />
            <h1 className='w-full ml-2 text-3xl font-bold text-[#ffffff]'>Spark Group</h1>
          </div>
        </a>
        <ul className='hidden md:flex'>
          <li className='p-4'><Link className='text-white' to='/' replace={true}>Inicio</Link></li>
          <li className='p-4'><Link className='text-white' to='boletas'>Boletas</Link></li>
          <li className='p-4'><Link className='text-white' to='activacion'>Activacion</Link></li>
          <li className='p-4'><Link className='text-white' href='/'>Tienda</Link></li>
          <li className='p-4'><a className='text-white' href='/'>Info</a></li>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul className={nav ? 'z-10 fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 ' : 'ease-in-out duration-500 fixed left-[-100%] z-10'}
          onClick={handleNav}
          onKeyDown={handleNav}
        >
          {/* <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1> */}
          <img className='w-[6rem] text-3xl font-bold text-[#00df9a] p-4' src={Logo} alt="SAG Logo" />
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='/'>Inicio</Link></li>
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='boletas'>Boletas</Link></li>
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='activacion'>Activacion</Link></li>
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='/'>Tienda</Link></li>
          <li className='p-4 border-b border-gray-600'><Link className='text-white' to='/'>Info</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;