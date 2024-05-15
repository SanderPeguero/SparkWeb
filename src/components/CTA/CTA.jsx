import React from 'react'

const CTA = () => {
    return (
        <div className='mt-8'>
            <div className="container my-1  md:px-6">

                <section >
                    {/* bg-[url('https://drive.google.com/file/d/1ipnaKoOlzuFmwW6_A9yl0j8LBNWarCEm/view?usp=sharing')] 
para color  bg-gradient-to-r from-[#9340FF] to-[#ba36ba]
*/}
                    <div
                        className="relative overflow-hidden bg-cover bg-no-repeat bg-[60%] bg-[url('https://i.postimg.cc/25dKbcys/2.jpg')] h-[500px]">
                        <div
                            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
                            <div className="flex h-full items-center justify-center">
                                <div className="px-6 text-center text-white md:px-12">
                                    <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight">
                                        ¡Sé parte de la vibrante experiencia " <span className="text-pink-500">Away and Spark</span><span>"!<br />Consigue tus boletas hoy.</span>
                                    </h2>
                                    <button className="group relative h-12 w-48 overflow-hidden rounded-xl bg-gradient-to-r from-[#9340FF] to-[#ba36ba] text-lg font-bold text-white my-4">
                                        Compra ya!
                                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default CTA