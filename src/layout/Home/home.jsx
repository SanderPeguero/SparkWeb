import { useState, useEffect, useContext, useRef } from 'react'
import Slider from '../../components/Slider/Slider.jsx';
import Features from '../../components/Features/Features';
import AllImagesLayout from '../../components/AllImagesLayout/AllImagesLayout';
import ContainerCard from '../../components/ContainerCard/ContainerCard.jsx';
import Dropdown from '../../components/Dropdown/Dropdown';
import styles from "./home.module.css"
import Hero1 from '../../components/Hero/Hero1';
import { ContextVariable } from '../../Context.js';
import { obtenerCategorias, obtenerTodasLasImgAll } from '../../Scripts/UploadAllImg.js';
import EditAllImg from '../../components/AllImagesLayout/EditAllImg/EditAllImg.jsx';

function home() {
    const { GalleryVisible, setGalleryVisible, user, categories, setCategories, setalert, alert } = useContext(ContextVariable)

    const galleryRef = useRef(null);

    useEffect(() => {
        if (GalleryVisible && galleryRef.current) {
            galleryRef.current.scrollIntoView({ behavior: 'smooth' });
            setGalleryVisible(false)
        }
    }, [GalleryVisible]);

    const [categoryImage, setCategoryImage] = useState([])
    const [originalImages, setOriginalImages] = useState([]);

    useEffect(() => {
        obtenerTodasLasImgAll(setCategoryImage)
        obtenerCategorias(setCategories)
       
    }, [])

    useEffect(() => {
        obtenerTodasLasImgAll(setOriginalImages)
    }, [categoryImage])
    
    const takeDdTitle = (ddTitle) => {
        if (ddTitle === "Todas las imágenes") {
            obtenerTodasLasImgAll(setCategoryImage)
        } else {

            const filteredData = originalImages.filter(item => item.Categories === ddTitle)
            if (filteredData.length === 0) {
                setalert({
                    ...alert,
                    open: true,
                    message: `No se encontraron imágenes en ${ddTitle}.`,
                    severity: 'warning'
                })

            } else {
                return setCategoryImage(filteredData);
            }
        }
    }

    const [isOpenEditImg, setIsOpenEditImg] = useState(false)

    return (
        <>
            <EditAllImg
                isOpenEditImg={isOpenEditImg}
                setisOpenEditImg={setIsOpenEditImg}
                listImg={categoryImage}
                setListImg={setCategoryImage}
            />
            <Hero1 />

            <Slider />
            <div ref={galleryRef} className="flex justify-content-center" style={{ marginTop: "50px", padding: '50px' }}>
                <ContainerCard>
                    <div className={`${styles["gallery-setting"]} flex justify-content-between align-items-center`}>
                        <h1 className=''>Todas las imagenes</h1>
                        <Dropdown title="Todas las imágenes"  liftingDdTextUp={takeDdTitle} />
                        {/* <Dropdown title="All Images" items={ddItems} liftingDdTextUp={takeDdTitle} /> */}
                    </div>
                    <AllImagesLayout images={categoryImage} setCategoryImage={setCategoryImage} />
                </ContainerCard>
            </div>
            <Features />
        </>
    )
}

export default home