
const Comentario = ({ Open, setOpen }) => {

   const handleCloseModal = (e) => {
        e.preventDefault()
        setOpen(false)
    }


    return (
        <>
            {Open && <div>
                <div className="fixed  inset-0 flex items-center justify-center z-50 mx-8 sm:mx-0 min-h-screen w-full backdrop-blur-sm"  onClick={(e) => handleCloseModal(e)}>
                    <div className="rounded-[2.5rem] mx-auto w-2/4 flex flex-col bg-[#0b023f] border border-gray-300 p-4 shadow-lg " onClick={(e) => e.stopPropagation()}>
                        <p className="w-full text-2xl font-semibold text-white">HOLA!</p>
                    
                        <hr className="my-1 h-5 border-t-5 bg-white" />
                        <p className="w-full text-white"> Tu opinion es importante. Nos gutaria saber que piensas sobre nosotros para asi brindarte un mejor servicio. Dejanos un comentario </p>

                        <input 
                         className="title my-4 bg-gray-100 border border-gray-300 p-3 mb-4 outline-none" 
                         spellCheck="false" placeholder="" type="text" />

                        <div className="buttons flex">
                            <div onClick={(e) => handleCloseModal(e)} className="rounded btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-white ml-auto  ">Cancel</div>

                            <div className="rounded btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Enviar</div>
                        </div>
                    </div>
                </div>

            </div>}

        </>
    )


}

export default Comentario;