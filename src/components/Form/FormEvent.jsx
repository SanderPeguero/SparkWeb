import React, { useContext, useState, useEffect } from 'react'
import { ContextVariable } from '../../Context'
import { EventEditar, SaveEvent } from '../../Scripts/Evento/Evento'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { FcAddImage } from "react-icons/fc";
import { FaEye, FaRegEye } from "react-icons/fa";
const FormEvent = ({ event }) => {
    const { isOpenModalEvent, setisOpenModalEvent, ListEvents, setListEvents } = useContext(ContextVariable)

    useEffect(() => {
        if (isOpenModalEvent) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpenModalEvent])

    const [NombreEvento, setNombreEvento] = useState('')
    const [FechaEvento, setFechaEvento] = useState(null)
    const [eventHora, setEventHora] = useState(null)
    const [CantidadTickets, setCantidadTickets] = useState('')
    const [PrecioTickets, setPrecioTickets] = useState('')
    const [LugarEvento, setLugarEvento] = useState(null)
    const [ImageEvento, setImageEvento] = useState(null)
    const [EventStatus, setEventStatus] = useState('')
    const [MosatrarImg, setMosatrarImg] = useState(null)
    const [Mostrar, setMostrar] = useState(false)
    const [Tickets, setTickets] = useState([])

    useEffect(() => {
        if (event) {
            console.log(event.Tickets)
            setNombreEvento(event.EventName)
            setFechaEvento(event.EvenetDate)
            setEventHora(event.EventTime)
            setCantidadTickets(event.AmountTicket)
            setPrecioTickets(event.PriceTickets)
            setLugarEvento(event.EventPlace)
            setImageEvento(event.EventImage)
            setEventStatus(event.EventStatus)
            setTickets(event.Tickets)
        }
    }, [event])

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

            isUnique = !ListEvents.includes(ticket)
        }

        return ticket;
    }


    function generateTickets(CantidadTickets) {
        const tickets = [];
        for (let i = 0; i < CantidadTickets; i++) {
            const ticket = generateTicket();
            tickets.push({
                IdTickets: i + 1,
                TicketNumber: ticket,
                Status: "Disponible"
            });
        }

        return tickets;
    }




    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageEvento(file);
            const imageUrl = URL.createObjectURL(file);
            setMosatrarImg(imageUrl);
        }
    };


    const handleSubmitEvent = () => {
        if (NombreEvento != '' &&
            FechaEvento != null &&
            eventHora != null &&
            CantidadTickets != 0 &&
            PrecioTickets != 0 &&
            LugarEvento != null &&
            ImageEvento != null &&
            EventStatus != null 
        ) {
            const dataEvent = {
                EventName: NombreEvento,
                EvenetDate: FechaEvento,
                EventTime: eventHora,
                AmountTicket: CantidadTickets,
                PriceTickets: PrecioTickets,
                EventPlace: LugarEvento,
                EventStatus: EventStatus,
                EventImage: ImageEvento,
                Tickets: generateTickets(CantidadTickets)
            }
            console.log(dataEvent)
            if (dataEvent) {
                SaveEvent(dataEvent)
                setNombreEvento('')
                setFechaEvento(null)
                setCantidadTickets(0)
                setPrecioTickets(0)
                setLugarEvento('')
                setEventStatus('')
                setImageEvento(null)
                setisOpenModalEvent(!isOpenModalEvent)
            }


        } else {
            alert("Todos los campos son requeridos")
        }
    }

    const handleEditarEvent = () => {
        // console.log(generateTickets(CantidadTickets))
        if (event) {
            if (NombreEvento != '' &&
                FechaEvento != null &&
                eventHora != null &&
                CantidadTickets != 0 &&
                PrecioTickets != 0 &&
                LugarEvento != null &&
                ImageEvento != null &&
                EventStatus != null &&
                Tickets.length > 0
            ) {
                const dataEvent = {
                    EventName: NombreEvento,
                    EvenetDate: FechaEvento,
                    EventTime: eventHora,
                    AmountTicket: CantidadTickets,
                    PriceTickets: PrecioTickets,
                    EventPlace: LugarEvento,
                    EventStatus: EventStatus,
                    EventImage: ImageEvento,
                    Tickets: Tickets
                }

                if (dataEvent) {
                    EventEditar(dataEvent, event.Iddoc, setListEvents)
                    setNombreEvento('')
                    setFechaEvento(null)
                    setCantidadTickets(0)
                    setPrecioTickets(0)
                    setLugarEvento('')
                    setEventStatus('')
                    setImageEvento(null)
                    setisOpenModalEvent(!isOpenModalEvent)
                }


            } else {
                alert("Todos los campos son requeridos")
            }
        }
    }

    const handleMostrarIMG = () => {
        if (ImageEvento) {
            setisOpenModalEvent(!isOpenModalEvent)
            setMostrar(true)
        }
    }

    const handleClose = () => {
        setisOpenModalEvent(!isOpenModalEvent)
        setMostrar(false)
    }
    return (
        <>
            <MostrarImage open={Mostrar} close={handleClose} image={ImageEvento} />
            {isOpenModalEvent &&
                <div className='fixed inset-0 flex items-center justify-center text-white z-50 mx-8 sm:mx-0 min-h-screen w-full backdrop-blur-md'>
                    <div className="w-full bg-[#100c28] max-w-lg mx-auto">
                        <div className='flex justify-between items-center px-4'>
                            <h1 className='text-white text-2xl font-bold mt-4 ml-4'>Crear Evento</h1>
                            <button
                                onClick={() => setisOpenModalEvent(!isOpenModalEvent)}
                                className='text-gray-500 hover:text-red-700 focus:outline-none'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                        </div>
                        <hr className="mt-2 border-b-1 border-blueGray-300 mx-4" />

                        <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="eventName">
                                    Nombre del Evento
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="eventName"
                                    type="text"
                                    defaultValue={NombreEvento}
                                    placeholder="Nombre del Evento"
                                    onChange={(e) => setNombreEvento(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 w-full flex flex-row">
                                <div className='mr-4 w-1/2'>
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="eventDate">
                                        Fecha del Evento
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                        id="eventDate"
                                        type="date"
                                        defaultValue={FechaEvento}
                                        placeholder="Fecha del Evento"
                                        onChange={(e) => setFechaEvento(e.target.value)}
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="eventTime">
                                        Hora del Evento
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                        id="eventTime"
                                        type="time"
                                        placeholder="Hora del Evento"
                                        defaultValue={eventHora}
                                        onChange={(e) => setEventHora(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="eventLuagr">
                                    Lugar del Evento
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="eventLuagr"
                                    type="text"
                                    placeholder="Lugar del Evento"
                                    defaultValue={LugarEvento}
                                    onChange={(e) => setLugarEvento(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 flex flex-row">
                                <div className='mr-4'>
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="cantidadTickets">
                                        Cantidad de Tickets
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                        id="cantidadTickets"
                                        type="number"
                                        placeholder="Cantidad de Tickets"
                                        defaultValue={CantidadTickets}
                                        disabled={event != null ? true: false}
                                        onChange={(e) => setCantidadTickets(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="precioTickets">
                                        Precio de Tickets
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                        id="precioTickets"
                                        type="number"
                                        placeholder="Precio de Tickets"
                                        defaultValue={PrecioTickets}
                                        onChange={(e) => setPrecioTickets(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className='mb-2'>


                                <label className="block text-white text-sm font-bold mb-2" htmlFor="eventStatus">Select an option</label>
                                <select
                                    id="eventStatus"
                                    value={EventStatus}
                                    onChange={(e) => setEventStatus(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option className='' value="" disabled>Estado del Evento</option>
                                    <option value="Reservar">Reservar</option>
                                    <option value="Comprar ya">Comprar ya</option>
                                </select>
                            </div>
                            <div className="mb-4 flex flex-row items-center">
                                <label htmlFor={`file-upload-event`} className="px-3 py-2 text-start  text-xs leading-4">
                                    <div className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-blue-400 hover:text-white focus:outline-none">
                                        <input id={`file-upload-event`} onChange={(e) => handleChangeImage(e)} type="file" className="hidden" />
                                        <FcAddImage size={25} className="text-white" />
                                    </div>
                                </label>
                                {event != null && (
                                    <div className="px-3 py-2 text-right  text-xs leading-4">
                                        <button onClick={() => handleMostrarIMG()} className="px-3 py-1  flex flex-row items-center border border-blue-500 text-white rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                            Ver imagen <FaEye className='ml-2' />
                                        </button>
                                    </div>
                                )}
                                {
                                    MosatrarImg != null && <div>{ImageEvento.name}</div>
                                }


                            </div>

                            {event ? <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => handleEditarEvent()}
                                >
                                    Editar Evento
                                </button>
                            </div>

                                :
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() => handleSubmitEvent()}
                                    >
                                        Guardar Evento
                                    </button>
                                </div>

                            }


                        </form>
                    </div>

                </div>
            }
        </>
    )
}

export default FormEvent

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#090520',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

const MostrarImage = ({ open, close, image }) => {


    return (
        <div>
            <Modal
                open={open}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='backdrop-blur-md'
            >
                <Box sx={style}>

                    <img
                        src={image}
                        className='w-full h-48'
                    />

                    <div className='mt-8 flex items-center justify-center'>
                        <div onClick={() => close()} className="rounded btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-white ml-auto  ">Cerrar</div>

                    </div>
                </Box>
            </Modal>
        </div>
    )


}