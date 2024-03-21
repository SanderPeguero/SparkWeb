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
                const eventRef = doc(db, 'events', idDoc);
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
            return (
                <EmailConfirmation StatusTicket={StatusTicket} />
            );
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
                        {StatusTicket?.nameOfCustomer.eventDetails.ticketCode}
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
