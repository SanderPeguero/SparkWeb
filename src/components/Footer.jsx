import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import Logo from '../assets/Logo.png'
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
          <div className='flex items-center'>
            <img className='w-[3.5rem] text-3xl font-bold text-[#00df9a]' src={Logo} alt="Sparkle Group Logo" />
            <h1 className='w-full ml-2 text-3xl font-bold text-[#ffffff]'>Spark Group</h1>
          </div>
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
            <h6 className='font-medium text-white pb-4 pt-2'>Tickets</h6>
            <ul>
              <li className='py-3 text-sm'><Link to='boletas'>Boletas</Link></li>
              <li className='py-3 text-sm'><Link to='activacion'>Activacion</Link></li>
              <li className='py-3 text-sm'><Link>Dashboard</Link></li>
              <li className='py-3 text-sm'><Link>Mantenimiento</Link></li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-white pb-4 pt-2'>Store</h6>
            <ul>
              <li className='py-3 text-sm'><Link>Tienda</Link></li>
              <li className='py-3 text-sm'><Link>Ordenes</Link></li>
              <li className='py-3 text-sm'><Link>Dashboard</Link></li>
              <li className='py-3 text-sm'><Link>Mantenimiento</Link></li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-white pb-4 pt-2'>Company</h6>
            <ul>
              <li className='py-3 text-sm'><Link>About</Link></li>
              <li className='py-3 text-sm'><Link>Jobs</Link></li>
              <li className='py-3 text-sm'><Link>Press</Link></li>
              <li className='py-3 text-sm'><Link>Careers</Link></li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-white pb-4 pt-2'>Legal</h6>
            <ul>
              <li className='py-3 text-sm'><Link>Claim</Link></li>
              <li className='py-3 text-sm'><Link>Policy</Link></li>
              <li className='py-3 text-sm'><Link>Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='max-w-[1240px] mx-auto sm:py-16 py-3'>
        <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6  border-t-[0.5px] border-t-[#3f3E45]'>
            <p className='font-poppins font-normal text-center text-[13px] leading-[27px] text-white'>
              © 2023 Copyright Spark Group Republica Dominicana
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