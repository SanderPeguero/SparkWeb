import React from 'react';

const Newsletter = () => {
  return (
    <div className='w-full py-16 text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Obten información sobre nuestros productos y eventos
          </h1>
          <p>Suscribete a nuestro newsletter y mantente al tanto.</p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='email'
              placeholder='Email'
            />
            <button className='bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>
              Notificame
            </button>
          </div>
          <p>
            Nos preocupamos por la proteccion de tus datos. Lee nuestra{' '}
            <span className='text-[#00df9a]'>Politica de Privacidad.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;