import React, { useContext, useState, useEffect } from 'react';
import { CgUnavailable } from "react-icons/cg";
import { FaEdit } from 'react-icons/fa';
import { RiImageEditFill } from 'react-icons/ri';
import NosotrosModal from "./FeaturesModal/NosotrosModal";
import Comentario from './FeaturesModal/Comentarios';
import { ContextVariable } from '../../Context';
import EditLongTextModal from './FeaturesModal/Editlongtext';
import { AllFeature, EditFeature, SaveFeature } from '../../Scripts/Features/UploadAdmin';

function Features() {
    const { user, setalert } = useContext(ContextVariable)
    const [clickedIndex, setClickedIndex] = useState(null)
    const [openComments, setopenComments] = useState(false)
    const [openWe, setopenWe] = useState(false)
    const [featureData, setFeatureData] = useState([]);
    const [dataCommentarios, setDataCommentarios] = useState(null)
    const [FeatureDataNosotros, setFeatureDataNosotros] = useState(null)
    const [TextComentarios, setTextComentarios] = useState('')
    const [handleEditIma, setHandleEditImag] = useState(false)
    const [DatoImage, setDatoImage] = useState(null)

    const [TextNosotros, setTextNosotros] = useState('')

    const handleClick = (index, data) => {
        if (index === 0) {
            if (clickedIndex === index) {
                setClickedIndex(null)
            } else {
                setClickedIndex(index)
            }
        } else if (index === 1) {
            if (clickedIndex === index) {
                setClickedIndex(null)
            } else {
                setClickedIndex(index)
            }

        } else if (index === 2) {
            setopenComments(true)
            setDataCommentarios(data)
        } else if (index === 3) {
            setopenWe(true)
            setFeatureDataNosotros(data)
        }

    }

    useEffect(() => {
        AllFeature(setFeatureData)
    }, [])

    const handleEditTitle = async (index, Iddoc, id) => {

        const currentValue = featureData[index]?.Feature?.Layout['Title'];
        const newValue = prompt(`Edit ${currentValue}:`, currentValue);

        if (newValue !== null) {
            const newData = [...featureData]
            if (newData[index]?.Feature?.Layout) {
                newData[index].Feature.Layout = {
                    ...newData[index].Feature.Layout,
                    Title: newValue
                };
            }

            EditFeature(newValue, id, setFeatureData, 'Feature.Layout.Title')
        }
    }

    const handleEditImage = async (index, id) => {
        const currentValue = featureData[index]?.Feature?.Layout['Svg'];
        setDatoImage(id)
        setIsModalOpen(true)
        setwhichText("Editar Imagen")
        setCurrentText(currentValue)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [whichText, setwhichText] = useState('')

    const handleEditText = () => {
        if (openWe === true) {
            setopenWe(false)
            setIsModalOpen(true);
            setwhichText("Nosotros")
            setCurrentText(TextNosotros)
        } else if (openComments === true) {
            setopenComments(false)
            setIsModalOpen(true);
            setwhichText("Comentarios")
            setCurrentText(TextComentarios)
        } 



    };

    const handleCloseModalEditText = (newText, what) => {
        setIsModalOpen(false);
        if (newText !== undefined) {
            if (what === "Nosotros") {
                setTextNosotros(newText)
                setopenWe(true)
                const id = featureData[3]?.Feature?.Layout['Id'];
                EditFeature(newText, id, setFeatureData, 'Feature.Modal.LongText')

            } else if (what === "Comentarios") {
                setTextComentarios(newText)
                setopenComments(true)
                const id = featureData[2]?.Feature?.Layout['Id'];
                EditFeature(newText, id, setFeatureData, 'Feature.Modal.LongText')
            }else if (what === "Editar Imagen") {
              EditFeature(newText, DatoImage, setFeatureData, 'Feature.Layout.Svg')
            }
            setCurrentText(newText);
        }
    };

    const handleSave = () => {
        const FeatureData = {
            Feature: {
                Layout: {
                    Title: '',
                    Svg: '',
                },
                Modal: {
                    greeting: '',
                    LongText: '',
                },
            }
        }

    }

    return (
        <>
            <NosotrosModal
                Open={openWe}
                setOpen={setopenWe}
                handleEditText={handleEditText}
                data={FeatureDataNosotros}
                setFeatureData={setFeatureData}
                TextNosotros={TextNosotros}
                setTextNosotros={setTextNosotros}

            />
            <Comentario
                Open={openComments}
                setOpen={setopenComments}
                handleEditText={handleEditText}
                data={dataCommentarios}
                setFeatureData={setFeatureData}
                setTextComentarios={setTextComentarios}
                TextComentarios={TextComentarios}

            />
            <EditLongTextModal
                isOpen={isModalOpen}
                onClose={handleCloseModalEditText}
                initialValue={currentText}
                what={whichText}
                id={DatoImage}
            />
            <div className="text-gray-600 body-font -mt-8 -mb-8">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 text-center">
                        {featureData.map((data, index) => (

                            <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full" >
                                <div className='flex flex-row'>
                                    {user && user.role === 'admin' && (
                                        <div className="px-3 py-2 text-right  text-xs leading-4">
                                            <button onClick={() => handleEditImage(index, data.Feature?.Layout.Id)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                <RiImageEditFill size={14} className="text-yellow-400" />
                                            </button>
                                        </div>
                                    )}
                                    {user && user.role === 'admin' && (
                                        <div className="px-3 py-2 text-right  text-xs leading-4">
                                            <button onClick={() => handleEditTitle(index, data.Iddoc, data.Feature?.Layout.Id)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                <FaEdit size={14} className="text-yellow-400" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {clickedIndex === index ? (
                                    <div onClick={() => handleClick(index, data)} className="border-2 border-gray-200 px-4 py-6 rounded-lg0">
                                        <CgUnavailable className="text-gray-300 w-12 h-12 mb-3 inline-block" />
                                        <h2 className="title-font font-medium text-3xl text-[#ffffff]">-</h2>
                                        <p className="leading-relaxed">Not Available</p>
                                    </div>
                                ) : (
                                    <div onClick={() => handleClick(index, data)} className="border-2 border-gray-200 px-4 py-6 rounded-lg cursor-pointer">
                                        <div
                                            className={`w-12 h-12 mb-3 inline-block ${data.Feature?.Layout.Id === 1 ? 'text-[#d5612c]' : data.Feature?.Layout.Id === 2 ? 'text-[#d5612c]' : data.Feature?.Layout.Id === 3 ? 'text-[#2ebae5] ' : 'text-[#1c901c] '}`}
                                            dangerouslySetInnerHTML={{ __html: data.Feature?.Layout.Svg }} />
                                        <h2 className="title-font font-medium text-3xl text-[#ffffff]" > {data.Feature?.Layout.Title}</h2 >
                                        <p className="leading-relaxed"></p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;

