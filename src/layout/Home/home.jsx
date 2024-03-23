import { useState, useEffect } from 'react'
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

    const [nicol, setinput] = useState('');
    const [state, setstate] = useState('');

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
            <div className="flex justify-content-center" style={{ marginTop: "50px", padding: '50px' }}>
                <ContainerCard>
                    <div className={`${styles["gallery-setting"]} flex justify-content-between align-items-center`}>
                        <h1>All images</h1>
                        <Dropdown title="All Images" items={ddItems} liftingDdTextUp={takeDdTitle} />
                    </div>
                    <AllImagesLayout images={categoryImage} setCategoryImage={setCategoryImage}/>
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