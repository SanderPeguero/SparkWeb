import { useState } from "react";
import bg from '../../assets/Bg.png'
import Lamentably from '../../assets/Lamentably.png'
import Logo from '../../assets/Flyers.png'



const Hero = () => {

    const [slider, setslider] = useState(0);

    const slidePage0 = {
        image: bg,
        title: 'Sparkle Mania',
        titleColor: 'text-[#ef2899]',
        description: 'Sparkle Mania sera una celebración deslumbrante que iluminara la noche con su encanto y diversión desenfrenada. Los disfraces son la esencia de Sparklemania, donde la imaginación se convertira en realidad. Así que, vístete con tus atuendos más brillantes y únetenos, La diversión, la música y la amistad te esperan.',
    }

    const slidePage1 = {
        image: Lamentably,
        title: 'Lamentably',
        titleColor: 'text-[#1e912a]',
        description: 'Lamentably sera una celebración deslumbrante que iluminara la noche con su encanto y diversión desenfrenada. Los disfraces son la esencia de Sparklemania, donde la imaginación se convertira en realidad. Así que, vístete con tus atuendos más brillantes y únetenos, La diversión, la música y la amistad te esperan.',
    }

    const slidePage2 = {
        image: Logo,
        title: 'Proximamente',
        titleColor: '',
        description: '23/12/23',
    }

    const slidePage3 = {
        image: Logo,
        title: 'Proximamente',
        titleColor: '',
        description: '2024',
    }

    const images = [
        slidePage0,
        slidePage1,
        slidePage2,
        slidePage3
    ]

    return (
        <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">
            <div className="flex flex-col items-center w-full md:flex-row md:w-1/2">
                <div className="flex justify-center order-2 mt-6 md:mt-0 md:space-y-3 md:flex-col">
                    <button className={`w-3 h-3 mx-2 ${slider == 0 ? "bg-blue-500" : "bg-gray-300"} rounded-full md:mx-0 focus:outline-none`} onClick={ ()=> setslider(0)}></button>
                    <button className={`w-3 h-3 mx-2 ${slider == 1 ? "bg-blue-500" : "bg-gray-300"} rounded-full md:mx-0 focus:outline-none`} onClick={ ()=> setslider(1)}></button>
                    <button className={`w-3 h-3 mx-2 ${slider == 2 ? "bg-blue-500" : "bg-gray-300"} rounded-full md:mx-0 focus:outline-none`} onClick={ ()=> setslider(2)}></button>
                    <button className={`w-3 h-3 mx-2 ${slider == 3 ? "bg-blue-500" : "bg-gray-300"} rounded-full md:mx-0 focus:outline-none`} onClick={ ()=> setslider(3)}></button>
                </div>

                <div className="max-w-lg md:mx-12 md:order-2">
                    <h1 className={`text-3xl font-extrabold font-[Helvetica Neue] tracking-wide ${images[slider].titleColor}  dark:text-white md:text-4xl`}>{images[slider].title}</h1>
                    <div className="mt-6">
                        <span className="text-[17px] text-[#ffffff]">
                            {images[slider].description}
                        </span>
                    </div>
                    <div className="mt-6">
                        <span>2023</span>
                    </div>
                    {/* <div className="mt-6">
                        <a href="/" className="block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md md:inline hover:bg-blue-400">Mas Informacion</a>
                    </div> */}
                </div>
            </div>

            <div className="flex items-center justify-center w-full h-96 md:w-1/2">
                <img className="object-cover w-full h-full max-w-2xl rounded-md" src={images[slider].image} alt="Banner"></img>
            </div>
        </div>

    );
};

export default Hero;
