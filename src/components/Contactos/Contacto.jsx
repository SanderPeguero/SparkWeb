import React from "react";


const Contacto = () => {

    return (
        <div className=" h-full w-full p-4 flex  justify-center ">

            <div className="text-white  rounded-md dark:bg-slate-800 bg-transparent">

                <form className=" p-8   md:w-[450px] ">
                    <div className="flex flex-row justify-center">
                        <h6 className="md:text-[2rem] sm:text-[2.5rem]  font-bold md:py-3 text-white">Contáctanos</h6>
                    </div>

                    <div className="mx-auto max-w-4xl  text-black mb-4 ">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-white"> Nombre</label>
                        <div className="relative fixed mt-2 rounded shadow-sm">
                            <input required className="  rounded py-2 pr-3 pl-10  w-full focus:border-gray-400 focus-outline-none focus:shadow-md" />
                           
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 mx-2 fill-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                            </div>
                        </div>
                    </div>


                    <div className="mx-auto max-w-4xl  text-black mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2  text-white"> Teléfono</label>
                        <div className="relative mt-2 rounded shadow-sm">
                            <input required className=" text-white  rounded py-2 pr-3 pl-10  w-full focus:border-gray-400 focus-outline-none focus:shadow-md" />
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 mx-2 fill-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>


                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-4xl  text-black mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2  text-white"> Correo</label>
                        <div className="relative mt-2 rounded shadow-sm">
                            <input required className=" text-white  rounded py-2 pr-3 pl-10  w-full focus:border-gray-400 focus-outline-none focus:shadow-md" />
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 mx-2 fill-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    <div className="mx-auto max-w-4xl  text-black mb-4 ">
                        <label className="block text-gray-700 text-sm font-bold mb-2  text-white"> Mensage</label>
                        <div className="relative mt-2 rounded shadow-sm ">
                            <textarea required className="text-white  rounded py-2 pr-3 pl-10  w-full focus:border-gray-400 focus-outline-none focus:shadow-md " />
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 mx-2 fill-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>

                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                            Enviar Mensage
                        </button>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default Contacto
