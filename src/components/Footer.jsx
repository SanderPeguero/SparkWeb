import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import Logo from '../assets/SparkLogo.svg'
import { Link } from 'react-router-dom'
import instagram from '../assets/instagram.svg'
import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'
import linkedin from '../assets/linkedin.svg'

const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/grupo_spark/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];


const Footer = () => {
  return (
    <>
      <div className='max-w-[1240px] mx-auto py-12 px-4 grid lg:grid-cols-3 gap-8 md:gap-32 lg:gap-32 text-gray-300 border-t-[0.5px] border-t-[#3f3E45]'>
        <div>
          <img className='w-[17rem] text-3xl font-bold text-[#00df9a]' src={Logo} alt="SAG Logo" />
          <p className='py-4'>
            <span className=' text-lg font-bold'>Información de Contacto</span>
          </p>
          <p className='py-2'>
            Teléfono:   829-506-3137
          </p>
          {/* <p className='py-2'>
            Celular:  (849)-356-4820 / (809)-519-9963
          </p> */}
          <p className='py-2'>
              Email: sanderpeguero.21@gmail.com
          </p>
          {/* <p className='py-2'>
            Dirección:<Link to='/contacto' className='bg-[#f4bc23] text-black rounded-md text-[0.7rem] w-[100px] ml-4 my-3 px-3 py-2'>Ver en Mapa</Link>
          </p> */}
          {/* <div className='flex justify-between md:w-[75%] pt-4'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
          </div> */}
        </div>
        
        <div className='lg:col-span-2 flex justify-between pt-8'>
          <div>
            <h6 className='font-medium text-white pb-4 pt-2'>Solutions</h6>
            <ul>
              <li className='py-3 text-sm'>Analytics</li>
              <li className='py-3 text-sm'>Marketing</li>
              <li className='py-3 text-sm'>Commerce</li>
              <li className='py-3 text-sm'>Insights</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-white pb-4 pt-2'>Support</h6>
            <ul>
              <li className='py-3 text-sm'>Pricing</li>
              <li className='py-3 text-sm'>Blog</li>
              <li className='py-3 text-sm'>Guides</li>
              <li className='py-3 text-sm'>API Status</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-white pb-4 pt-2'>Company</h6>
            <ul>
              <li className='py-3 text-sm'>About</li>
              <li className='py-3 text-sm'>Jobs</li>
              <li className='py-3 text-sm'>Press</li>
              <li className='py-3 text-sm'>Careers</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-white pb-4 pt-2'>Legal</h6>
            <ul>
              <li className='py-3 text-sm'>Claim</li>
              <li className='py-3 text-sm'>Policy</li>
              <li className='py-3 text-sm'>Terms</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='max-w-[1240px] mx-auto sm:py-16 py-3'>
        <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6  border-t-[0.5px] border-t-[#3f3E45]'>
            <p className='font-poppins font-normal text-center text-[13px] leading-[27px] text-white'>
              © 2022 Copyright Quantum Republica Dominicana
            </p>

            <div className='flex flex-row md:mt-0 mt-6'>
                {socialMedia.map((social, index) => (
                  <img
                  key={social.id} 
                  src={social.icon} 
                  alt={social.id} 
                  className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? 'mr-6' : 'mr-0'}`}
                  onClick={() => window.open(social.link)}
                  />
                  ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default Footer;