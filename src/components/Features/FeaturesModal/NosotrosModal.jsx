import React, { useContext, useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { ContextVariable } from "../../../Context"
import { EditFeature } from "../../../Scripts/Features/UploadAdmin"

const NosotrsoModal = ({ Open, setOpen, handleEditText, TextNosotros, setTextNosotros, data, setFeatureData }) => {
    const { user } = useContext(ContextVariable)
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

    const [NamePage, setNamePage] = useState('')
    const [id, setid] = useState(0)

    useEffect(() => {
      if (data) {
            setTextNosotros(data?.Feature.Modal.LongText)
            setNamePage(data?.Feature.Modal.greeting)
            setid(data?.Feature.Layout.Id)
        }
    }, [data])
    

    const handleCloseModal = (e) => {
        e.preventDefault()
        setOpen(false)
    }

    const handleEditGreeting = () => {
        const newTitle = prompt(`Edit: `, NamePage);
        if (newTitle !== null) {
            setNamePage(newTitle)
            console.log(id)
            EditFeature(newTitle, id, setFeatureData, 'Feature.Modal.greeting')
        }
    }


    return (
        <>
            {Open &&
                <div className="fixed inset-0 flex items-center justify-center z-50 mx-15 sm:mx-0 min-h-screen w-full backdrop-blur-sm" onClick={(e) => handleCloseModal(e)}>
                    <div className="h-screen w-3/4 mt-24 space-y-1 flex justify-center items-center" >
                        <div className="max-w-screen-md md:w-3/4 mx-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="inline-flex flex-col space-y-4 items-center justify-end flex-1 h-full p-4 bg-[#0b023f] border border-gray-300 rounded-[2.5rem]">
                                <div className="w-full">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="w-full">
                                            <div className="w-full text-3xl font-semibold text-white flex flex-row">
                                                {NamePage}
                                                {user && user.role === 'admin' && (
                                                    <div className="px-3 py-2  text-xs leading-4">
                                                        <button onClick={handleEditGreeting} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                            <FaEdit size={14} className="text-yellow-400" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

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



                                <div className="w-full pb-8 text-md tracking-wide leading-normal text-white" style={{ lineHeight: "2" }}>
                                   {TextNosotros}
                                    {user && user.role === 'admin' && (
                                        <div className="px-3 py-2  text-xs leading-4">
                                            <button onClick={handleEditText} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                <FaEdit size={14} className="text-yellow-400" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )



}

export default NosotrsoModal;