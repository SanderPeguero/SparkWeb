import { useState, useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { ContextVariable } from '../../Context';
import { SaveReservar } from '../../Scripts/Tickets/Reserved';
import { EditarStatusTickets } from '../../Scripts/Evento/Evento';


function ReserveTicket({ event, purchase }) {

    const { alert, setalert, user, setlocattion, ListReservar, ListEvents, setListEvents, setDataReservar, dataReservar } = useContext(ContextVariable)
    const Location = useLocation()
    const navigate = useNavigate()

    const [email, setemail] = useState(user?.email)
    const [how, sethow] = useState('')
    const [number, setnumber] = useState(user?.phone)
    const [Price, setPrice] = useState(400)
    const [IdDoc, setIdDoc] = useState(null)




    useEffect(() => {
        if (user) {
            setemail(user?.email)
            setnumber(user?.phone)
        }
    }, [user])



    const db = getFirestore()
    const ref = collection(db, 'Sparklers')

    function generateTicket() {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const ticketLength = 5;

        let ticket = '';
        let isUnique = false;

        while (!isUnique) {
            ticket = '';
            for (let i = 0; i < ticketLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                ticket += characters[randomIndex];
            }

            isUnique = !ListReservar.includes(ticket);
        }

        return ticket;
    }


    function generateTickets(CantidadTickets) {
        const tickets = [];
        for (let i = 0; i < CantidadTickets; i++) {
            const ticket = generateTicket();
            tickets.push({
                TicketNumber: ticket,
                Status: "Reserved"
            });
        }
        return tickets;
    }

    useEffect(() => {
        if (dataReservar) {
            console.log(dataReservar.Tickets)
            // console.log(dataReservar.Tickets)
        }
    }, [dataReservar])


    // function SeleccionarTickets(CantidadTickets) {
    //     const ticketsDisponibles = [];
    //     let ticketsSeleccionados = 0;
    //     let Tickets = ''

    //     dataReservar.Tickets.forEach(ticket => {
    //         if (ticket.Status === "Disponible" && ticketsSeleccionados < CantidadTickets) {
    //             ticketsDisponibles.push(ticket);
    //             ticketsSeleccionados++;
    //         }
    //     });


    //     return ticketsDisponibles;
    // }

    function SeleccionarTickets(CantidadTickets) {
        const ticketsDisponibles = [];
        let ticketsSeleccionados = 0;
        let ticketSeleccionado = null; // Inicializamos como null

        dataReservar.Tickets.forEach(ticket => {
            if (ticket.Status === "Disponible" && ticketsSeleccionados < CantidadTickets) {
                // Si solo se necesita un ticket, lo asignamos directamente y detenemos el bucle
                ticket.Status = "Reserved"
                if (CantidadTickets === 1) {
                    ticketSeleccionado = ticket;
                    return; // Salimos del bucle forEach
                } else {
                    ticketsDisponibles.push(ticket);
                    ticketsSeleccionados++;
                }
            }
        });

        // Si solo se seleccionó un ticket, lo devolvemos directamente
        if (ticketSeleccionado !== null) {
            return ticketSeleccionado;
        }

        // Si hay tickets disponibles, devolvemos los tickets disponibles
        if (ticketsDisponibles.length > 0) {
            return ticketsDisponibles;
        }

        // Si no hay tickets disponibles, devolvemos false
        return false;
    }




    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16)

    const [isReservado, setisReservado] = useState(false)
    const upload = async () => {

        if (email != '' && number != '') {
            if (how <= 5) {
                if (user?.email === email) {
                    let ticketNotHow = []
                    const selectedTicket = SeleccionarTickets(1);
                    const selectedTickets = how === '' ? [] : SeleccionarTickets(how);
                    if (selectedTicket != false) {
                        let totalPrice = how === 0 ? Price : Price * how + Price;
                        if (how >= 1 && selectedTickets === false) {
                            setalert({
                                ...alert,
                                open: true,
                                message: `Boletas agotadas`,
                                severity: 'warning'
                            });
                        } else {
                            // Objeto de datos a enviar
                            let data = {
                                Name: user?.name,
                                Email: user?.email,
                                Number: number,
                                EventName: dataReservar.EventName,
                                TicketNumber: selectedTicket,
                                Cantidad: how,
                                Price: Price,
                                TotalPrice: totalPrice,
                                DateofPurchase: null,
                                SubmitDate: formattedDate,
                                Status: "Reserved",
                                Tickets: selectedTickets
                            };

                            console.log(data)
                            // SaveReservar(data, setalert, alert, dataReservar.Iddoc, setListEvents)
                        }

                    } else {
                        setalert({
                            ...alert,
                            open: true,
                            message: `Boletas agotadas`,
                            severity: 'warning'
                        });
                    }





                } else {
                    setalert({
                        ...alert,
                        open: true,
                        message: `El correo no coincide`,
                        severity: 'warning'
                    });
                }
            } else {
                setalert({
                    ...alert,
                    open: true,
                    message: `Maximo de innvitado: 5`,
                    severity: 'warning'
                });
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
                                defaultValue={email}
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
                                        defaultValue={number}
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
                                        max={5}
                                    />
                                    <div className="text-sm text-gray-500">Máximo: 5 invitados</div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>
                        <button onClick={() => upload()} className="group relative h-12 w-48 overflow-hidden rounded-xl bg-[#3d36ba] text-lg font-bold text-white my-4">
                            Reservar ahora!
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReserveTicket