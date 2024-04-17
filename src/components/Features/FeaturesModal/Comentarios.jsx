import React, { useContext, useEffect, useState } from "react"
import { ContextVariable } from "../../../Context"
const Comentario = ({ Open, setOpen }) => {
    const { auth, setalert, setIsOpenLogIn, isOpenLogIn } = useContext(ContextVariable)

    useEffect(() => {
        if (Open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [Open])

    const [comentario, setComentario] = useState('')
    const [isAuthComentario, setIsAuthComentario] = useState(false)


    const handleCloseModal = (e) => {
        e.preventDefault()
        setOpen(false)
        setComentario('')
    }

    useEffect(() => {
        if (isAuthComentario && !isOpenLogIn && !Open) {
            if (auth !== null) {
                setOpen(true);
                setIsAuthComentario(false)
            }
        }
    }, [isAuthComentario, isOpenLogIn, Open])


    

    const handleSaveComments = (e) => {
        e.preventDefault()
        if (auth === null) {
            setOpen(false)
            setIsOpenLogIn(true)
            setIsAuthComentario(true)
        } else {
            if (comentario === '') {
                window.alert("Por favor, añade un comentario antes de enviarlo.")
            } else {
           
                setalert({
                    ...alert,
                    open: true,
                    message: `Comentario enviado!`,
                    severity: 'success'
                })
                    setComentario('')
                    setOpen(false)
                
            }

        }
    }

    return (
        <>
            {Open && <div>
                <div className="fixed  inset-0 flex items-center justify-center z-50 mx-8 sm:mx-0 min-h-screen w-full backdrop-blur-sm" onClick={(e) => handleCloseModal(e)}>
                    <div className="rounded-[2.5rem] mx-auto w-2/4 flex flex-col bg-[#0b023f] border border-gray-300 p-4 shadow-lg " onClick={(e) => e.stopPropagation()}>
                        <p className="w-full text-2xl font-semibold text-white">HOLA!</p>

                        <hr className="my-1 h-5 border-t-5 bg-white" />
                        <p className="w-full text-white"> Tu opinion es importante. Nos gutaria saber que piensas sobre nosotros para asi brindarte un mejor servicio. Dejanos un comentario </p>

                        <textarea
                            type="text"
                            spellCheck="false"
                            placeholder=""
                            onChange={(e) => setComentario(e.target.value)}
                            className="title my-4 bg-gray-100 border border-gray-300 p-3 mb-4 outline-none"
                        />

                        <div className="buttons flex">
                            <div onClick={(e) => handleCloseModal(e)} className="rounded btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-white ml-auto  ">Cancel</div>

                            <button
                                type="button"
                                onClick={(e) => handleSaveComments(e)}
                                className="rounded btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Enviar</button>
                        </div>
                    </div>
                </div>

            </div>}

        </>
    )


}

export default Comentario;