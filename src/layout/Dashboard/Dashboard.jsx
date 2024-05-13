import { useContext, useState, useEffect } from "react";
import { ContextVariable } from '../../Context';
import { collection, addDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

import Modal from './Modal'

import './Dashboard.css'
import ModalStatusPaid from "../../components/ModalStatusPaid/ModalStatusPaid";
import { GetReservedList } from "../../Scripts/Tickets/Reserved";

function Dashboard() {

    const { alert, setalert, ListReservar, setListReservar } = useContext(ContextVariable)
    const [tickets, settickets] = useState([])
    const [search, setSearch] = useState('')

    const [modalTicket, setmodalTicket] = useState(null)
    const [open, setOpen] = useState(false)
    const [OpenStatusPaid, setOpenStatusPaid] = useState(false)
    const [StatusTicket, setStatusTicket] = useState(null)
    const [loadStatus, setloadStatus] = useState(false)
    
    const handleOpen = (ticket) => {
        setmodalTicket(ticket)
        setOpen(true)
    }
    const handleOpenStatus = (ticket) => {
        setOpenStatusPaid(true)
        setStatusTicket(ticket)
    }
    const handleClose = () => setOpen(false)
    const handleCloseStatus = () => setOpenStatusPaid(false)


    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const data = tickets.filter((item) => item.ticketId.toLowerCase().includes(search.toLowerCase()))


    const db = getFirestore()
    const [tickets2, setTickets2] = useState([])

    const getReservar = async () => {
        GetReservedList(setListReservar)
    }
    const getpurchase = async () => {
        try {
            const ref = collection(db, 'events');

            const docsSnap = await getDocs(ref);


            const eventos = [];
            docsSnap.forEach(doc => {

                const data = doc.data();
                const eventId = doc.id; 
                data.eventId = eventId; 
                eventos.push(data);
            });
            setTickets2(eventos)

        } catch (error) {
            console.error("Error al obtener los datos de la colección 'events':", error);
        }
    };

    useEffect(() => {
        getpurchase()
        getReservar()
    }, [])

    useEffect(() => {
      console.log(ListReservar.map((data) => (
        console.log(data.data.TicketNumber)
      )))
    }, [])

    useEffect(() => {
        if (loadStatus === true) {
            getpurchase()
            setloadStatus(false)
        }

    }, [loadStatus])


    const get = async () => {

        const ref = collection(db, 'Tickets')

        const docsSnap = await getDocs(ref);

        var ti = []

        docsSnap.forEach(async doc => {

            const activations = getActivationStatus(doc.data().ticketId)

            ti.push({ ...doc.data(), 'key': doc._key.path.segments[6], 'activations': activations })

        })

        console.log(ti.activations)

        settickets(ti)

    }

    const getActivationStatus = async (ticketId) => {

        const command = query(collection(db, 'SparkleManiaActivations'), where('ticketId', '==', ticketId))

        const querySnapshot = await getDocs(command)

        return querySnapshot.forEach((activation) => {
            // ti.push({ ...doc.data(), 'activations': activation.data() })
            // console.log(activation.data())
            return activation.data()

        })


    }

    useEffect(() => {

        get()

    }, []);

    function obtenerURLAvatar(nombre) {
        if (!nombre) return ''
    
        const iniciales = nombre.split(' ').map(palabra => palabra.charAt(0)).join('').toUpperCase();
    
        return `https://ui-avatars.com/api/?name=${iniciales}&background=%23ba36ba`
    }

    return (
        <>
            {/* <Modal open={open} onClose={handleClose} ticket={modalTicket} /> */}
            <ModalStatusPaid open={OpenStatusPaid} onClose={handleCloseStatus} StatusTicket={StatusTicket} setloadStatus={setloadStatus} />
            <div className="flex items-center justify-center min-h-screen bg-[#0000003f]">
                <div className="col-span-12">
                    <div className="overflow-auto lg:overflow-visible ">
                        {/* <label htmlFor="search">
                        Search:
                        <input id="search" type="text" onChange={handleSearch} />
                    </label> */}
                        <div className="mt-[1rem]">
                            {/* <label
                            htmlFor="fName"
                            className="mb-3 block text-base font-medium text-[#ffffff]"
                        >
                            Buscar
                        </label> */}
                            <input
                                type="text"
                                name="Nombre"
                                value={search}
                                id="fName"
                                // placeholder="Nombre Apellido"
                                className="rounded-md bg-[#06040f] py-3 px-6 border text-base font-medium text-[#6B7280] focus:border-[#6A64F1] focus:shadow-md"
                                onChange={handleSearch}
                            />
                        </div>
                        <table className="table text-gray-400 border-separate space-y-6 text-sm">
                            <thead className="bg-[#00000085] text-white">
                                <tr>
                                    <th className="p-3">TicketId</th>
                                    {/* <th className="p-3 text-left">Name</th> */}
                                    <th className="p-3 text-left">Paid</th>
                                    <th className="p-3 text-left">Price</th>
                                    <th className="p-3 text-left">Invitados</th>
                                    <th className="p-3 text-left">Total</th>
                                    <th className="p-3 text-left">Seller</th>
                                    <th className="p-3 text-left">Date of Purchase</th>
                                    <th className="p-3 text-left">Submit Date</th>
                                    <th className="p-3 text-center">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ListReservar.map((ticket, index) => (
                                        <tr className="bg-gray-800 " key={index}>
                                            <td className="p-3">
                                                <div className="flex align-items-center">
                                                    {/* ticket.EventName */}
                                                    <img className="rounded-full h-12 w-12  object-cover" src={obtenerURLAvatar(ticket?.data?.EventName)} alt="User Image" />

                                                    <div className="ml-3">
                                                        <div className="">{ticket?.data?.TicketNumber?.TicketNumber}</div>
                                                        <div className="text-gray-500">{ticket?.data?.Name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <button >
                                                <span className="bg-green-400 text-gray-50 rounded-md px-2">{ticket?.data?.Status}</span>

                                                </button>

                                            </td>
                                            <td className="p-3">
                                                {ticket?.data?.Price}
                                            </td>
                                            <td className="p-3">
                                                {ticket?.data?.Tickets.length}
                                            </td>
                                            <td className="p-3">
                                                {ticket?.data?.TotalPrice}
                                            </td>
                                            <td className="p-3">
                                                {ticket?.data?.Name}
                                            </td>
                                            <td className="p-3">
                                                {ticket?.data?.DateofPurchase}
                                            </td>
                                            <td className="p-3">
                                                {ticket?.data?.SubmitDate}
                                            </td>
                                            <td className="p-3 ">
                                                <a href="#" className="text-gray-400 hover:text-gray-100 mr-2">
                                                    <i className="material-icons-outlined text-base">visibility</i>
                                                </a>
                                                <button onClick={() => handleOpen(ticket)} className="text-gray-400 hover:text-gray-100  mx-2">
                                                    <i className="material-icons-outlined text-base">edit</i>
                                                </button>
                                                <a href="#" className="text-gray-400 hover:text-gray-100  ml-2">
                                                    <i className="material-icons-round text-base">delete_outline</i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard