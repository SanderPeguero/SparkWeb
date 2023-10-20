import { useContext, useState } from "react";
import { collection, addDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import graphics from '../../assets/SparkleMania.png'

import { ContextVariable } from '../../Context';
import Unpaid from './unpaid'






const tickets = [                                                                    
    {'ticketId' : 'BC739', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},                                  
    {'ticketId' : 'F57B1', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},                                  
    {'ticketId' : '2BFD3', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},                                  
    {'ticketId' : 'D430E', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},                                  
    {'ticketId' : '91AEC', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},                                  
    {'ticketId' : '3A9C1', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},
    {'ticketId' : '53B80', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},                                  
    {'ticketId' : '8E74C', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},                                  
    {'ticketId' : 'D71B4', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},                                                                    
    {'ticketId' : 'A5D8F', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},                                  
    {'ticketId' : '0C7A3', 'name': '', 'paid':'false', 'price':400.00, 'discount': null , 'seller': 'Carlos Custodio'},                                  
]

function Activation() {

    const { alert, setalert } = useContext(ContextVariable)

    const [ticketId, setticketId] = useState('')
    const [name, setname] = useState('');
    const [allowActivation, setallowActivation] = useState(false)
    const [paid, setpaid] = useState(null);
    const [price, setprice] = useState(0.0);
    const [discount, setdiscount] = useState(0.0);


    const db = getFirestore()
    const Ticketsdb = collection(db, 'Tickets')

    const get = async () => {

        const command = query(Ticketsdb, where('ticketId', '==', ticketId.toLocaleUpperCase()))
        // console.log(res)

        const querySnapshot = await getDocs(command)

        querySnapshot.forEach((doc) => {
            const ticket = (doc.id, '=', doc.data())
            // console.log(ticket)
            setname(ticket.name)
            setpaid(ticket.paid)
            setprice(ticket.price)
            setdiscount(ticket.discount)
            setallowActivation(true)

        })

        // const docsSnap = await getDocs(ref);

        // docsSnap.forEach(doc => {
        //     const data = doc.data()
        //     var IdValidation = false
        //     var nameValidation = false

        //     data.ticketId == ticketId ? IdValidation = true : null
        //     data.name == name ? nameValidation = true : null

        //     console.log('call to the api')

        //     if (IdValidation && nameValidation) {
        //         console.log({
        //             IdValidation,
        //             nameValidation,
        //             data
        //         })
        //         console.log(data)
        //         setpaid(data.paid)
        //         setprice(data.price)
        //         setdiscount(data.discount)
        //         setallowActivation(true)
        //         return
        //     }
        // })


    }

    // const set = async () => {

    //     tickets.forEach(async (ticket) => {
    //         try {
    //             const docRef = await addDoc(collection(db, "Tickets"), {
    //                 ticketId: ticket.ticketId,
    //                 name: ticket.name,
    //                 paid: ticket.paid,
    //                 price: ticket.price,
    //                 discount: ticket.discount,
    //                 seller: ticket.seller,
    //                 dateOfPurchase: '',
    //                 submitDate: new Date()
    //             });
    //             console.log("Document written with ID: ", docRef.id);
    //             setalert({
    //                 ...alert,
    //                 open: true,
    //                 message: `Las Boletas se guardaron correctamente`,
    //                 severity: 'success'
    //             });
    //         } catch (e) {
    //             setalert({
    //                 ...alert,
    //                 open: true,
    //                 message: `Tu boleta no se ha pudo activar`,
    //                 severity: 'error'
    //             });
    //             console.error("Error adding document: ", e);
    //         }
    //     })
    // }


    const [description, setdescription] = useState('');
    const [email, setemail] = useState('');
    const [number, setnumber] = useState('');

    const set = async () => {

        console.log("validacion Fallida")
        console.log({
            name,
            ticketId,
            description,
            email,
            // time
        })
        if (name !== '' && number !== 0 && ticketId !== '' && email !== '') {
            console.log("validacion exitosa")
            try {
                const docRef = await addDoc(collection(db, "SparkleManiaActivations"), {
                    name: name,
                    ticketId: ticketId,
                    // description: description,
                    price: price,
                    discount: discount,
                    paid: paid,
                    email: email,
                    number: number,
                    activationDate: new Date()
                });
                console.log("Document written with ID: ", docRef.id);
                setalert({
                    ...alert,
                    open: true,
                    message: `Tu boleta se ha activado correctamente`,
                    severity: 'success'
                });
            } catch (e) {
                console.error("Error adding document: ", e);
                setalert({
                    ...alert,
                    open: true,
                    message: `Tu boleta no se ha pudo activar`,
                    severity: 'error'
                });
            }
        }

    }

    if (paid == 'false') {
        return (
            <Unpaid name={name} price={price} discount={discount} />
            // <div className="flex items-center justify-center p-12">
            //     <div className="mx-auto w-full max-w-[550px]">
            //         <div className="text-white">Esta boleta no se puede activar porque todavia no ha sido paga</div>
            //         <div className="text-white">Precio RD${price}</div>
            //         <div className="text-white">Comunicate con Sander o con Keyla cuando quieras pagarla</div>
            //     </div>

            // </div>
        )
    }

    if (allowActivation) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <span className="text-white">
                        Para activar tu boleta: <br /><br />
                        1-Ingresa tu nombre con tu primer apellido<br />
                        {/* 2-Crea una cuenta o inicia sesion */}
                        2-Ingresa tu correo <br />
                        3-Ingresa tu numero<br />
                        4-Presiona Activar
                    </span>
                    <form onSubmit={set} className="mt-8">
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
                                        name="Nombre"
                                        value={name}
                                        id="fName"
                                        // placeholder="Nombre Apellido"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className="mb-5">
                            <label
                                htmlFor="guest"
                                className="mb-3 block text-base font-medium text-[#ffffff]"
                            >
                                Crea una cuenta o inicia sesion
                            </label>
                            <input
                                type="text"
                                name="guest"
                                id="guest"
                                placeholder="..."
                                min="0"
                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                onChange={(e) => setdescription(e.target.value)}
                            />
                        </div> */}

                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
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
                                        // placeholder='email@email.com'
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="number"
                                        className="mb-3 block text-base font-medium text-[#ffffff]"
                                    >
                                        Numero de Telefono
                                    </label>
                                    <input
                                        type="tel"
                                        name="number"
                                        id="number"
                                        // placeholder="809-000-0000"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={(e) => setnumber(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <div className="mb-5">
                            <label className="mb-3 block text-base font-medium text-[#ffffff]">
                                Are you coming to the event?
                            </label>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="radio1"
                                        id="radioButton1"
                                        className="h-5 w-5"
                                    />
                                    <label
                                        htmlFor="radioButton1"
                                        className="pl-3 text-base font-medium text-[#ffffff]"
                                    >
                                        Yes
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="radio1"
                                        id="radioButton2"
                                        className="h-5 w-5"
                                    />
                                    <label
                                        htmlFor="radioButton2"
                                        className="pl-3 text-base font-medium text-[#ffffff]"
                                    >
                                        No
                                    </label>
                                </div>
                            </div>
                        </div> */}

                    </form>
                    <div>
                        <button
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                            onClick={set}
                        >
                            Activar
                        </button>
                    </div>
                </div>
            </div>

        )
    }


    return (
        <>
            <div className="px-4 mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
                <div className="flex flex-col items-center justify-center w-full mb-10 lg:flex-row">
                    <div className="md:mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
                        <div className="max-w-xl mr-8">
                            <h2 className="font-sans text-3xl sm:mt-0 mt-6 font-medium tracking-tight text-white sm:text-4xl sm:leading-none max-w-lg mb-3">
                                Activación de Boletas <span className="text-[#ff35bf]">{name}</span>
                            </h2>
                            <div className="text-white mt-10">
                                Para empezar: <br /><br />
                                1  Ingresa el ID de tu boleta <br />
                                2  Presiona el botón
                            </div>
                            <form onSubmit={get} className='mt-8'>
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="">
                                            <label
                                                htmlFor="fName"
                                                className="mb-3 block text-base font-medium text-[#ffffff]"
                                            >
                                                ID
                                            </label>
                                            <input
                                                type="text"
                                                onChange={(e) => setticketId(e.target.value)}
                                                placeholder='A000D'
                                                className="w-[200px] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='space-x-4'>
                            <button onClick={get} className='bg-gradient-to-r from-[#9340FF] to-[#FF3C5F] text-white rounded-[4rem] text-[1rem] my-6 mx-auto px-6 py-3'>Verificar</button>
                        </div>
                    </div>
                    <img alt="logo" width="520" height="120" src={graphics} />
                </div>
            </div>

        </>
    )
}

export default Activation