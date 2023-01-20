import * as React from 'react';
// import Typed from 'react-typed';

import { Card } from 'react-bootstrap';

const Home = () => {

    return (
        <div>
            <div className='text-white'>
                <div className='max-w mt-[50px]   w-full h-screen mx-auto text-center flex flex-col  justify-center'>
                    <p className='text-[#00df9a] font-bold p-2'>
                    </p>
                    <h1 className=' md:text-[5rem] sm:text-[3rem] text-[2rem] font-bold md:py-6'>
                        Soluciones Almonte Gil
                    </h1>
                    <p className='md:text-2xl text-xl font-bold text-gray-500'>Somos especialistas en el desarrollo de soluciones para la gestión de su empresa. <br /> Desarrollamos el software necesario a la medida de sus necesidades concretas.</p>
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
                        {/* <Typed
                            className='md:text-3xl sm:text-2xl text-xl font-bold md:pl-4 pl-2'
                            strings={['Unicos ', 'Innovadores ', 'Competitivos ']}
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
                    {/*-----------------------------------Card-------------------------------------------- */}
                    <div className="flex flex-col md:flex-row justify-center text-black px-8  ">

                        <div className='bg-sky-600 border-1' style={{ width: '18rem' }}>
                            <div className='flex flex-col'>
                                <p className=" text-sky-600 bg-white">Desarrollo de Software</p>
                            </div>
                            <Card.Body>
                                {/* <Card.Title className='text-black bg-white '>Desarrollo de Software</Card.Title> */}
                                <Card.Text>
                                    Nuestra principal actividad
                                    es el desarrollo de software a medida.
                                    Realizamos todo el proceso, desde el estudio de los requisitos,
                                    pasando por el análisis, diseño,
                                    desarrollo hasta el posterior mantenimiento del producto software que necesite su empresa.
                                </Card.Text>
                            </Card.Body>
                        </div>


                        <div className='bg-amber-500 border-1' style={{ width: '18rem' }}>
                            <div className='flex flex-col'>
                                <p className="text-sky-600 bg-white">Cliente - Servidor</p>
                            </div>
                            <Card.Body>
                                {/* <Card.Title className='text-white'>Cliente - Servidor</Card.Title> */}
                                <Card.Text>
                                    Desarrollamos software cliente-servidor client-server
                                    y Diseño de paginas Web Dinamicas con herramientas de
                                    última generación, que nos permiten generar aplicaciones
                                    ágiles, escalables y orientada a objetos.
                                </Card.Text>
                            </Card.Body>
                        </div>

                        <div className='bg-green-600 border-1' style={{ width: '18rem' }}>
                            <div className='flex flex-col'>
                                <p className="text-sky-600 bg-white">Mantenimiento y Soporte de Software</p>
                            </div>
                            <Card.Body className=''>
                                {/* <Card.Title className='text-white'>Mantenimiento y Soporte de Software</Card.Title> */}
                                <Card.Text className=''>
                                    El Mantenimiento del Software es un aspecto necesario
                                    para el correcto funcionamiento y para mantener al sistema
                                    apto para los cambios que presentan día a día. Soluciones Almonte Gil
                                    ofrece contrato de mantenimiento adaptado a la realidad de cada cliente.
                                </Card.Text>
                            </Card.Body>
                        </div>

                        {/* <div className='bg-white ' style={{ width: '18rem' }}>.
                            <div className='flex flex-col'>
                            <p className="text-sky-600 bg-white">Mantenimiento y Soporte de Software</p>
                            </div>
                            <Card.Body>
                                
                                <Card.Text>
                                    Desarrollamos aplicaciones moviles adaptadas a tus necesidades,
                                    y que se complementan con nuestros sistemas para una mejor integración
                                    y movilidad de su negocio o empresa.
                                </Card.Text>
                            </Card.Body>
                        </div> */}

                        {/* <div className=" w-30 border-1 ">
                            <p className=" text-sky-600 bg-white">Desarrollo de Software</p>

                            <p className="px-8 bg-sky-600 h-77">
                                Nuestra principal actividad
                                es el desarrollo de software a medida.
                                Realizamos todo el proceso, desde el estudio de los requisitos,
                                 pasando por el análisis, diseño, 
                                 desarrollo hasta el posterior mantenimiento del producto software que necesite su empresa.
                            </p>
                        </div> */}

                        {/* <div className="w-30 border-1">
                            <p className="text-sky-600 bg-white">Cliente - Servidor</p>

                            <p className="px-8 bg-amber-500 h-77">
                            Desarrollamos software cliente-servidor client-server
                             y Diseño de paginas Web Dinamicas con herramientas de 
                             última generación, que nos permiten generar aplicaciones 
                             ágiles, escalables y orientada a objetos.
                            </p>

                        </div> */}

                        {/* <div className="w-30 border-1">
                            <p className="text-sky-600 bg-white">Mantenimiento y Soporte de Software</p>
                            <p className=" px-8 bg-green-600 h-77">
                            El Mantenimiento del Software es un aspecto necesario para 
                            el correcto funcionamiento y para mantener al sistema apto 
                            para los cambios que presentan día a día. Soluciones Almonte Gil 
                            ofrece contrato de mantenimiento adaptado a la realidad de cada cliente.
                            </p>

                        </div> */}

                    </div>
                    {/*-----------------------------------Card-------------------------------------------- */}

                    <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>

                </div>
            </div>
        </div>
    )
}

export default Home