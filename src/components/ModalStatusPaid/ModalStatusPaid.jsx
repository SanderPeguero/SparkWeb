import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { collection, updateDoc, doc, getFirestore } from 'firebase/firestore';
import EmailConfirmation from '../EmailConfirmation/EmailConfirmation';
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

const ModalStatusPaid = ({ open, onClose, StatusTicket, setloadStatus }) => {

    const [idDoc, setIdDoc] = useState(null)
    const [newStatusChange, setNewStatusChange] = useState('')
    const [OpenConfiEmail, setOpenConfiEmail] = useState(false)
    useEffect(() => {
        console.log("Id")
        console.log(StatusTicket?.eventId)
        setIdDoc(StatusTicket?.eventId)
    }, [StatusTicket])


    const db = getFirestore()
    const handleStatusChange = async (newStatus) => {
        setNewStatusChange(newStatus);
    };



    const handleStatusPayment = async () => {
        if (newStatusChange !== '' && idDoc !== null) {
            try {

                console.log("Change: " + idDoc)
                const eventRef = doc(db, 'Purchase', idDoc);
                await updateDoc(eventRef, {
                    'nameOfCustomer.paymentDetails.paymentStatus': newStatusChange
                });

                console.log('Estado del pago actualizado exitosamente.');
                setloadStatus(true)
                onClose(false)
                setOpenConfiEmail(true)
            } catch (error) {
                console.error('Error al actualizar el estado del pago:', error);
            }
        }

    }

    if (OpenConfiEmail) {
        if (newStatusChange === 'Paid') {
            console.log(StatusTicket)
            fetch('http://localhost:4500/send-email-confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: 'Acme <onboarding@resend.dev>',
                    to: [`${StatusTicket?.nameOfCustomer.customerDetails.email}`],
                    subject: `Confirmation of Ticket Purchase for ${StatusTicket?.nameOfCustomer.eventDetails.eventName}`,
                    html: generateHTML(StatusTicket),
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }
    }





    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='text-center text-white text-lg mb-3'>
                        {StatusTicket?.nameOfCustomer.eventDetails.ticketCode.TicketNumber}
                    </div>
                    <div className='text-center text-white  text-sm'>
                        {StatusTicket?.nameOfCustomer.customerDetails.name}
                    </div>
                    <div className='text-center text-white text-sm mb-6'>
                        {StatusTicket?.nameOfCustomer.customerDetails.email}
                    </div>

                    <div className='flex flex-row justify-center'>
                        <div className={`mr-2`}>
                            <button className={`overflow-hidden relative w-32 bg-red-400 text-white py-2 px-2 rounded-xl font-bold uppercase 
                            ${newStatusChange === 'Unpaid' ? ' border-2' : ""}
                            `}
                                onClick={() => handleStatusChange('Unpaid')}>
                                <span className="relative">Unpaid</span>
                            </button>
                        </div>

                        <div className='mx-2'>
                            <button className={`overflow-hidden relative w-32 bg-yellow-400 text-white py-2 px-2 rounded-xl font-bold uppercase
                               ${newStatusChange === 'Pending' ? ' border-2' : ""}
                            `}
                                onClick={() => handleStatusChange('Pending')}>
                                <span className="relative">Pending</span>
                            </button>
                        </div>

                        <div className='ml-2'>
                            <button className={`overflow-hidden relative w-32 bg-green-400 text-white py-2 px-2 rounded-xl font-bold uppercase
                               ${newStatusChange === 'Paid' ? ' border-2' : ""}
                            `}
                                onClick={() => handleStatusChange('Paid')}>
                                <span className="relative">Paid</span>
                            </button>
                        </div>
                    </div>

                    <div className='mt-8 flex items-center justify-center'>
                        <button className=" overflow-hidden relative w-32 bg-blue-600 text-white py-2 px-2 rounded-xl font-bold uppercase"
                            onClick={handleStatusPayment}>
                            <span className="relative">Save</span>
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalStatusPaid;


const generateHTML = (StatusTicket) => {

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    const formattedEventDate = formattedDate(StatusTicket?.nameOfCustomer.eventDetails.eventDate);

    return `
    <div class='fixed  inset-0 flex items-center justify-center z-50 mx-8 sm:mx-0 min-h-screen w-full backdrop-blur-md'>
    <div class='flex justify-center items-center mt-8'>
        <div class=' bg-white h-full w-[35rem] mx-8 text-black'>
            <div class='mb-4'>
                <h2 class="text-center  font-bold pt-8">Confirmación de la compra de entradas para: ${StatusTicket?.nameOfCustomer.eventDetails.eventName}</h2>
            </div>
            <div class='m-4'>
                <p>Estimad@:  ${StatusTicket?.nameOfCustomer.customerDetails.name},</p>
            </div>
            <div class='m-4'>
                Estamos encantados de confirmar la compra de su entrada para el próximo ${StatusTicket?.nameOfCustomer.eventDetails.eventName}!
                Su asistencia significa mucho para nosotros, y estamos ansiosos por que se una a nosotros.
            </div>
            <div class='m-4'>
                <div class='mb-2'>
                    Detalles del evento:
                </div>
                <div>
                    Nombre del evento: ${StatusTicket?.nameOfCustomer.eventDetails.eventName} <br />
                    Fecha del evento: ${formattedEventDate}<br />
                    Precio de la entrada: ${StatusTicket?.nameOfCustomer.eventDetails.ticketPrice}
                    <div class='bg-black text-white text-center w-full my-4 py-2'>
                        ${StatusTicket?.nameOfCustomer.eventDetails.ticketCode}
                    </div>

                </div>
                <div>
                    Tenga a mano el siguiente código de entrada único para cualquier
                    Futuras referencias o consultas sobre su boleto:<span class='font-bold'> ${StatusTicket?.nameOfCustomer.eventDetails.ticketCode}.</span>  <br /><br />
                    Si tiene alguna pregunta o necesita más ayuda, no dude en responder a este correo electrónico y estaremos encantados de ayudarle. <br /><br />
                    Gracias una vez más por elegir ser parte de  ${StatusTicket?.nameOfCustomer.eventDetails.eventName}. ¡Te esperamos! <br /> <br />
                    Saludos cordiales, <span class='font-bold'>Grupo Spark</span>
                </div>
            </div>
        </div>

    </div>

</div> 
    `;
};
