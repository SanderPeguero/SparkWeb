import * as React from 'react';
// import Typed from 'react-typed';

import { Card } from 'react-bootstrap';

import LandingPage from '../../assets/LandingPage.png'

const Home = () => {

    return (
        <div>
            <img
                src={LandingPage}
                alt=""
                className="absolute top-[-15rem] h-[34rem] left-[13rem]"
            />
            <div className='text-white'>
                <div className='max-w mt-[50px]   w-full h-screen mx-auto text-center flex flex-col  justify-center'>
                    <p className='text-[#00df9a] font-bold p-2'>
                    </p>
                    <h1 className=' md:text-[5rem] sm:text-[3rem] text-[2rem] font-bold md:py-6'>
                        Soluciones Almonte Gil
                    </h1>
                    <p className='md:text-2xl text-xl font-bold text-gray-500'>Somos especialistas en el desarrollo de soluciones para la gestión de su empresa. <br /> Desarrollamos el software necesario a la medida de sus necesidades concretas.</p>
                </div>
            </div>
        </div>
    )
}

export default Home