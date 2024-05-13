import { useContext, useState, useEffect } from "react";
import { ContextVariable } from '../../Context';
import { collection, addDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import ModalStatusPaid from "../../components/ModalStatusPaid/ModalStatusPaid";
import BasicModal from "./Modal";
import { getPurchase } from "../../Scripts/Tickets/Tickets";
import FormEvent from "../../components/Form/FormEvent";


function Screen() {

    const { alert, setalert, isOpenModalEvent, setisOpenModalEvent } = useContext(ContextVariable)
    // const { modal, setmodal } = useContext(ContextVariable)
    const [tickets, settickets] = useState([])
    const [tickets2, setTickets2] = useState([])
    const [loadStatus, setloadStatus] = useState(false)
    const [StatusTicket, setStatusTicket] = useState(null)
    const [OpenStatusPaid, setOpenStatusPaid] = useState(false)
    const [search, setSearch] = useState('')

    const [modalTicket, setmodalTicket] = useState(null)
    const [open, setOpen] = useState(false)
    const handleOpen = (ticket) => {
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

        const ref = collection(db, 'Tickets')

        const docsSnap = await getDocs(ref);

        var ti = []

        docsSnap.forEach(async doc => {
            // console.log(doc._key.path.segments[6])

            const activations = getActivationStatus(doc.data().ticketId)

            ti.push({ ...doc.data(), 'key': doc._key.path.segments[6], 'activations': activations })

        })

        console.log(ti.activations)

        settickets(ti)

    }

    const getActivationStatus = async (ticketId) => {

        const command = query(collection(db, 'SparkleManiaActivations'), where('ticketId', '==', ticketId))
        // console.log(res)

        const querySnapshot = await getDocs(command)

        return querySnapshot.forEach((activation) => {
            // ti.push({ ...doc.data(), 'activations': activation.data() })
            // console.log(activation.data())
            return activation.data()

        })


    }

    const getpurchase = async () => {
        getPurchase(setTickets2)
        // try {
        //     const ref = collection(db, 'events');

        //     const docsSnap = await getDocs(ref);


        //     const eventos = [];
        //     docsSnap.forEach(doc => {

        //         const data = doc.data();
        //         const eventId = doc.id; 
        //         data.eventId = eventId; 
        //         eventos.push(data);
        //     });
        //     setTickets2(eventos)

        // } catch (error) {
        //     console.error("Error al obtener los datos de la colección 'events':", error);
        // }
    };

    const handleOpenStatus = (ticket) => {
        setOpenStatusPaid(true)
        setStatusTicket(ticket)
    }



    useEffect(() => {

        getpurchase()

    }, []);

    useEffect(() => {
        if (loadStatus === true) {
            getpurchase()
            setloadStatus(false)
        }

    }, [loadStatus])

    const handleCloseStatus = () => setOpenStatusPaid(false)
    const handleOpenModalEvent = () => setisOpenModalEvent(!isOpenModalEvent)

    function obtenerURLAvatar(nombre) {
        if (!nombre) return ''
    
        const iniciales = nombre.split(' ').map(palabra => palabra.charAt(0)).join('').toUpperCase();
    
        return `https://ui-avatars.com/api/?name=${iniciales}&background=%23ba36ba`
    }


    return (
        <div>
            <BasicModal ticket={modalTicket} open={open} onClose={handleClose} setloadStatus={setloadStatus} />
            <ModalStatusPaid open={OpenStatusPaid} onClose={handleCloseStatus} StatusTicket={StatusTicket} setloadStatus={setloadStatus} />
            <FormEvent />
            {/* comments 1 */}
            <div className="flex overflow-hidden bg-white pt-16">
               
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto ">

                    <div className="flex justify-end ">
                        <button onClick={() => handleOpenModalEvent()}  className="mr-8 group relative h-12 w-48 overflow-hidden rounded-xl bg-[#ba36ba]  bg-gradient-to-r from-[#9340FF] to-[#FF3C5F] text-lg font-bold text-white">

                            New evento +
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                        </button>
                    </div>

 
                    <main>
                        <div className="pt-6 px-4">
                            <div className="my-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{data.length}</span>
                                            <h3 className="text-base font-normal text-gray-500">Tickets in the system</h3>
                                        </div>
                                        <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                                            14.6%
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">5,355</span>
                                            <h3 className="text-base font-normal text-gray-500">Visitors this week</h3>
                                        </div>
                                        <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                                            32.9%
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">385</span>
                                            <h3 className="text-base font-normal text-gray-500">User signups this week</h3>
                                        </div>
                                        <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                                            -2.7%
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex-shrink-0">
                                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">$45,385</span>
                                            <h3 className="text-base font-normal text-gray-500">Sales this week</h3>
                                        </div>
                                        <form action="#" method="GET" className="ml-4">
                                            <label htmlFor="topbar-search" className="sr-only">Search</label>
                                            <div className="mt-1 relative lg:w-64">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="search"
                                                    value={search}
                                                    id="topbar-search"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                                                    placeholder="Search"
                                                    onChange={handleSearch}
                                                />
                                            </div>
                                        </form>
                                        <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                                            12.5%
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="overflow-y-auto rounded-lg max-h-[40rem]">
                                        <table className="table text-gray-400 border-separate space-y-6 text-sm ">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TicketId</th>
                                                    {/* <th className="p-3 text-left">Name</th> */}
                                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Purchase</th>
                                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submit Date</th>
                                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    tickets2.map((ticket, index) => (
                                                        <tr className="bg-gray-800" key={index}>
                                                            <td className="p-3">
                                                                <div className="flex align-items-center">
                                                                <img className="rounded-full h-10 w-10  object-cover" src={obtenerURLAvatar(ticket.nameOfCustomer.eventDetails.eventName)} alt="User Image" />

                                                                    <div className="ml-3">
                                                                        <div className="">{ticket.nameOfCustomer.eventDetails.ticketCode.TicketNumber}</div>
                                                                        <div className="text-gray-500">{ticket.nameOfCustomer.customerDetails.name}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-3">
                                                                <button onClick={() => handleOpenStatus(ticket)}>
                                                                    {ticket.nameOfCustomer.paymentDetails.paymentStatus === 'Paid' ? <span className="bg-green-400 text-gray-50 rounded-md px-2">Paid</span> : null}
                                                                    {ticket.nameOfCustomer.paymentDetails.paymentStatus === 'Pending' ? <span className="bg-yellow-400 text-gray-50  rounded-md px-2">Pending</span> : null}
                                                                    {ticket.nameOfCustomer.paymentDetails.paymentStatus === 'Unpaid' ? <span className="bg-red-400 text-gray-50 rounded-md px-2">Unpaid</span> : null}
                                                                </button>
                                                            </td>
                                                            <td className="p-3">
                                                                {ticket.nameOfCustomer.eventDetails.ticketPrice}
                                                            </td>
                                                            <td className="p-3">
                                                                {/* {ticket.discount} */}
                                                            </td>
                                                            <td className="p-3">
                                                                {ticket.nameOfCustomer.customerDetails.name}
                                                            </td>
                                                            <td className="p-3">
                                                                {/* {ticket.dateOfPurchase} */}
                                                            </td>
                                                            <td className="p-3">

                                                            </td>
                                                            <td className="p-3 flex flex-row">
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
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Latest Transactions</h3>
                                            <span className="text-base font-normal text-gray-500">This is a list of latest transactions</span>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">View all</a>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-8">
                                        <div className="overflow-x-auto rounded-lg">
                                            <div className="align-middle inline-block min-w-full">
                                                <div className="shadow overflow-hidden sm:rounded-lg">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Transaction
                                                                </th>
                                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Date & Time
                                                                </th>
                                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Amount
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white">
                                                            <tr>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                                    Payment from <span className="font-semibold">Bonnie Green</span>
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                                    Apr 23 ,2021
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                                    $2300
                                                                </td>
                                                            </tr>
                                                            <tr className="bg-gray-50">
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                                                    Payment refund to <span className="font-semibold">#00910</span>
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                                    Apr 23 ,2021
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                                    -$670
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                                    Payment failed from <span className="font-semibold">#087651</span>
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                                    Apr 18 ,2021
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                                    $234
                                                                </td>
                                                            </tr>
                                                            <tr className="bg-gray-50">
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                                                    Payment from <span className="font-semibold">Lana Byrd</span>
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                                    Apr 15 ,2021
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                                    $5000
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                                    Payment from <span className="font-semibold">Jese Leos</span>
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                                    Apr 15 ,2021
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                                    $2300
                                                                </td>
                                                            </tr>
                                                            <tr className="bg-gray-50">
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                                                    Payment from <span className="font-semibold">THEMESBERG LLC</span>
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                                    Apr 11 ,2021
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                                    $560
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                                    Payment from <span className="font-semibold">Lana Lysle</span>
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                                    Apr 6 ,2021
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                                    $1437
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                                <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold leading-none text-gray-900">Latest Customers</h3>
                                        <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                                            View all
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <ul role="list" className="divide-y divide-gray-200">
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            Neil Sims
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="17727a767e7b57607e7973646372653974787a">[email&#160;protected]</a>
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                        $320
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/bonnie-green.png" alt="Neil image" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            Bonnie Green
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="d4b1b9b5bdb894a3bdbab0a7a0b1a6fab7bbb9">[email&#160;protected]</a>
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                        $3467
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/michael-gough.png" alt="Neil image" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            Michael Gough
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="57323a363e3b17203e3933242332257934383a">[email&#160;protected]</a>
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                        $67
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/thomas-lean.png" alt="Neil image" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            Thomes Lean
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="284d45494144685f41464c5b5c4d5a064b4745">[email&#160;protected]</a>
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                        $2367
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="pt-3 sm:pt-4 pb-0">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/lana-byrd.png" alt="Neil image" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            Lana Byrd
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="a2c7cfc3cbcee2d5cbccc6d1d6c7d08cc1cdcf">[email&#160;protected]</a>
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                        $367
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                    <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Acquisition Overview</h3>
                                    <div className="block w-full overflow-x-auto">
                                        <table className="items-center w-full bg-transparent border-collapse">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">Top Channels</th>
                                                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">Users</th>
                                                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                <tr className="text-gray-500">
                                                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Organic Search</th>
                                                    <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">5,649</td>
                                                    <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                                        <div className="flex items-center">
                                                            <span className="mr-2 text-xs font-medium">30%</span>
                                                            <div className="relative w-full">
                                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                                    <div className="bg-cyan-600 h-2 rounded-sm" style={{ width: '30%' }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="text-gray-500">
                                                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Referral</th>
                                                    <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">4,025</td>
                                                    <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                                        <div className="flex items-center">
                                                            <span className="mr-2 text-xs font-medium">24%</span>
                                                            <div className="relative w-full">
                                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                                    <div className="bg-orange-300 h-2 rounded-sm" style={{ width: '24%' }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="text-gray-500">
                                                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Direct</th>
                                                    <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">3,105</td>
                                                    <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                                        <div className="flex items-center">
                                                            <span className="mr-2 text-xs font-medium">18%</span>
                                                            <div className="relative w-full">
                                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                                    <div className="bg-teal-400 h-2 rounded-sm" style={{ width: '18%' }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="text-gray-500">
                                                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Social</th>
                                                    <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">1251</td>
                                                    <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                                        <div className="flex items-center">
                                                            <span className="mr-2 text-xs font-medium">12%</span>
                                                            <div className="relative w-full">
                                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                                    <div className="bg-pink-600 h-2 rounded-sm" style={{ width: '12%' }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="text-gray-500">
                                                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Other</th>
                                                    <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">734</td>
                                                    <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                                        <div className="flex items-center">
                                                            <span className="mr-2 text-xs font-medium">9%</span>
                                                            <div className="relative w-full">
                                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                                    <div className="bg-indigo-600 h-2 rounded-sm" style={{ width: '9%' }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="text-gray-500">
                                                    <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">Email</th>
                                                    <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">456</td>
                                                    <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                                                        <div className="flex items-center">
                                                            <span className="mr-2 text-xs font-medium">7%</span>
                                                            <div className="relative w-full">
                                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                                    <div className="bg-purple-500 h-2 rounded-sm" style={{ width: '7%' }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Screen