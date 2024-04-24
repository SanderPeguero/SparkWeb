import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { UpdateName } from '../../Scripts/Tickets/Tickets';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#090520',
  borderRadius: '1rem',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ ticket, open, onClose, setloadStatus }) {

  const db = getFirestore()
  const [code, setcode] = useState('')
  const [Name, setName] = useState('')
  const [Paid, setPaid] = useState('')
  const [Price, setPrice] = useState('')
  const [Discount, setDiscount] = useState(0)

  useEffect(() => {
    if (ticket) {
      setcode(ticket.nameOfCustomer.eventDetails.ticketCode.TicketNumber)
      setName(ticket.nameOfCustomer?.customerDetails?.name)
      setPaid(ticket.nameOfCustomer?.paymentDetails?.paymentStatus)
      setPrice(ticket.nameOfCustomer?.eventDetails?.ticketPrice)
    }





  }, [ticket])

  const set = (e) => {
    e.preventDefault()
    UpdateName(Name, ticket.eventId)
    setloadStatus(true)
    setcode('')
    setName('')
    setPaid('')
    setPrice('')
    setDiscount(0)
    onClose()

  }

  const handleClose = () => {
    setcode('')
    setName('')
    setPaid('')
    setPrice('')
    setDiscount(0)
    onClose()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex justify-between items-center px-4'>
            <h1 className='text-white text-2xl font-bold mt-4 ml-4'></h1>
            <button
              onClick={() => handleClose()}
              className='text-gray-500 hover:text-red-700 focus:outline-none'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

          </div>
          <form className="mt-8">
            <label
              htmlFor="fName"
              className="mb-3 block text-base font-medium text-[#ffffff]"
            >
              {/* {ticket.key} */}
            </label>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="fName"
                    className="mb-3 block text-base font-medium text-[#ffffff]"
                  >
                    Ticket ID
                  </label>
                  <input
                    readOnly
                    type="text"
                    name="Code"
                    defaultValue={code}
                    id="Code"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />

                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="Name"
                    className="mb-3 block text-base font-medium text-[#ffffff]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="Nombre"
                    defaultValue={Name}
                    id="Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setName(e.target.value)} // Aquí está el onChange
                  />

                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/3">
                <div className="mb-5">
                  <label
                    htmlFor="date"
                    className="mb-3 block text-base font-medium text-[#ffffff]"
                  >
                    Paid
                  </label>
                  <input
                    readOnly
                    type="text"
                    name="date"
                    defaultValue={Paid}
                    id="date"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  // onChange={(e) => setPaid(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/3">
                <div className="mb-5">
                  <label
                    htmlFor="number"
                    className="mb-3 block text-base font-medium text-[#ffffff]"
                  >
                    Price
                  </label>
                  <input
                    readOnly
                    type="tel"
                    name="number"
                    defaultValue={Price}
                    id="number"
                    // placeholder="809-000-0000"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  // onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/3">
                <div className="mb-5">
                  <label
                    htmlFor="number"
                    className="mb-3 block text-base font-medium text-[#ffffff]"
                  >
                    Discount
                  </label>
                  <input
                    readOnly
                    type="tel"
                    name="number"
                    defaultValue={Discount}
                    id="number"
                    // placeholder="809-000-0000"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="date"
                    className="mb-3 block text-base font-medium text-[#ffffff]"
                  >
                    dateOfPurchase
                  </label>
                  <input
                    readOnly
                    type="text"
                    name="date"
                    // value={ticket.dateOfPurchase}
                    id="date"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  // onChange={(e) => setemail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="number"
                    className="mb-3 block text-base font-medium text-[#ffffff]"
                  >
                    submitDate
                  </label>
                  <input
                    readOnly
                    type="text"
                    name="number"
                    // value={ticket.submitDate.toDate().toDateString()}
                    id="number"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

              </div>


            </div>
            <div className=''>
              <button
                onClick={(e) => set(e)}
                className="group relative h-12 w-1/2 md:w-24 overflow-hidden rounded-xl bg-purple-500 text-lg font-bold text-white">
                Save
                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}