import React, { useContext, useEffect, useState } from "react"
import { ContextVariable } from "../../../Context"
import { FaEdit } from "react-icons/fa"
import EditLongTextModal from "./Editlongtext"
import { EditFeature } from "../../../Scripts/Features/UploadAdmin"
const Comentario = ({ Open, setOpen, handleEditText, TextComentarios, setTextComentarios, data, setFeatureData }) => {
    const { auth, user, setalert, setIsOpenLogIn, isOpenLogIn } = useContext(ContextVariable)
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
    const [greeting, setGreeting] = useState('')
    const [id, setid] = useState(0)

    useEffect(() => {
     if (data) {
        setGreeting(data?.Feature.Modal.greeting)
        setTextComentarios(data?.Feature.Modal.LongText)
        setid(data?.Feature.Layout.Id)
        
     }
    }, [data])
    
   


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

    const handleEditGreeting = () => {
        const newTitle = prompt('Edit greeting:', greeting);
        if (newTitle !== null) {
            setGreeting(newTitle)
            console.log(id)
            EditFeature(newTitle, id, setFeatureData, 'Feature.Modal.greeting')
        }
    }

    const handleEditTextcomentario = () => {
        const newTitle = prompt('Edit Text:', TextComentarios);
        if (newTitle !== null) {
            setTextComentarios(newTitle)
            EditFeature(newTitle, id, setFeatureData, 'Feature.Modal.greeting')
        }
    }

 

    return (
        <>
            {Open && <div>
               
                <div className="fixed  inset-0 flex items-center justify-center z-50 mx-8 sm:mx-0 min-h-screen w-full backdrop-blur-sm" onClick={(e) => handleCloseModal(e)}>
                    <div className="rounded-[2.5rem] mx-auto w-2/4 flex flex-col bg-[#0b023f] border border-gray-300 p-4 shadow-lg " onClick={(e) => e.stopPropagation()}>
                        <div className="w-full text-2xl font-semibold text-white flex flex-row">
                            {greeting} { user?.name }
                            {user && user.role === 'admin' && (
                                <div className="px-3 py-2  text-xs leading-4">
                                    <button onClick={handleEditGreeting} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                        <FaEdit size={14} className="text-yellow-400" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <hr className="my-1 h-5 border-t-5 bg-white" />
                        <div className="w-full text-white flex flex-row"> {TextComentarios}  {user && user.role === 'admin' && (
                            <div className="px-3 py-2  text-xs leading-4">
                                <button onClick={handleEditText} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                    <FaEdit size={14} className="text-yellow-400" />
                                </button>
                            </div>
                        )}</div>

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