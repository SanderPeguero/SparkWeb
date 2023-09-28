import { useState, useEffect } from 'react'
import Hero from '../../components/Hero/Hero';
import Newsletter from '../../components/Newsletter'
import Features from '../../components/Features/Features';

// Import the functions you need from the SDKs you need
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { ref, onValue } from 'firebase/database'
// import { db } from '../../firebase/firebase'
import { getFirestore } from 'firebase/firestore';

import ticket from '../../assets/TicketMania.png'
import ticket2 from '../../assets/Ticket2003.png'

function ReserveTicket({ event }) {

    const [name, setname] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [time, settime] = useState('')
    const [guest, setguest] = useState(false)
    const [address, setaddress] = useState('')

    const db = getFirestore()
    const ref = collection(db, 'Sparklers')

    const upload = async () => {

        if (name != '' && lastName != '' && lastName != '' && address != '' && email != '' && time != '') {
            console.log("validacion exitosa")
            try {
                const docRef = await addDoc(collection(db, "TicketReservations"), {
                    name: name,
                    lastName: lastName,
                    email: email,
                    time: time,
                    guest: guest,
                    address: address,
                    event: event,
                    submitDate: new Date()
                });
                console.log("Document written with ID: ", docRef.id)
            } catch (e) {
                console.error("Error adding document: ", e)
            }
        }

    }


    return (
        <>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <form>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="fName"
                                        className="mb-3 block text-base font-medium text-[#ffffff]"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        name="Nomre"
                                        id="fName"
                                        placeholder="Nombre"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="lName"
                                        className="mb-3 block text-base font-medium text-[#ffffff]"
                                    >
                                        Apellidos
                                    </label>
                                    <input
                                        type="text"
                                        name="lName"
                                        id="lName"
                                        placeholder="Apellidos"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={(e) => setlastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="date"
                                className="mb-3 block text-base font-medium text-[#ffffff]"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                name="date"
                                id="date"
                                placeholder='email@email.com'
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="guest"
                                className="mb-3 block text-base font-medium text-[#ffffff]"
                            >
                                Direccion
                            </label>
                            <input
                                type="text"
                                name="guest"
                                id="guest"
                                min="0"
                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                onChange={(e) => setaddress(e.target.value)}
                            />
                        </div>

                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="time"
                                        className="mb-3 block text-base font-medium text-[#ffffff]"
                                    >
                                        A que hora piensas asistir?
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        id="time"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={(e) => settime(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="md:mt-4 mb-5 md:ml-[4rem]">
                                    <label className="mb-3 block text-base font-medium text-[#ffffff]">
                                        Piensas llevar invitados?
                                    </label>
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="radio1"
                                                id="radioButton1"
                                                className="h-5 w-5"
                                                onChange={() => setguest(true)}
                                            />
                                            <label
                                                htmlFor="radioButton1"
                                                className="pl-3 text-base font-medium text-[#ffffff]"
                                            >
                                                Si
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="radio1"
                                                id="radioButton2"
                                                className="h-5 w-5"
                                                onChange={() => setguest(false)}
                                            />
                                            <label
                                                htmlFor="radioButton2"
                                                className="pl-3 text-base font-medium text-[#ffffff]"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </form>
                    <div>
                        {/* <button
                                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                onClick={upload}
                            >
                                Submit
                            </button> */}
                        <button onClick={upload} className="group relative h-12 w-48 overflow-hidden rounded-xl bg-[#3d36ba] text-lg font-bold text-white my-4">
                            Reservar ahora!
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                        </button>
                    </div>
                </div>
            </div>
            {/* <button onClick={upload}>Upload Data</button> */}
        </>
    )
}

function tickets() {

    

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


    if (reserveTicket) {
        return (
            <ReserveTicket event={'Sparkle Mania'}/>
        )
    }

    if(reserveTicket2){
        return(
            <ReserveTicket event={'2003'}/>
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
                            <button onClick={() => setreserveTicket(true)} className="group relative h-12 w-48 overflow-hidden rounded-xl bg-[#3d36ba] text-lg font-bold text-white my-4">
                                Reservar ahora!
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
                            <button onClick={() => setreserveTicket2(true)} className="group relative h-12 w-48 overflow-hidden rounded-xl bg-[#3d36ba] text-lg font-bold text-white my-4">
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