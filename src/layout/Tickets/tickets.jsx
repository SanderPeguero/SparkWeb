import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ticket from '../../assets/TicketMania.png'
import ticket2 from '../../assets/Ticket2003.png'
import ReserveTicket from './reserveTicket';
import { ContextVariable } from '../../Context';
import Purchase from './purchase';

function tickets() {

    const { user, reserveTicket, setlocattion, auth, setreserveTicket, comprarTicket, setcomprarTicket, isOpenLogIn, setIsOpenLogIn } = useContext(ContextVariable)

    const [isAuthOpenReserva, setIsAuthOpenReserva] = useState(false)
    const [isAuthOpenCompras, setIsAuthOpenCompras] = useState(false)
    const navigate = useNavigate()

    const handleOpenReservar = (e) => {
        e.preventDefault()
        if (auth === null) {
            setIsOpenLogIn(true)
            setIsAuthOpenReserva(true)
        } else {
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

    const handleOpenCompras = (e) => {
        e.preventDefault()
        if (auth === null) {
            setIsOpenLogIn(true)
            setIsAuthOpenCompras(true)
        }
        else {
            setlocattion(`${user.role === 'admin' ? '/admin/comprar' : '/comprar'}`)
            navigate(`${user.role === 'admin' ? '/admin/comprar' : '/comprar'}`)
        }
    }

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

    return (
        <>
            <div className="flex bg-[#3d36ba0a] shadow-lg rounded-lg mx-4 md:mx-auto mb-[8rem]">
                <div className="flex flex-col items-start px-4 py-6">
                    <div className="md:ml-[9rem] mb-4 flex-col">
                        <div className='my-4'>
                            <h1 className="text-2xl md:text-4xl text-white font-semibold">Sparkle Mania</h1>
                            <div className="text-white mt-2">21/10/23</div>
                        </div>
                        <img src={ticket} className='w-full md:w-[85%]' />
                        <div>

                            <button onClick={(e) => handleOpenCompras(e)} className="ml-3 group relative h-12 w-48 overflow-hidden rounded-xl bg-[#ba36ba] text-lg font-bold text-white my-4 bg-gradient-to-r from-[#9340FF] to-[#FF3C5F w-[200px]">
                                Compra ya!
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </button>

                        </div>
                    </div>
                    <div className="md:ml-[9rem] mb-4 flex-col">
                        <div className='my-4'>
                            <h1 className="text-2xl md:text-4xl text-white font-semibold">2003</h1>
                            <div className="text-white mt-2">23/12/23</div>
                        </div>
                        <img src={ticket2} className='w-full md:w-[85%]' />
                        <div>

                            <button onClick={(e) => handleOpenReservar(e)} className="group relative h-12 w-48 overflow-hidden rounded-xl bg-[#3d36ba] text-lg font-bold text-white my-4">

                                Reservar ahora!
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}


export default tickets