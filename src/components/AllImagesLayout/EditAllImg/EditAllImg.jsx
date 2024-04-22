import React, { useState, useEffect, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { ContextVariable } from '../../../Context';
import { AddCategoriesAllImag, EditImageAll } from '../../../Scripts/UploadAllImg';
const EditAllImage = ({ isOpen, setIsOpen, datos, setCategoryImage }) => {
  const { categories, alert, setalert } = useContext(ContextVariable)
  const [image, setimage] = useState(null)
  const [setselectcategories, setSetselectcategories] = useState('')
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    setimage(datos?.Url)
  }, [datos])

  const handleEditImg = (e, id) => {
    const selectedImage = e.target.files[0]
    if (selectedImage) {
      var r = window.confirm('¿Estás seguro de editar esta imagen?');
      if (r === true) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageURL = reader.result;
          EditImageAll(selectedImage, id, setCategoryImage);
          setimage(imageURL)
        }
        reader.readAsDataURL(selectedImage)
      }
    }
  }

  const handleSave = () => {
    if (setselectcategories === '') {
      alert('Seleccione una categoria')
    } else {
      AddCategoriesAllImag(setselectcategories, datos?.Id)
      setalert({
        ...alert,
        open: true,
        message: `Se ha actualizado con exito, Categories`,
        severity: 'success'
      });
      setSetselectcategories('')
    }
  }


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
                Editar Imagen

              </div>
              <div className='flex flex-row  justify-between'>

                <div className='w-[12rem] flex flex-col items-center'>
                  <label className='text-white text-2xl'>Categories</label>
                  <div className="max-w-2xl mx-auto">
                    <label htmlFor="setselectcategories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                    <select id="setselectcategories" onChange={(e) => setSetselectcategories(e.target.value)} defaultValue="default" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="default" disabled>Choose a event</option>
                      {categories.map((item, index) => (
                        <option key={index} value={item.Name}>{item.Name}</option>
                      ))}

                    </select>
                  </div>
                  <button
                    onClick={() => handleSave()}
                    className="mt-3  w-full inline-flex  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>

                </div>
                <div className='ml-8 flex flex-col items-end justify-end'>

                  <img
                    src={image}
                    className='w-[20rem] h-[20rem]'

                  />
                  <label htmlFor={`file-upload-${datos?.Id}`} className="px-3 py-2 text-start  text-xs leading-4">
                    <div className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                      <input id={`file-upload-${datos?.Id}`} onChange={(e) => handleEditImg(e, datos?.Id)} type="file" className="hidden" />
                      <FaEdit size={14} className="text-yellow-400" />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

              <button
                onClick={() => setIsOpen(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAllImage;
