import { useContext, useState, useEffect } from "react";
import { ContextVariable } from '../../Context';
import { collection, addDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

import Modal from './Modal'

import './Dashboard.css'

function Dashboard() {

    const { alert, setalert } = useContext(ContextVariable)
    // const { modal, setmodal } = useContext(ContextVariable)
    const [tickets, settickets] = useState([])
    const [search, setSearch] = useState('')

    const [modalTicket, setmodalTicket] = useState(null)
    const [open, setOpen] = useState(false)
    const handleOpen = (ticket) =>{
        setmodalTicket(ticket)
        setOpen(true)
    } 
    const handleClose = () => setOpen(false)


    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const data = tickets.filter((item) => item.ticketId.toLowerCase().includes(search.toLowerCase()))


    const db = getFirestore()

    const get = async () => {

        const ref = collection(db, 'SparkleManiaActivations')

        const docsSnap = await getDocs(ref);

        var ti = []

        docsSnap.forEach(doc => {
            // console.log(doc._key.path.segments[6])
            ti.push({ ...doc.data(), 'key': doc._key.path.segments[6] })
        })

        // console.log(ti)
        settickets(ti)

    }

    useEffect(() => {

        get()

    }, []);

    return (
        <>
            <Modal open={open} onClose={handleClose} ticket={modalTicket}/>
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
                                    <th className="p-3 text-left">Discount</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Number</th>
                                    {/* <th className="p-3 text-left">Date of Activation</th> */}
                                    <th className="p-3 text-center">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((ticket) => (
                                        <tr className="bg-gray-800" key={ticket.key}>
                                            <td className="p-3">
                                                <div className="flex align-items-center">
                                                    <img className="rounded-full h-12 w-12  object-cover" src="https://firebasestorage.googleapis.com/v0/b/sparkgroup-506bf.appspot.com/o/SparkleMania.png?alt=media&token=9c4d540b-894d-4f63-bfe2-36242de104ca" alt="User Image" />
                                                    {/* <i className="material-icons-outlined text-base">person</i> */}
                                                    <div className="ml-3">
                                                        <div className="">{ticket.ticketId}</div>
                                                        <div className="text-gray-500">{ticket.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                {ticket.paid == 'true' ? <span className="bg-green-400 text-gray-50 rounded-md px-2">Paid</span> : null}
                                                {ticket.paid == 'pending' ? <span className="bg-yellow-400 text-gray-50  rounded-md px-2">Pending</span> : null}
                                                {ticket.paid == 'false' ? <span className="bg-red-400 text-gray-50 rounded-md px-2">Unpaid</span> : null}
                                            </td>
                                            <td className="p-3">
                                                {ticket.price}
                                            </td>
                                            <td className="p-3">
                                                {ticket.discount}
                                            </td>
                                            <td className="p-3">
                                                {ticket.email}
                                            </td>
                                            <td className="p-3">
                                                {ticket.number}
                                            </td>
                                            {/* <td className="p-3">
                                                {ticket.activationDate}
                                            </td> */}
                                            <td className="p-3 ">
                                                <button onClick={() => handleOpen(ticket)} className="text-gray-400 hover:text-gray-100 mr-2">
                                                    <i className="material-icons-outlined text-base">visibility</i>
                                                </button>
                                                <button  className="text-gray-400 hover:text-gray-100  mx-2">
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