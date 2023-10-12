import { useContext, useState, useEffect } from "react";
import { ContextVariable } from '../../Context';
import { collection, addDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

import './Dashboard.css'

function Dashboard() {

    const { alert, setalert } = useContext(ContextVariable)
    const [tickets, settickets] = useState([])

    const db = getFirestore()

    const get = async () => {

        const ref = collection(db, 'Tickets')

        const docsSnap = await getDocs(ref);

        var ti = []

        docsSnap.forEach(doc => {
            const data = doc.data()
            ti.push(data)
        })

        settickets(ti)

    }

    useEffect(() => {

        get()

    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0000003f]">
            <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible ">
                    <table className="table text-gray-400 border-separate space-y-6 text-sm">
                        <thead className="bg-[#00000085] text-white">
                            <tr>
                                <th className="p-3">TicketId</th>
                                {/* <th className="p-3 text-left">Name</th> */}
                                <th className="p-3 text-left">Paid</th>
                                <th className="p-3 text-left">Price</th>
                                <th className="p-3 text-left">Discount</th>
                                <th className="p-3 text-left">Seller</th>
                                <th className="p-3 text-left">Date of Purchase</th>
                                <th className="p-3 text-left">Submit Date</th>
                                <th className="p-3 text-center">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.map((ticket) => (
                                    <tr className="bg-gray-800" key={ticket.ticketId}>
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
                                            {ticket.seller}
                                        </td>
                                        <td className="p-3">
                                            {ticket.dateOfPurchase}
                                        </td>
                                        <td className="p-3">
                                            {/* {ticket.submitDate} */}
                                        </td>
                                        <td className="p-3 ">
                                            <a href="#" className="text-gray-400 hover:text-gray-100 mr-2">
                                                <i className="material-icons-outlined text-base">visibility</i>
                                            </a>
                                            <a href="#" className="text-gray-400 hover:text-gray-100  mx-2">
                                                <i className="material-icons-outlined text-base">edit</i>
                                            </a>
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
    )
}

export default Dashboard