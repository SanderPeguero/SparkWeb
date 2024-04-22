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
import { RiImageEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { UploadFileAllImg, EditImageAll, DeleteImgAll } from "../../Scripts/UploadAllImg"
import EditAllImage from "./EditAllImg/EditAllImg"

const AllImagesLayout = ({ images, setCategoryImage }) => {
  const { user } = useContext(ContextVariable)
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  const [isOpenEditImage, setIsOpenEditImage] = useState(false)
  const [datosImg, setDatosImg] = useState(null)

  const handleEditImg = (datos) => {
    if (datos) {
      setDatosImg(datos)
      setIsOpenEditImage(true)
    }
  }

  const handleDeleteImg = (index) => {
    var r = window.confirm('Are you sure to delete this Image?');
    if (r == true) {
      DeleteImgAll(index, setCategoryImage)
    }
  }

  const handleSaveImg = async (e, id) => {
    console.log("Id : " + id)
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      UploadFileAllImg(selectedImage, id);
    }
  }


  return (
    <>
      <EditAllImage isOpen={isOpenEditImage} setIsOpen={setIsOpenEditImage} datos={datosImg} setCategoryImage={setCategoryImage}/>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={`my-masonry-grid`}
        columnClassName={'my-masonry-grid_column'}
      >
        {images.map((item, index) => (
          <div key={item.Id} >
            {user && user.role === 'admin' && (
              <div className='flex flex-row items-center'>
               
                <div className="px-3 py-2 text-start text-xs leading-4">
                  <button onClick={() => handleEditImg(item)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none">
                    <RiImageEditFill size={14} className="text-yellow-400" />
                  </button>
                </div>
                <div className="px-3 py-2 text-start text-xs leading-4">
                  <button onClick={() => handleDeleteImg(index + 1)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none">
                    <MdDelete size={14} color='red' />
                  </button>
                </div>
              </div>
            )}
            <AllimgBox
              key={item.Id}
              wallSrc={item.Url}
            />
          </div>

        ))}
      </Masonry>
    </>
  )
}

export default AllImagesLayout


