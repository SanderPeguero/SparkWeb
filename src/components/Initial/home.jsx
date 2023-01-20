import { useState } from 'react'
import Analytics from '../Analytics';
import Cards from '../Cards';
import Hero from '../Hero/Hero2';
import Newsletter from '../Newsletter'
import MapComponent from '../Maps/MapComponent';
import Footer from '../Footer';

function home(){

    const [nicol, setinput] = useState('');
    const [state, setstate] = useState('');

    const handle = (e) => {
       setstate(e.target.value) 
    }

    return(
        <>
            <Hero />
            {/* <Contacto /> */}
            <Analytics />
            <Newsletter />
            <Cards />
            {/* <MapComponent /> */}
            <Footer /> 
        </>
    )
}

export default home