import { useContext, useState, useEffect } from "react";
import { ContextVariable } from '../../Context';
import { collection, addDoc, getDocs, getFirestore, query, where } from "firebase/firestore";


function Screen() {

    const { alert, setalert } = useContext(ContextVariable)
    // const { modal, setmodal } = useContext(ContextVariable)
    const [tickets, settickets] = useState([])
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

    useEffect(() => {

        get()

    }, []);


    return (
        <div>
            {/* <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                                <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                                <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <a href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                                <img src="https://demo.themesberg.com/windster/images/logo.svg" className="h-6 mr-2" alt="Windster Logo" />
                                <span className="self-center whitespace-nowrap">Sam's Dash</span>
                            </a>
                            <form action="#" method="GET" className="hidden lg:block lg:pl-32">
                                <label htmlFor="topbar-search" className="sr-only">Search</label>
                                <div className="mt-1 relative lg:w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center">
                            <button id="toggleSidebarMobileSearch" type="button" className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg">
                                <span className="sr-only">Search</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <div className="hidden lg:flex items-center">
                                <span className="text-base font-normal text-gray-500 mr-5">Open source ❤️</span>
                                <div className="-mb-1">
                                    <a className="github-button" href="#" data-color-scheme="no-preference: dark; light: light; dark: light;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star themesberg/windster-tailwind-css-dashboard on GitHub">Star</a>
                                </div>
                            </div>
                            <a href="#" className="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                                <svg className="svg-inline--fa fa-gem -ml-1 mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gem" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"></path>
                                </svg>
                                Upgrade to Pro
                            </a>
                        </div>
                    </div>
                </div>
            </nav> */}
            <div className="flex overflow-hidden bg-white pt-16">
                {/* <aside id="sidebar" className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
                    <div className="relative flex-1 flex flex-col min-h-0 mt-[4rem] border-r border-gray-200 bg-white pt-0">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex-1 px-3 bg-white divide-y space-y-1 ">
                                <ul className="space-y-2 pb-2">
                                    <li>
                                        <form action="#" method="GET" className="lg:hidden">
                                            <label htmlFor="mobile-search" className="sr-only">Search</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                                    </svg>
                                                </div>
                                                <input type="text" name="email" id="mobile-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                                            </div>
                                        </form>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                                            <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                            </svg>
                                            <span className="ml-3">Dashboard</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Kanban</span>
                                            <span className="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">Pro</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Inbox</span>
                                            <span className="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">Pro</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Users</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Products</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Sign In</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Sign Up</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="space-y-2 pt-2">
                                    <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                        <svg className="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gem" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"></path>
                                        </svg>
                                        <span className="ml-4">Upgrade to Pro</span>
                                    </a>
                                    <a href="#" target="_blank" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                        <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="ml-3">Documentation</span>
                                    </a>
                                    <a href="#" target="_blank" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                        <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                        </svg>
                                        <span className="ml-3">Components</span>
                                    </a>
                                    <a href="#" target="_blank" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                        <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="ml-3">Help</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside> */}
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto ">
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
                                                    data.map((ticket) => (
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