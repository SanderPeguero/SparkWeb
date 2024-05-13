import React, { useState, useEffect } from 'react';

const EditLongTextModal = ({ isOpen, onClose, initialValue, what, id }) => {

    const [textValue, setTextValue] = useState('');
    useEffect(() => {
        setTextValue(initialValue);
    }, [initialValue])

    const handleInputChange = (event) => {
        setTextValue(event.target.value);
    };

    const handleSubmit = () => {
        onClose(textValue, what);
    };

    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'
                }`}
        >
            <div className="flex items-center justify-center min-h-screen p-4 text-center">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                ></span>

                <div
                    className="inline-block align-bottom bg-[#0b023f] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className='flex flex-col w-full'>
                        <div className='m-4'>
                            <div className='mb-4 font-semibold text-white'>
                                {what === "Editar Imagen" ? "Editar Imagen en svg" : `Edit long text ${what}`}
                            </div>
                            <div>
                                <textarea
                                    value={textValue}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className=" w-full "
                                />
                            </div>
                            <div className=''>
                                {what === "Editar Imagen" &&
                                    <div className='border-2 border-gray-200 px-4 py-6 rounded-lg w-24 h-24'>
                                        <div
                                            className={`w-12 h-12 mb-3 inline-block ${id === 1 ? 'text-[#d5612c]' : id === 2 ? 'text-[#d5612c]' : id === 3 ? 'text-[#2ebae5] ' : 'text-[#1c901c] '}`}
                                            dangerouslySetInnerHTML={{ __html: textValue }} />
                                    </div>

                                }
                            </div>
                        </div>

                        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                onClick={handleSubmit}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Save
                            </button>
                            <button
                                onClick={onClose}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditLongTextModal;
