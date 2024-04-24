import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ticket from '../../assets/TicketMania.png'
import ticket2 from '../../assets/Ticket2003.png'
import ReserveTicket from './reserveTicket';
import { ContextVariable } from '../../Context';
import Purchase from './purchase';
import { ListEvent } from '../../Scripts/Evento/Evento';
import { FaEdit } from 'react-icons/fa';
import FormEvent from '../../components/Form/FormEvent';

function tickets() {
    const { ListEvents, setListEvents, setDataReservar, dataReservar, dataComprar, setDataComprar } = useContext(ContextVariable)
    const { user,
        reserveTicket,
        setlocattion,
        auth,
        setreserveTicket,
        comprarTicket,
        setcomprarTicket,
        isOpenLogIn,
        setIsOpenLogIn,
        isOpenModalEvent,
        setisOpenModalEvent
    } = useContext(ContextVariable)

    const [isAuthOpenReserva, setIsAuthOpenReserva] = useState(false)
    const [isAuthOpenCompras, setIsAuthOpenCompras] = useState(false)
    const [EventData, setEventData] = useState(null)
    const navigate = useNavigate()




    const handleOpenReservar = (e, event) => {
        e.preventDefault()
        if (auth === null) {
            setIsOpenLogIn(true)
            setIsAuthOpenReserva(true)
        } else {
            setDataReservar(event)
            setlocattion(`${user.role === 'admin' ? '/admin/reservar' : '/reservar'}`)
            navigate(`${user.role === 'admin' ? '/admin/reservar' : '/reservar'}`)
        }
    }

    useEffect(() => {
        if (isAuthOpenReserva && !isOpenLogIn && !reserveTicket && !comprarTicket) {
            if (auth !== null) {
                setreserveTicket(true);
            }
        }

    }, [isAuthOpenReserva, isOpenLogIn, reserveTicket]);

    useEffect(() => {
        if (isAuthOpenCompras && !isOpenLogIn && !comprarTicket && !reserveTicket) {
            if (auth !== null) {
                setcomprarTicket(true);
            }
        }
    }, [isAuthOpenCompras, isOpenLogIn, comprarTicket]);

    const handleOpenCompras = (e, event) => {
        e.preventDefault()
        if (auth === null) {
            setIsOpenLogIn(true)
            setIsAuthOpenCompras(true)
        }
        else {
            setDataComprar(event)
            setlocattion(`${user.role === 'admin' ? '/admin/comprar' : '/comprar'}`)
            navigate(`${user.role === 'admin' ? '/admin/comprar' : '/comprar'}`)
        }
    }

    useEffect(() => {
        ListEvent(setListEvents)

    }, [])





    const purchase = true

    if (reserveTicket) {
        return (
            <ReserveTicket event={'Sparkle Mania'} />
        )
    }

    if (comprarTicket) {
        return (
            <Purchase event={'Sparkle Mania'} />
        )
    }

    const handleEditEvent = (event) => {
        if (event) {
            setEventData(event)
            setisOpenModalEvent(!isOpenModalEvent)
        }
    }

    return (
        <>
            <FormEvent event={EventData} />
            <div className="flex bg-[#3d36ba0a] shadow-lg rounded-lg mx-4 md:mx-auto mb-[8rem]">
                <div className="flex flex-col items-start px-4 py-6">
                    {ListEvents.map((event, index) => (
                        event.EventStatus === "Comprar ya" ? (
                            <div key={index} className="md:ml-[9rem] mb-4 flex-col">
                                {user && user.role === 'admin' && (

                                    <div className="px-3 py-2 text-right text-xs leading-4 mr-0 md:mr-[12rem] ">
                                        <button onClick={() => handleEditEvent(event)} className="group relative text-sm px-4 py-2 text-white rounded-2xl bg-[#ba36ba]  bg-gradient-to-r from-[#9340FF] to-[#FF3C5F]">
                                            Editar Eventos
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                        </button>
                                    </div>
                                )}
                                <div className='my-4'>
                                    <h1 className="text-2xl md:text-4xl text-white font-semibold">{event.EventName}</h1>
                                    <div className="text-white mt-2">{event.EvenetDate}</div>
                                </div>

                                <img src={event.EventImage} className='w-full md:w-[85%]' />
                                <div>

                                    <button onClick={(e) => handleOpenCompras(e, event)} className="ml-3 group relative h-12 w-48 overflow-hidden rounded-xl bg-[#ba36ba] text-lg font-bold text-white my-4 bg-gradient-to-r from-[#9340FF] to-[#FF3C5F w-[200px]">
                                        Compra ya!
                                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                    </button>

                                </div>
                            </div>
                        ) : (
                            event.EventStatus === "Reservar" && (
                                <div key={index} className="md:ml-[9rem] mb-4 flex-col">
                                    {user && user.role === 'admin' && (

                                        <div className="px-3 py-2 text-right text-xs leading-4 mr-0 md:mr-[12rem] ">
                                            <button onClick={() => handleEditEvent(event)} className="group relative text-sm px-4 py-2 text-white rounded-2xl bg-[#ba36ba]  bg-gradient-to-r from-[#9340FF] to-[#FF3C5F]">
                                                Editar Eventos
                                                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </button>
                                        </div>
                                    )}
                                    <div className='my-4'>
                                        <h1 className="text-2xl md:text-4xl text-white font-semibold">{event.EventName}</h1>
                                        <div className="text-white mt-2">{event.EvenetDate}</div>
                                    </div>
                                    <img src={event.EventImage} className='w-full md:w-[85%]' />
                                    <div>

                                        <button onClick={(e) => handleOpenReservar(e, event)} className="group relative h-12 w-48 overflow-hidden rounded-xl bg-[#3d36ba] text-lg font-bold text-white my-4">

                                            Reservar ahora!
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                        </button>
                                    </div>
                                </div>
                            )
                        )
                    ))}



                </div>
            </div>

        </>

    )
}


export default tickets