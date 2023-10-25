import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { doc, updateDoc, getFirestore } from "firebase/firestore";

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

export default function BasicModal({ ticket, open, onClose }) {

  const db = getFirestore()

  if (ticket) {

    const ticketRef = doc(db, "Tickets", ticket.key);

    // console.log(ticket)

    const set = async () => {
      await updateDoc(ticketRef, {
        capital: true
      })
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
            <form onSubmit={set} className="mt-8">
              <label
                htmlFor="fName"
                className="mb-3 block text-base font-medium text-[#ffffff]"
              >
                {ticket.key}
                <br/>
                {ticket.paid == 'true' ? <span className="bg-green-400 text-gray-50 rounded-md px-2">Paid</span> : null}
                {ticket.paid == 'pending' ? <span className="bg-yellow-400 text-gray-50  rounded-md px-2">Pending</span> : null}
                {ticket.paid == 'false' ? <span className="bg-red-400 text-gray-50 rounded-md px-2">Unpaid</span> : null}
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
                      name="Nombre"
                      value={ticket.ticketId}
                      id="fName"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="fName"
                      className="mb-3 block text-base font-medium text-[#ffffff]"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="Nombre"
                      value={ticket.name}
                      id="fName"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={(e) => setname(e.target.value)}
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
                      type="text"
                      name="date"
                      value={ticket.paid}
                      id="date"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={(e) => setemail(e.target.value)}
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
                      type="tel"
                      name="number"
                      value={ticket.price}
                      id="number"
                      // placeholder="809-000-0000"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={(e) => setnumber(e.target.value)}
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
                      type="tel"
                      name="number"
                      value={ticket.discount}
                      id="number"
                      // placeholder="809-000-0000"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={(e) => setnumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3">
                  <div className="mb-5">
                    <label
                      htmlFor="number"
                      className="mb-3 block text-base font-medium text-[#ffffff]"
                    >
                      Activation Date
                    </label>
                    <input
                      readOnly
                      type="text"
                      name="number"
                      value={ticket.activationDate.toDate().toDateString()}
                      id="number"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    )
  } else {
    return
  }
}