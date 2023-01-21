import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import Logo from '../assets/ColorLogo.svg'
import { Link } from 'react-router-dom'



const Footer = () => {
  return (
    <>
      <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 md:gap-32 lg:gap-32 text-gray-300'>
        <div>
          <img className='w-[7rem] text-3xl font-bold text-[#00df9a]' src={Logo} alt="SAG Logo" />
          <p className='py-4'>
            <span className=' text-lg font-bold'>Información de Contacto</span>
          </p>
          <p className='py-2'>
            Teléfono:   809-588-2012
          </p>
          <p className='py-2'>
            Celular:  (849)-356-4820 / (809)-519-9963
          </p>
          <p className='py-2'>
              Email: info@sagrd.com
          </p>
          <p className='py-2'>
            Dirección:<Link to='/contacto' className='bg-[#f4bc23] text-black rounded-md text-[0.7rem] w-[100px] ml-4 my-3 px-3 py-2'>Ver en Mapa</Link>
          </p>
          <div className='flex justify-between md:w-[75%] pt-4'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
          </div>
        </div>
        
        <div className='lg:col-span-2 flex justify-between pt-8'>
          <div>
            <h6 className='font-medium text-gray-600 pb-4 pt-2'>Solutions</h6>
            <ul>
              <li className='py-3 text-sm'>Analytics</li>
              <li className='py-3 text-sm'>Marketing</li>
              <li className='py-3 text-sm'>Commerce</li>
              <li className='py-3 text-sm'>Insights</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-gray-600 pb-4 pt-2'>Support</h6>
            <ul>
              <li className='py-3 text-sm'>Pricing</li>
              <li className='py-3 text-sm'>Blog</li>
              <li className='py-3 text-sm'>Guides</li>
              <li className='py-3 text-sm'>API Status</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-gray-600 pb-4 pt-2'>Company</h6>
            <ul>
              <li className='py-3 text-sm'>About</li>
              <li className='py-3 text-sm'>Jobs</li>
              <li className='py-3 text-sm'>Press</li>
              <li className='py-3 text-sm'>Careers</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-gray-600 pb-4 pt-2'>Legal</h6>
            <ul>
              <li className='py-3 text-sm'>Claim</li>
              <li className='py-3 text-sm'>Policy</li>
              <li className='py-3 text-sm'>Terms</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;