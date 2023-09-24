import React from 'react';
import { Link } from 'react-router-dom';

const Newsletter = () => {
  return (
    <div className='w-full py-16 text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Obtén información sobre nuestros eventos
          </h1>
          <p>Suscribete a nuestro newsletter y mantente al tanto.</p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='bg-[#00000086] p-3 flex w-full rounded-md text-white'
              type='email'
              placeholder='Email'
            />
            <button className='bg-gradient-to-r from-[#9340FF] to-[#FF3C5F] text-white rounded-[7rem] font-medium w-[200px] ml-4 my-6 px-6 py-3'>
              Notificame
            </button>
          </div>
          <p>
            Nos preocupamos por la proteccion de tus datos. Lee nuestra{' '}
            <Link className='text-[#9340FF]'>Politica de Privacidad.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;