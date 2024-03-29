import { useContext, useEffect, useState } from 'react'

import ticket from '../../assets/TicketMania.png'
import ticket2 from '../../assets/Ticket2003.png'


import ReserveTicket from './reserveTicket';
import Purchase from './purchase';



function tickets() {

    const FirebaseAuth = getAuth;

    // utilizar la variable auth y pasar la variable para abrir la reservar a traves del contexto y
    //  importar el useContext y el ContextVariable
    // Puede guiarte del ejemplo en el Login


    // const get = async () => {
    //     const docsSnap = await getDocs(ref);

    //     docsSnap.forEach(doc => {
    //         console.log(doc.data());
    //     })
    // }

    // useEffect(() => {
    //     get()
    // }, []);

    const [reserveTicket, setreserveTicket] = useState(false)
    const [reserveTicket2, setreserveTicket2] = useState(false)
    const [OpenPurchase, setOpenPurchase] = useState(false)

    const purchase = true

    if (reserveTicket) {
        return (
            <ReserveTicket event={'Sparkle Mania'} />
        )
    }


    if (OpenPurchase) {
        return (
            <Purchase event={'Sparkle Mania'}/>
        )
    }


    return (
        <>
            {/* <!-- post card --> */}


            <div className="flex bg-[#3d36ba0a] shadow-lg rounded-lg mx-4 md:mx-auto mb-[8rem]">
                {/* <!--horizantil margin is just for display--> */}
                <div className="flex flex-col items-start px-4 py-6">
                    <div className="md:ml-[9rem] mb-4 flex-col">
                        <div className='my-4'>
                            <h1 className="text-2xl md:text-4xl text-white font-semibold">Sparkle Mania</h1>
                            <div className="text-white mt-2">21/10/23</div>
                        </div>
                        <img src={ticket} className='w-full md:w-[85%]' />
                        <div>



                            <button onClick={() => setOpenPurchase(true)} className="ml-3 group relative h-12 w-48 overflow-hidden rounded-xl bg-[#ba36ba] text-lg font-bold text-white my-4 bg-gradient-to-r from-[#9340FF] to-[#FF3C5F w-[200px]">
                                Compra ya!
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </button>



                        </div>
                    </div>
                    <div className="md:ml-[9rem] mb-4 flex-col">
                        <div className='my-4'>
                            <h1 className="text-2xl md:text-4xl text-white font-semibold">2003</h1>
                            <div className="text-white mt-2">23/12/23</div>
                        </div>
                        <img src={ticket2} className='w-full md:w-[85%]' />
                        <div>

                            <button onClick={() => setreserveTicket(true)} className="group relative h-12 w-48 overflow-hidden rounded-xl bg-[#3d36ba] text-lg font-bold text-white my-4">

                                Reservar ahora!
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}


export default tickets