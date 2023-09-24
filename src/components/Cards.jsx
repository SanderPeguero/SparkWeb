import React from 'react';
import Single from '../assets/single.png'
import Double from '../assets/double.png'
import Triple from '../assets/triple.png'

const Cards = () => {
  return (
    <div className='w-full py-[4rem] px-4 bg-[#101728]'>
        {/* <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 p-4'>
            Soporte
        </h1> */}
        <div className='lg:col-span-2 my-8 sm:ml-[7rem] md:ml-[4rem]'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            ¿Desea consejos y trucos para optimizar su flujo?
          </h1>
          <p>Solicite soporte personalizado.</p>
        </div>
      <div className='max-w-[1240px]  mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='w-full bg-gray-100 shadow-xl flex flex-col p-4 my-4 rounded-[2rem] hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[3rem]' src={Single} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>1 hora</h2>
              <p className='text-center text-4xl font-bold'>$100</p>
              {/* <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>500 GB Storage</p>
                  <p className='py-2 border-b mx-8'>1 Granted User</p>
                  <p className='py-2 border-b mx-8'>Send up to 2 GB</p>
              </div> */}
              <button className='bg-[#f4bc23] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Solicitar</button>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-4 rounded-[2rem] hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[3rem] bg-transparent' src={Double} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>5 horas</h2>
              <p className='text-center text-4xl font-bold'>$150</p>
              {/* <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>500 GB Storage</p>
                  <p className='py-2 border-b mx-8'>1 Granted User</p>
                  <p className='py-2 border-b mx-8'>Send up to 2 GB</p>
              </div> */}
              <button className='bg-[#3859a5] text-[#ffffff] w-[200px] rounded-[2rem] font-medium my-6 mx-auto px-6 py-3'>Solicitar</button>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 my-4 rounded-[2rem] hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[3rem] ' src={Triple} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>10 Horas</h2>
              <p className='text-center text-4xl font-bold'>$200</p>
              {/* <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>500 GB Storage</p>
                  <p className='py-2 border-b mx-8'>1 Granted User</p>
                  <p className='py-2 border-b mx-8'>Send up to 2 GB</p>
              </div> */}
              <button className='bg-[#277dc0] text-white w-[200px] rounded-[2rem] font-medium my-6 mx-auto px-6 py-3'>Solicitar</button>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 my-4 rounded-[2rem] hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[3rem]' src={Triple} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>1 Mes</h2>
              <p className='text-center text-4xl font-bold'>$400</p>
              {/* <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>500 GB Storage</p>
                  <p className='py-2 border-b mx-8'>1 Granted User</p>
                  <p className='py-2 border-b mx-8'>Send up to 2 GB</p>
              </div> */}
              <button className='bg-[#3aaa36] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Solicitar</button>
          </div>
      </div>
    </div>
  );
};

export default Cards;