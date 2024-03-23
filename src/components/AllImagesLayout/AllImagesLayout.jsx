// import styles of this component
import styles from "./AllImagesLayout.css"
import './AllImagesLayout.css'

// import other react pkg to use
import Masonry from "react-masonry-css"

// import other component to use
import AllimgBox from './AllimgBox/AllimgBox'
import { useState, useEffect, useContext } from "react"
import { ContextVariable } from "../../Context"
//Icon
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// MasonryLayout Component
const AllImagesLayout = ({ images, setCategoryImage }) => {
  const { user } = useContext(ContextVariable)
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const handleEditImg = (e, index) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      const confir = window.confirm("Are you sure want to edit the image?")
      if (confir) {
        reader.onload = () => {
          const newListImg = [...images];
          newListImg[index] = { ...images[index], src: reader.result };
          setCategoryImage(newListImg);
        };
        reader.readAsDataURL(selectedImage);
      }

    }
  }

  const handleDeleteImg = (index) => {
    const newListImg = [...images];
    const confir = window.confirm("Are you sure want to delete the image?")
    if (confir) {
      newListImg.splice(index, 1);
      setCategoryImage(newListImg);
    }

  }


  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={`my-masonry-grid`}
      columnClassName={'my-masonry-grid_column'}
    >
      {images.map((item, index) => (
        <div key={item.id} >
          {user && user.role === 'admin' && (
            <div className='flex flex-row items-center'>
              <label htmlFor={`file-upload-${index}`} className="px-3 py-2 text-right  text-xs leading-4">
                <div className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                  <input id={`file-upload-${index}`} type="file" onChange={(e) => handleEditImg(e, index)} className="hidden" />
                  <FaEdit size={14} className="text-yellow-400" />
                </div>
              </label>
              <div className="px-3 py-2 text-start text-xs leading-4">
                <button onClick={() => handleDeleteImg(index)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none">
                  <MdDelete size={14} color='red' />
                </button>
              </div>
            </div>
          )}
          <AllimgBox
            key={item.id}
            wallSrc={item.src}
            userProf={item.user.src}
            userName={item.user.name}
            userJob={item.user.job}
          />
        </div>

      ))}
    </Masonry>
  )
}

export default AllImagesLayout


