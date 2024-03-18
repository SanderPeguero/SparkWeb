import React, { useState } from 'react';
import { CgUnavailable } from "react-icons/cg";
const featuredata = [
    {
        id: 1,
        icon: (

            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-[#d5612c] w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M8 17l4 4 4-4m-4-5v9"></path>
                <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
            </svg>

        ),
        title: "DJ's",
        quantity: "9",
    },

    {
        id: 2,
        icon: (

            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-[#1c901c] w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
            >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
            </svg>

        ),
        title: "Sparklers",
        quantity: "1.3K",
    },

    {
        id: 3,
        icon: (

            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-[#e52eb4] w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
            </svg>

        ),
        title: "Sparklers",
        quantity: "1.3K",
    },

    {
        id: 4,
        icon: (

            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-[#2ebae5] w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>

        ),
        title: "Security",
        quantity: "14",
    },

];

function Features() {

    const [clickedIndex, setClickedIndex] = useState(null)

    const handleClick = (index) => {

        if (clickedIndex === index) {
            setClickedIndex(null)
        } else {
            setClickedIndex(index)
        }
    }



    return (
        <div className="text-gray-600 body-font -mt-8 -mb-8">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4 text-center">
                    {featuredata.map((data, index) => (
                        <button key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full" onClick={() => handleClick(index)}>
                            {clickedIndex === index ? (
                                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg0">
                                    <CgUnavailable className="text-gray-300 w-12 h-12 mb-3 inline-block" />
                                    <h2 className="title-font font-medium text-3xl text-[#ffffff]">-</h2>
                                    <p className="leading-relaxed">Not Available</p>
                                </div>
                            ) : (
                                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                    {data.icon}
                                    <h2 className="title-font font-medium text-3xl text-[#ffffff]" > {data.quantity}</h2 >
                                    <p className="leading-relaxed">{data.title}</p>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features;


const ButtonFeature = ({ title, icon, quantity }) => {

    return (
        <>
            {icon}
            <h2 className="title-font font-medium text-3xl text-[#ffffff]" > {quantity}</h2 >
            <p className="leading-relaxed">{title}</p>
        </>
    )
}
