import { useState } from 'react'
// import Analytics from '../Analytics';
// import Cards from '../Cards';
import Hero from '../../components/Hero/Hero';
// import Hero2 from '../../components/Hero/Hero2'
import Newsletter from '../../components/Newsletter'
import Features from '../../components/Features/Features';
// import MapComponent from '../Maps/MapComponent';
// import Footer from '../Footer';

// import LandingPage from '../../assets/Bg.png'
import Hero1 from '../../components/Hero/Hero1';

function home(){

    const [nicol, setinput] = useState('');
    const [state, setstate] = useState('');

    const handle = (e) => {
       setstate(e.target.value) 
    }

    return(
        <>
            <Hero1 />
            <Hero />
            {/* <Hero2 /> */}
            {/* <Contacto /> */}
            {/* <Analytics /> */}
            {/* <Newsletter />  */}
            <Features/>
            {/* <Cards /> */}
            {/* <MapComponent /> */}
            {/* <Footer />  */}
        </>
    )
}

export default home