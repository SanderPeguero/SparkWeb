// EditIma.jsx
import React, { useContext, useState, useEffect } from 'react';
import { ContextVariable } from '../../Context';
//Icon
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdSave } from 'react-icons/md';
import { UploadFile, EditImageHero1, DeleteImageHero1 } from '../../Scripts/UploadHero1';
const EditIma = () => {
    const { isOpenEditImg, setisOpenEditImg, user, listImg, setListImg, ListImages, setListImages } = useContext(ContextVariable);

    const handleCloseModal = (e) => {
        e.preventDefault()
        setisOpenEditImg(false)
    }
    const handleEditImg = (e, index) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            var r = window.confirm('Are you sure to edit this Image?');
            if (r == true) {
                EditImageHero1(selectedImage, index, setListImages)
            }

        }
    }

    const handleDeleteImg = (index) => {
        var r = window.confirm('Are you sure to delete this Image?');
        if (r == true) {
            DeleteImageHero1(index, setListImages)
        }
    }

    // const handleSaveImg = async (e, id) => {
    //     console.log("Id : " + id)
    //     const selectedImage = e.target.files[0];
    //     if (selectedImage) {
    //         UploadFile(selectedImage, id); 
    //     }
    // }

    return (
        <>
            {isOpenEditImg &&
                <div className='fixed  inset-0 flex items-center justify-center z-50 mx-8 sm:mx-0 min-h-screen w-full '>
                    <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-full m-4" >
                        <div className="px-6 py-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Images Hero</h3>
                        </div>

                        <div className="prose max-w-screen-md p-6 overflow-y-auto" style={{ maxHeight: '70vh', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.375rem', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>

                            <div className=" grid w-full sm:grid-cols-3 xl:grid-cols-4 gap-6 ">
                                {ListImages.map((imag, index) => (
                                    <div key={imag.Id} className="flex flex-col items-start">
                                        {user && user.role === 'admin' && (
                                            <div className='flex flex-row items-center'>
                                                <label htmlFor={`file-upload-${index + 1}`} className="px-3 py-2 text-right  text-xs leading-4">
                                                    <div className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                        <input id={`file-upload-${index + 1}`} type="file" onChange={(e) => handleEditImg(e, imag.Id)} className="hidden" />
                                                        <FaEdit size={14} className="text-yellow-400" />
                                                    </div>
                                                </label>
                                                <div className="px-3 py-2 text-start text-xs leading-4">
                                                    <button onClick={() => handleDeleteImg(imag.Id)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none">
                                                        <MdDelete size={14} color='red' />
                                                    </button>
                                                </div>
                                                {/* <label htmlFor={`file-upload-${index + 1}`} className="px-3 py-2 text-right text-xs leading-4">
                                                    <div className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                        <input id={`file-upload-${index + 1}`} type="file" onChange={(e) => handleSaveImg(e, imag.id)} className="hidden" />
                                                        <MdSave size={14} className="text-yellow-400" />
                                                    </div>
                                                </label> */}

                                                {/* <div className="px-3 py-2 text-start text-xs leading-4">
                                                    <button onClick={handleSaveImg} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none">
                                                        <MdSave size={14} color='red' />
                                                    </button>
                                                </div> */}
                                            </div>
                                        )}
                                        <img className="w-48 h-48" src={imag.Url} alt="" />
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex align-items justify-end p-4 gap-4 flex-row">
                            <button onClick={(e) => handleCloseModal(e)} type="button" className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 sm:w-auto sm:text-sm">Accept</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default EditIma;
