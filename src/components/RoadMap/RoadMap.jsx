import React, { useState, useEffect, useContext } from 'react';
import DSC1 from '../../assets/DSC_0015.jpg';
import DSC2 from '../../assets/DSC_0009.jpg';
import DSC3 from '../../assets/DSC_0016.jpg';
import { ContextVariable } from '../../Context';
//Icon
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";

const image = [
    { id: 1, image: DSC1 },
    { id: 2, image: DSC2 },
    { id: 3, image: DSC3 },
];
const RoadMap = () => {
    const { user } = useContext(ContextVariable)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setimages] = useState([])

    useEffect(() => {
        setimages(image)
    }, [])

    useEffect(() => {
        if (user && user.role !== 'admin' && user === null) {
            const interval = setInterval(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
            }, 5000);

            return () => clearInterval(interval);
        }

    }, []);

    const handleSliderClick = (index) => {
        setCurrentImageIndex(index);
    };
    const handleEditImg = (e, index) => {
        const selectedImage = e.target.files[0];
        console.log(index)
        if (selectedImage) {
            const reader = new FileReader();
            const confir = window.confirm("Are you sure want to edit the image?")
            if (confir) {
                reader.onload = () => {
                    const newListImg = [...images];
                    newListImg[index] = { ...images[index], image: reader.result };
                    setimages(newListImg);
                };
                reader.readAsDataURL(selectedImage);
            }

        }
    }

    useEffect(() => {
        console.log(images)
        console.log(currentImageIndex)
    }, [images])
    

    const handleDeleteImage = (index) => {
        console.log(index)
        const newListImg = [...images];
        const confir = window.confirm("Are you sure want to delete the image?")
        if (confir) {
            newListImg.splice(index, 1);
            setimages(newListImg);  
        }
    };

    const addNewImage = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            if (images.length >= 3 && images.length < 5) {
                const reader = new FileReader();
                reader.onload = () => {
                    const newImage = {
                        id: images.length + 1,
                        image: reader.result
                    };
                    setimages(prevImages => [...prevImages, newImage]);
                };
                reader.readAsDataURL(selectedImage);
            } else {

                console.log('No se pueden agregar más imágenes. Límite alcanzado.');
            }
        }
    };

    return (
        <div className='w-full h-full mt-8'>
            {user && user.role === 'admin' && (
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center'>
                        <label htmlFor={`file-upload`} className="px-3 py-2 text-right  text-xs leading-4">
                            <div className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-blue-400 hover:text-white focus:outline-none">
                                <input id={`file-upload`} onChange={addNewImage} type="file" className="hidden" />
                                <RiImageAddFill size={20} className="text-white" />
                            </div>
                        </label>
                    </div>
                    <div className='flex flex-row items-center '>
                        <label htmlFor={`file-upload-${currentImageIndex}`} className="px-3 py-2 text-right text-xs leading-4">
                            <div className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                <input id={`file-upload-${currentImageIndex}`} onChange={(e) => handleEditImg(e, currentImageIndex)} type="file" className="hidden" />
                                <FaEdit size={14} className="text-yellow-400" />
                            </div>
                        </label>
                        <div className="px-3 py-2 text-start text-xs leading-4">
                            <button onClick={() => handleDeleteImage(currentImageIndex)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none" >
                                <MdDelete size={14} color='red' />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="relative w-full h-[35rem] md:w-full">
                {images.map((image, index) => (
                    <div key={index}>
                        <img className={`absolute inset-0 w-full h-full object-cover rounded-md ${currentImageIndex !== image.id - 1 && 'hidden'}`} src={image.image} alt={`Slider Image ${image.id}`} />
                        
                    </div>
                ))}

            </div>
            <div className="flex items-center justify-center mt-8">
                {images.map((_, index) => (
                    <button key={index} className={`w-3 h-3 mx-2 ${currentImageIndex === index ? "bg-pink-500" : "bg-gray-300"} rounded-full md:mx-0 focus:outline-none`} onClick={() => handleSliderClick(index)}></button>
                ))}
            </div>
        </div>
    )
}

export default RoadMap