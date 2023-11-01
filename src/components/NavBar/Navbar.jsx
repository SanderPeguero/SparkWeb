import React, { useState, useEffect, useContext } from 'react'

import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom';

import UserMenu from './UserMenu';


const links = [
  { 'link': '/', 'text': 'Inicio', 'replace': true },
  { 'link': 'boletas', 'text': 'Boletas', 'replace': false },
  { 'link': 'activacion', 'text': 'Activacion', 'replace': false },
  { 'link': '/', 'text': 'Tienda', 'replace': false },
  // { 'link': '/', 'text': 'Info', 'replace': false },
  // {'link':'login', 'text':'Log In', 'replace': false },
]

const Navbar = ({ auth, user }) => {


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
        {/* <div onClick={handleNav} className='block md:hidden'>
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
        </ul> */}
      </div>
    </div>
  );
};

export default Navbar;