import React, { useState, useEffect, useContext } from "react"
// import styles of this component
import styles from "./HeaderBoxes.module.css"

// import other components
import HeaderBox from "../HeaderBox/HeaderBox"

// import react package
import PropTypes from 'prop-types'

import { ContextVariable } from "../../../Context"

//Icon
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// HeaderBoxes component
const HeaderBoxes = ({ titles_numbers }) => {
    const { user } = useContext(ContextVariable)
    const [texts, setTexts] = useState(titles_numbers);

    const handleEditNumber = (index) => {
        const newNumberString = prompt('Edit number:', String(texts[index].number));
        if (newNumberString !== null) {
            const newNumber = Number(newNumberString);
            setTexts(prevTexts => {
                const updatedTexts = [...prevTexts];
                updatedTexts[index] = { ...updatedTexts[index], number: newNumber };
                return updatedTexts;
            });
        }
    };

    const handleEditTitle = (index) => {
        if (texts && texts[index]) {
            const newTitle = prompt('Edit title:', texts[index].title);
            if (newTitle !== null) {
                setTexts(prevTexts => {
                    const updatedTexts = [...prevTexts];
                    updatedTexts[index] = { ...updatedTexts[index], title: newTitle };
                    return updatedTexts;
                });
            }
        }
    };


    return (
        <div className={`${styles["header-wrap-boxes"]} flex`}>

            {texts && (
                texts.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        {user && user.role === 'admin' && (
                            <div className="px-3 py-2 text-right text-xs leading-4">
                                <button onClick={() => handleEditNumber(index)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                    <FaEdit size={14} className="text-yellow-400" />
                                </button>
                            </div>
                        )}

                        <HeaderBox
                            key={item.id}
                            title={item.title}
                            number={item.number}
                            border_right={index === item.length - 1 ? false : true}
                        />
                        {user && user.role === 'admin' && (
                            <div className="px-3 py-2 text-right  text-xs leading-4">
                                <button onClick={() => handleEditTitle(index)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                    <FaEdit size={14} className="text-yellow-400" />
                                </button>
                            </div>
                        )}

                    </div>
                ))
            )}


        </div>
    )
}

HeaderBoxes.propTypes = {
    titles_numbers: PropTypes.array.isRequired
}

export default HeaderBoxes

// {/* {texts.map((text, idx) => (
//                 <div key={idx} className="flex flex-col items-center">
//                     <div className="px-3 py-2 text-right  text-xs leading-4">
//                         <button onClick={() => handleEditText(idx)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
//                             <FaEdit size={14} className="text-yellow-400" />
//                         </button>
//                     </div>
//                     <HeaderBox
//                         key={idx}
//                         title={text}
//                         number={titles_numbers[idx].number}
//                         border_right={idx === texts.length - 1 ? false : true}
//                     />
//                     <div className="px-3 py-2 text-right  text-xs leading-4">
//                         <button onClick={handleEditTextHero} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
//                             <FaEdit size={14} className="text-yellow-400" />
//                         </button>
//                     </div>
//                 </div>

//             ))} */}