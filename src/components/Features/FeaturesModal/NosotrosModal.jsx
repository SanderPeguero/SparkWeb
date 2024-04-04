
const NosotrsoModal = ({ Open, setOpen }) => {

    const handleCloseModal = (e) => {
        e.preventDefault()
        setOpen(false)
    }
    console.log(Open)

    return (
        <>
            {Open &&
                <div className="fixed  inset-0 flex items-center justify-center z-50 mx-8 sm:mx-0 min-h-screen w-full backdrop-blur-sm" onClick={(e) => handleCloseModal(e)}>
                    <div className="h-screen w-3/4 mx-auto mt-24 space-y-20 flex justify-center items-center" >
                        <div className="max-w-screen-md md:w-3/4 mx-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full p-4 bg-[#0b023f] rounded-[2.5rem]">
                                <div className="w-full">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="w-full">
                                            <p className="w-full text-2xl font-semibold text-white">GRUPO SPARK</p>

                                        </div>
                                        <button
                                            onClick={(e) => handleCloseModal(e)}
                                            className='text-gray-500 hover:text-gray-700 focus:outline-none'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>

                                    </div>
                                    <div className="mb-4 mt-2 border-t-2 bg-white"></div>
                                </div>



                                <p className="w-full pb-8 text-md tracking-wide leading-normal text-white" style={{ lineHeight: "2" }}>
                                    En Grupo Spark, cada evento es una oportunidad para sumergirse en un ambiente lleno de alegría y originalidad, donde la música, la comida y las bebidas se fusionan para crear momentos memorables.
                                    Con una amplia variedad de temáticas y DJs que adaptan la música a cada ocasión,
                                    cada fiesta es única y emocionante.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )



}

export default NosotrsoModal;