import React, { useState, useEffect } from 'react';
import DSC1 from '../../assets/DSC_0015.jpg';
import DSC2 from '../../assets/DSC_0009.jpg';
import DSC3 from '../../assets/DSC_0016.jpg';
const RoadMap = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [DSC1, DSC2, DSC3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSliderClick = (index) => {
        setCurrentImageIndex(index);
    };
    return (
        <div className='w-full h-full mt-8'>
            <div className="relative w-full h-[35rem] md:w-full">
                <img className="absolute inset-0 w-full h-full object-cover rounded-md" src={images[currentImageIndex]} alt={`Slider Image ${currentImageIndex + 1}`} />
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