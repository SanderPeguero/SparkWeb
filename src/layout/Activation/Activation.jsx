import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";

// const tickets = [
//     {'ticketId' : '3B0F', 'name': 'Henlihanny Altagracia',  'paid':'false', 'price':300},                                  
//     {'ticketId' : '37R0', 'name': 'David Chavez ',          'paid':'false', 'price':300},                          
//     {'ticketId' : '5J95', 'name': 'Arianny del carmen',     'paid':'false', 'price':300},                               
//     {'ticketId' : 'E7F8', 'name': 'Rosannyi Brito',         'paid':'false', 'price':300},                           
//     {'ticketId' : '7B9E', 'name': 'Biannelis Lopez',        'paid':'false', 'price':300},                            
//     {'ticketId' : 'B689', 'name': 'Joey Valenzuela',        'paid':'false', 'price':300},                            
//     {'ticketId' : '92A1', 'name': 'Enmanuel Breton',        'paid':'false', 'price':300},                            
//     {'ticketId' : '0A4F', 'name': 'Eury Cortorreal',        'paid':'false', 'price':300},                            
//     {'ticketId' : '62G1', 'name': 'Hermione Bello',         'paid':'false', 'price':300},                           
//     {'ticketId' : '3A54', 'name': 'Genesis Ramirez',        'paid':'false', 'price':300},                            
//     {'ticketId' : 'F43B', 'name': 'Eunysol Payano',         'paid':'false', 'price':300},                           
//     {'ticketId' : 'FBE3', 'name': 'Abimael de Leon',        'paid':'false', 'price':300},                            
//     {'ticketId' : 'D3FA', 'name': 'Anabel Aquino',          'paid':'false', 'price':300},                          
//     {'ticketId' : '6S48', 'name': 'Eliana M. Garcia',       'paid':'false', 'price':300},                             
//     {'ticketId' : '173D', 'name': 'Irvin Burgos',           'paid':'false', 'price':300},                         
//     {'ticketId' : '7CEC', 'name': 'Juandy Ortega',          'paid':'false', 'price':300},                          
//     {'ticketId' : 'A942', 'name': 'Joseph Noe',             'paid':'false', 'price':300},                       
//     {'ticketId' : 'C6C4', 'name': 'Carlos Enrique Yanguela','paid':'false', 'price':300},                                    
//     {'ticketId' : '784V', 'name': 'Elizabeth Espinal',      'paid':'false', 'price':300},                              
//     {'ticketId' : '17K6', 'name': 'Fradiel nuñez ',         'paid':'false', 'price':300},                           
//     {'ticketId' : 'C3F8', 'name': 'Danny Holguin',          'paid':'false', 'price':300},                          
//     {'ticketId' : 'ACC4', 'name': 'Erickson colon',         'paid':'false', 'price':300},                           
//     {'ticketId' : 'C72E', 'name': 'Luis',                   'paid':'false', 'price':300},                 
//     {'ticketId' : '607R', 'name': 'Elizabeth Diaz',         'paid':'false', 'price':300},                           
//     {'ticketId' : '4T41', 'name': 'Lori Diaz',              'paid':'false', 'price':300},                      
//     {'ticketId' : '85E3', 'name': 'Jerinson Fernandez',     'paid':'false', 'price':300},                               
//     {'ticketId' : 'EC2C', 'name': 'Carlos Inoa',            'paid':'false', 'price':300},                        
//     {'ticketId' : '76Y8', 'name': 'Elvis vicente',          'paid':'false', 'price':300},                          
//     {'ticketId' : '86C8', 'name': 'Felian Abreu (Rosanyi)', 'paid':'false', 'price':300},                                   
//     {'ticketId' : '4A0A', 'name': 'Angelic Rodriguez',      'paid':'false', 'price':300},                              
//     {'ticketId' : '31E7', 'name': 'Enmanuel Garcia',        'paid':'false', 'price':300},                            
//     {'ticketId' : '676D', 'name': 'Pamela Gonzalez',        'paid':'false', 'price':300},                            
//     {'ticketId' : 'E2A8', 'name': 'Jose Alberto Gonzalez',  'paid':'false', 'price':300},                                  
//     {'ticketId' : '03CB', 'name': 'Anderson Nuñez',         'paid':'false', 'price':300},                           
//     {'ticketId' : 'D732', 'name': 'Irene Consuelo',         'paid':'false', 'price':300},                           
//     {'ticketId' : '8FE1', 'name': 'Yaderlys serra',         'paid':'false', 'price':300},                           
//     {'ticketId' : 'B8DA', 'name': 'Yubelis Lopez',          'paid':'false', 'price':300},                          
//     {'ticketId' : '0C1F', 'name': 'Joel Alejo',             'paid':'false', 'price':300},                       
//     {'ticketId' : 'B8AD', 'name': 'Luis Holguin',           'paid':'false', 'price':300},                         
//     {'ticketId' : 'C421', 'name': '',                       'paid':'false', 'price':300},             
//     {'ticketId' : '1CA3', 'name': 'Joel Omar Ureña',        'paid':'false', 'price':300},                            
//     {'ticketId' : '8F52', 'name': 'Anderson',               'paid':'false', 'price':300},                     
//     {'ticketId' : '3CA9', 'name': 'Renny Rojas',            'paid':'false', 'price':300},                        
//     {'ticketId' : '6FB8', 'name': 'Jesus Santos',           'paid':'false', 'price':300},                         
//     {'ticketId' : 'C85F', 'name': 'Cesar Acosta',           'paid':'false', 'price':300},                         
//     {'ticketId' : '31EF', 'name': '',                       'paid':'false', 'price':300},             
// ]

function Activation() {

    const [ticketId, setticketId] = useState('')
    const [name, setname] = useState('');
    const [allowActivation, setallowActivation] = useState(false)
    const [paid, setpaid] = useState(null);
    const [price, setprice] = useState(0);


    const db = getFirestore()
    const ref = collection(db, 'Tickets')

    const get = async () => {
        const docsSnap = await getDocs(ref);

        docsSnap.forEach(doc => {
            const data = doc.data()
            var IdValidation = false
            var nameValidation = false

            data.ticketId == ticketId ? IdValidation = true : null
            data.ticketId == ticketId ? nameValidation = true : null

            // console.log({
            //     IdValidation,
            //     nameValidation,
            //     data
            // })

            if (IdValidation && nameValidation) {
                console.log(data)
                setpaid(data.paid)
                setprice(data.price)
                setallowActivation(true)
                return
            }
        })


    }

    // const set = async () => {

    //     tickets.forEach(async (ticket) => {
    //         try {
    //             const docRef = await addDoc(collection(db, "Tickets"), {
    //                 ticketId: ticket.ticketId,
    //                 name: ticket.name,
    //                 paid: ticket.paid,
    //                 price: ticket.price,
    //                 dateOfPurchase: '',
    //                 submitDate: new Date()
    //             });
    //             console.log("Document written with ID: ", docRef.id);
    //         } catch (e) {
    //             console.error("Error adding document: ", e);
    //         }
    //     })
    // }

    // useEffect(() => {
    // }, []);

    const [description, setdescription] = useState('');
    const [email, setemail] = useState('');
    const [time, settime] = useState('');

    const set = async () => {

        console.log("validacion Fallida")
        console.log({
            name,
            ticketId,
            description,
            email,
            time
        })
        if(name !=='' && setdescription !=='' && ticketId !=='' && email !==''){
            console.log("validacion exitosa")
            try {
                const docRef = await addDoc(collection(db, "Sparklers"), {
                    name: name,
                    ticketId: ticketId,
                    description: description,
                    email: email,
                    time: time,
                    activationDate: new Date()
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

    }
    if(paid == 'false'){
        return(
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <div className="text-white">Esta boleta no se puede activar porque todavia no ha sido paga</div>
                    <div className="text-white">Precio RD${price}</div>
                    <div className="text-white">Comunicate con Sander o con Keyla cuando quieras pagarla</div>
                </div>

            </div>
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
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <span className="text-white">
                    Para empezar: <br /><br />
                    1-Ingresa el ID de tu boleta <br />
                    2-Ingresa tu Nombre con tu primer Apellido<br />
                    3-Presiona el botón
                </span>
                <form onSubmit={get} className='mt-8'>
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
                                    onChange={(e) => setname(e.target.value)}
                                    placeholder='Sander Peguero'
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                ></input>
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="fName"
                                    className="mb-3 block text-base font-medium text-[#ffffff]"
                                >
                                    ID
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => setticketId(e.target.value)}
                                    placeholder='F00F0'
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                ></input>
                            </div>
                        </div>
                    </div>
                </form>
                <div>
                    <button
                        className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        onClick={get}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Activation