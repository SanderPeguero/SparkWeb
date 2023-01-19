import React from 'react';
// import Typed from 'react-typed';
import TypeAnimation from './TypeAnimation';

const Hero = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[950px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
        </p>
        <h1 className='md:text-[5rem] sm:text-[3rem] text-[2rem] font-bold md:py-6'>
          Soluciones Almonte Gil
        </h1>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Somos especialistas en el desarrollo de soluciones para la gestión de su empresa. <br/> Desarrollamos el software necesario a la medida de sus necesidades concretas.</p>
        <div className='flex justify-center items-center'>
          <p className='md:text-3xl sm:text-2xl text-xl font-bold py-4 text-[rgb(242,196,15)]'>
            var&nbsp;
          </p>
          <p className='md:text-3xl sm:text-2xl text-xl font-bold py-4'>
            Productos =&nbsp;
          </p>
          <p className='md:text-3xl sm:text-2xl text-xl font-bold py-4 text-[rgb(25,137,252)]'>
            {"{"}
          </p>
          <TypeAnimation 
            className='md:text-3xl sm:text-2xl text-xl font-bold md:pl-4 pl-2' 
            text={"Unicos"}
            strings={['Unicos' , 'Innovadores', 'Competitivos']}
            typeSpeed={140}
            backSpeed={120}
            backSpeedDelay={2000}
            space
          />
            
          {/* <Typed
          className='md:text-3xl sm:text-2xl text-xl font-bold md:pl-4 pl-2'
            strings={['Unicos , 'Innovadores ', 'Competitivos ']}
            typeSpeed={70}
            backSpeed={60}
            loop
            showCursor
          /> */}
          <p className='md:text-3xl sm:text-2xl text-xl font-bold py-4 text-[rgb(25,137,252)]'>
              {"}"}
          </p>
          <p className='md:text-3xl sm:text-2xl text-xl font-bold py-4'>
            {";"}
          </p>
        </div>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
