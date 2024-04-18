import { useState, useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
// import { ref, onValue } from 'firebase/database'
// import { db } from '../../firebase/firebase'
import { getFirestore } from 'firebase/firestore';

import { ContextVariable } from '../../Context';


function ReserveTicket({ event, purchase }) {

    const { alert, setalert, user, setlocattion } = useContext(ContextVariable)
    const Location = useLocation()
    const navigate = useNavigate()
    const [name, setname] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [how, sethow] = useState('')
    const [guest, setguest] = useState(false)
    const [address, setaddress] = useState('')
    const [number, setnumber] = useState('')

    useEffect(() => {
        if (user) {
          setemail(user?.email)
          setnumber(user?.phone)
        }
      }, [user])

    const db = getFirestore()
    const ref = collection(db, 'Sparklers')

    const upload = async () => {

        if (name != '' && lastName != '' && lastName != '' && address != '' && email != '' && how != '' && number != "") {
            // console.log("validacion exitosa")
            try {
                const docRef = await addDoc(collection(db, "TicketReservations"), {
                    name: name,
                    lastName: lastName,
                    email: email,
                    address: address,
                    number: number,
                    how: how,
                    guest: guest,
                    event: event,
                    submitDate: new Date()
                });
                console.log("Document written with ID: ", docRef.id)
                setalert({
                    ...alert,
                    open: true,
                    message: `Tu reserva se ha hecho correctamente`,
                    severity: 'success'
                });
            } catch (e) {
                setalert({
                    ...alert,
                    open: true,
                    message: `Tu reserva no se ha podido hacer en este momento`,
                    severity: 'error'
                });
                console.error("Error adding document: ", e)
            }
        }

    }

    const BackRoute = () => {
        setlocattion(`${user.role === 'admin' ? '/admin/boletas' : '/boletas'}`)
        navigate(`${user.role === 'admin' ? '/admin/boletas' : '/boletas'}`)
      }
    


    return (
        <>
              <div onClick={() => BackRoute()} className='ml-8 text-white flex flex-row'><div className='hover:underline cursor-pointer'>Boletas</div>{Location.pathname}</div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <form>
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

                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="time"
                                        className="mb-3 block text-base font-medium text-[#ffffff]"
                                    >
                                        Número de Teléfono
                                    </label>
                                    <input
                                        type="text"
                                        name="number"
                                        id="number"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={(e) => setnumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="time"
                                        className="mb-3 w-full block text-base font-medium text-[#ffffff]"
                                    >
                                        Cantidad de invitado
                                    </label>
                                    <input
                                        type="number"
                                        name="how"
                                        id="how"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={(e) => sethow(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* <div className="w-full px-3 sm:w-1/2">
                                <div className="md:mt-4 mb-5">
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
                            </div> */}
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

export default ReserveTicket