import { useState, useEffect, useContext, useRef } from 'react'
// import Analytics from '../Analytics';
// import Cards from '../Cards';
import Slider from '../../components/Slider/Slider.jsx';
// import Hero2 from '../../components/Hero/Hero2'
import Newsletter from '../../components/Newsletter'
import Features from '../../components/Features/Features';
import AllImagesLayout from '../../components/AllImagesLayout/AllImagesLayout';
import ContainerCard from '../../components/ContainerCard/ContainerCard.jsx';
import Dropdown from '../../components/Dropdown/Dropdown';
import styles from "./home.module.css"
// import MapComponent from '../Maps/MapComponent';
// import Footer from '../Footer';

// import LandingPage from '../../assets/Bg.png'
import Hero1 from '../../components/Hero/Hero1';
import { ContextVariable } from '../../Context.js';

import allimg from './data.js'
import images from '../../Jsons/Images.json'


const ddItems = [
    {
        id: 1,
        title: "All Images",
        active: true
    },
    {
        id: 2,
        title: "Topic Images",
        active: false
    },
    {
        id: 3,
        title: "Nature Images",
        active: false
    },
    {
        id: 4,
        title: "NFT Images",
        active: false
    },
    {
        id: 5,
        title: "Space Images",
        active: false
    }
]

function home() {
    const { GalleryVisible, setGalleryVisible } = useContext(ContextVariable)
    const [nicol, setinput] = useState('');
    const [state, setstate] = useState('');
    const galleryRef = useRef(null);

    useEffect(() => {
        if (GalleryVisible && galleryRef.current) {
            galleryRef.current.scrollIntoView({ behavior: 'smooth' });
            setGalleryVisible(false)
        }
    }, [GalleryVisible]);

    const handle = (e) => {
        setstate(e.target.value)
    }
    const [categoryImage, setCategoryImage] = useState([])

    useEffect(() => {
        setCategoryImage(images.categories.all)
    }, [])


    const takeDdTitle = (ddTitle) => {
        setCategoryImage(() => {
            let categoryChoose = Object.keys(images.categories).filter(item => {
                const titleSplited = ddTitle.toLowerCase().split(" ")[0]
                return item.toLowerCase().includes(titleSplited)
            })
            return [...images.categories[categoryChoose]]
        })
    }
    //   const [categoryImage, setCategoryImage] = useState(allimg)
    //     const takeDdTitle = (ddTitle) => {
    //         setCategoryImage(() => {
    //             let categoryChoose = allimg.filter(item => {
    //                 const titleSplited = ddTitle.toLowerCase().split(" ")[0]
    //                 return item.toLowerCase().includes(titleSplited)
    //             })
    //             return [...allimg[categoryChoose]]
    //         })
    //     }



    return (
        <>
            <Hero1 />
            <Features />
            <Slider />
            
            {/* CTA */}

            <div class="container my-1 mx-auto md:px-6">

                <section >
                {/* bg-[url('https://drive.google.com/file/d/1ipnaKoOlzuFmwW6_A9yl0j8LBNWarCEm/view?usp=sharing')] 
                para color  bg-gradient-to-r from-[#9340FF] to-[#ba36ba]
                */}
                    <div
                        class="relative overflow-hidden bg-cover bg-no-repeat bg-[60%] bg-[url('https://i.postimg.cc/25dKbcys/2.jpg')] h-[500px]">
                        <div
                            class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
                            <div class="flex h-full items-center justify-center">
                                <div class="px-6 text-center text-white md:px-12">
                                    <h2 class="mb-5 text-4xl font-bold leading-tight tracking-tight">
                                        ¡Sé parte de la vibrante experiencia " <span class="text-purple-800">Away and Spark</span><span>"!<br />Consigue tus boletas hoy.</span>
                                    </h2>
                                    <button onClick={(e) => reserveTicket(true)} className="group relative h-12 w-48 overflow-hidden rounded-xl bg-gradient-to-r from-[#9340FF] to-[#ba36ba] text-lg font-bold text-white my-4">
                                        Compra ya!
                                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* end CTA */}

            <div ref={galleryRef} className="flex justify-content-center" style={{ marginTop: "50px", padding: '50px' }}>
                <ContainerCard>
                    <div className={`${styles["gallery-setting"]} flex justify-content-between align-items-center`}>
                        <h1>All images</h1>
                        <Dropdown title="All Images" items={ddItems} liftingDdTextUp={takeDdTitle} />
                    </div>
                    <AllImagesLayout images={categoryImage} setCategoryImage={setCategoryImage} />
                </ContainerCard>
            </div>

            {/* <AllImagesLayout/> */}
            {/* <Hero2 /> */}
            {/* <Contacto /> */}
            {/* <Analytics /> */}
            {/* <Newsletter />  */}

            {/* <Cards /> */}
            {/* <MapComponent /> */}
            {/* <Footer />  */}
        </>
    )
}

export default home