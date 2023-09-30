import { useContext, useState } from "react";
import { collection, addDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import graphics from '../../assets/SparkleMania.png'

import { ContextVariable } from '../../Context';
import Unpaid from './unpaid'

// const tickets = [
//     {'ticketId' : '3B0F', 'name': 'Henlihanny Altagracia',  'paid':'false', 'price':400.00, 'discount': 100.00},                                  
//     {'ticketId' : '37R0', 'name': 'David Chavez ',          'paid':'false', 'price':400.00, 'discount': 100.00},                          
//     {'ticketId' : '5J95', 'name': 'Arianny del carmen',     'paid':'false', 'price':400.00, 'discount': 100.00},                               
//     {'ticketId' : 'E7F8', 'name': 'Rosannyi Brito',         'paid':'false', 'price':400.00, 'discount': 100.00},                           
//     {'ticketId' : '7B9E', 'name': 'Biannelis Lopez',        'paid':'false', 'price':400.00, 'discount': 100.00},                            
//     {'ticketId' : 'B689', 'name': 'Joey Valenzuela',        'paid':'false', 'price':400.00, 'discount': 100.00},                            
//     {'ticketId' : '92A1', 'name': 'Enmanuel Breton',        'paid':'false', 'price':400.00, 'discount': 100.00},                            
//     {'ticketId' : '0A4F', 'name': 'Eury Cortorreal',        'paid':'false', 'price':400.00, 'discount': 100.00},                            
//     {'ticketId' : '62G1', 'name': 'Hermaione Bello',         'paid':'false', 'price':400.00, 'discount': 100.00},                           
//     {'ticketId' : '3A54', 'name': 'Genesis Ramirez',        'paid':'false', 'price':400.00, 'discount': 100.00},                            
//     {'ticketId' : 'F43B', 'name': 'Eunysol Payano',         'paid':'false', 'price':400.00, 'discount': 100.00},                           
//     {'ticketId' : 'FBE3', 'name': 'Abimael de Leon',        'paid':'false', 'price':400.00, 'discount': 100.00},                            
//     {'ticketId' : 'D3FA', 'name': 'Anabel Aquino',          'paid':'false', 'price':400.00, 'discount': 100.00},                          
//     {'ticketId' : '6S48', 'name': 'Eliana M. Garcia',       'paid':'false', 'price':400.00, 'discount': 100.00},                             
//     {'ticketId' : '173D', 'name': 'Irvin Burgos',           'paid':'false', 'price':400.00, 'discount': 100.00},                         
//     {'ticketId' : '7CEC', 'name': 'Juandy Ortega',          'paid':'false', 'price':400.00, 'discount': 100.00},                          
//     {'ticketId' : 'A942', 'name': 'Joseph Noe',             'paid':'false', 'price':400.00, 'discount': 100.00},                       
//     {'ticketId' : 'C6C4', 'name': 'Carlos Enrique Yanguela','paid':'false', 'price':400.00, 'discount': 100.00},                                    
//     {'ticketId' : '784V', 'name': 'Elizabeth Espinal',      'paid':'false', 'price':400.00, 'discount': 100.00},                              
//     {'ticketId' : '17K6', 'name': 'Fradiel nuñez ',         'paid':'false', 'price':400.00, 'discount': 100.00},                           
//     {'ticketId' : 'C3F8', 'name': 'Danny Holguin',          'paid':'false', 'price':400.00, 'discount': 100.00},                          
//     {'ticketId' : 'ACC4', 'name': 'Erickson colon',         'paid':'false', 'price':400.00, 'discount': 100.00},                           
//     {'ticketId' : 'C72E', 'name': 'Luis',                   'paid':'false', 'price':400.00, 'discount': 100.00},                 
//     {'ticketId' : '607R', 'name': 'Elizabeth Diaz',         'paid':'false', 'price':400.00, 'discount': 100.00},                           
//     {'ticketId' : '4T41', 'name': 'Lori Diaz',              'paid':'false', 'price':400.00, 'discount': 100.00},                      
//     {'ticketId' : '85E3', 'name': 'Jerinson Fernandez',     'paid':'false', 'price':400.00, 'discount': 100.00},                               
//     {'ticketId' : 'EC2C', 'name': 'Carlos Inoa',            'paid':'false', 'price':400.00, 'discount': 100.00},                        
//     {'ticketId' : '76Y8', 'name': 'Elvis Vicente',          'paid':'false', 'price':400.00, 'discount': 100.00},                          
//     {'ticketId' : '86C8', 'name': 'Felian Abreu (Rosanyi)', 'paid':'false', 'price':400.00, 'discount': 100.00},                                   
//     {'ticketId' : '4A0A', 'name': 'Angelic Rodriguez',      'paid':'false', 'price':400.00, 'discount': 100.00},                              
//     {'ticketId' : '31E7', 'name': 'Enmanuel Garcia',        'paid':'false', 'price':400.00, 'discount': 100.00},                            
//     {'ticketId' : '676D', 'name': 'Pamela Gonzalez',        'paid':'false', 'price':400.00, 'discount': 100.00},                            
//     {'ticketId' : 'E2A8', 'name': 'Jose Alberto Gonzalez',  'paid':'false', 'price':400.00, 'discount': 100.00},                                  
//     {'ticketId' : '03CB', 'name': 'Anderson Nuñez',         'paid':'false', 'price':400.00, 'discount': 100.00},                           
//     {'ticketId' : 'D732', 'name': 'Irene Consuelo',         'paid':'false', 'price':400.00, 'discount': 100.00},                           
//     {'ticketId' : '8FE1', 'name': 'Yaderlys serra',         'paid':'false', 'price':400.00, 'discount': 100.00},                           
//     {'ticketId' : 'B8DA', 'name': 'Yubelis Lopez',          'paid':'false', 'price':400.00, 'discount': 100.00},                          
//     {'ticketId' : '0C1F', 'name': 'Joel Alejo',             'paid':'false', 'price':400.00, 'discount': 100.00},                       
//     {'ticketId' : 'B8AD', 'name': 'Luis Holguin',           'paid':'false', 'price':400.00, 'discount': 100.00},                         
//     {'ticketId' : 'C421', 'name': '',                       'paid':'false', 'price':400.00, 'discount': 100.00},             
//     {'ticketId' : '1CA3', 'name': 'Joel Omar Ureña',        'paid':'false', 'price':400.00, 'discount': 100.00},                            
//     {'ticketId' : '8F52', 'name': 'Anderson',               'paid':'false', 'price':400.00, 'discount': 100.00},                     
//     {'ticketId' : '3CA9', 'name': 'Renny Rojas',            'paid':'false', 'price':400.00, 'discount': 100.00},                        
//     {'ticketId' : '6FB8', 'name': 'Jesus Santos',           'paid':'false', 'price':400.00, 'discount': 100.00},                         
//     {'ticketId' : 'C85F', 'name': 'Cesar Acosta',           'paid':'false', 'price':400.00, 'discount': 100.00},                         
//     {'ticketId' : '31EF', 'name': '',                       'paid':'false', 'price':400.00, 'discount': 100.00},             
// ]

function Activation() {

    const { alert, setalert } = useContext(ContextVariable)

    const [ticketId, setticketId] = useState('')
    const [name, setname] = useState('');
    const [allowActivation, setallowActivation] = useState(false)
    const [paid, setpaid] = useState(null);
    const [price, setprice] = useState(0.0);
    const [discount, setdiscount] = useState(0.0);


    const db = getFirestore()
    const ref = collection(db, 'Tickets')

    const get = async () => {

        const command = query(ref, where('ticketId', '==', ticketId))
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

    const set = async () => {

        // tickets.forEach(async (ticket) => {
            try {
                const docRef = await addDoc(collection(db, "SparkleManiaActivations"), {
                    ticketId: ticketId,
                    name: name,
                    paid: paid,
                    price: price,
                    discount: discount,
                    dateOfPurchase: '',
                    submitDate: new Date()
                });
                console.log("Document written with ID: ", docRef.id);
                setalert({
                    ...alert,
                    open: true,
                    message: `Tu boleta se ha activado correctamente`,
                    severity: 'success'
                });
            } catch (e) {
                setalert({
                    ...alert,
                    open: true,
                    message: `Tu boleta no se ha pudo activar`,
                    severity: 'error'
                });
                console.error("Error adding document: ", e);
            }
        // })
    }


    const [description, setdescription] = useState('');
    const [email, setemail] = useState('');
    const [time, settime] = useState('');

    // const set = async () => {

    //     console.log("validacion Fallida")
    //     console.log({
    //         name,
    //         ticketId,
    //         description,
    //         email,
    //         time
    //     })
    //     if(name !=='' && setdescription !=='' && ticketId !=='' && email !==''){
    //         console.log("validacion exitosa")
    //         try {
    //             const docRef = await addDoc(collection(db, "Sparklers"), {
    //                 name: name,
    //                 ticketId: ticketId,
    //                 description: description,
    //                 email: email,
    //                 time: time,
    //                 activationDate: new Date()
    //             });
    //             console.log("Document written with ID: ", docRef.id);
    //         } catch (e) {
    //             console.error("Error adding document: ", e);
    //         }
    //     }

    // }

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
                        2-Describe tus espectativas del evento<br />
                        3-Ingresa tu correo <br />
                        4-Selecciona la hora a la que asistiras<br />
                        5-Presiona Activar
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
                                        placeholder="Nombre Apellido"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="guest"
                                className="mb-3 block text-base font-medium text-[#ffffff]"
                            >
                                Que esperas de {'Sparkle Mania ?'}
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
                        </div>

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
                                        placeholder='email@email.com'
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="time"
                                        className="mb-3 block text-base font-medium text-[#ffffff]"
                                    >
                                        Hora
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