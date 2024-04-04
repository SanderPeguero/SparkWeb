import React from 'react'

const EmailConfirmation = ({ StatusTicket }) => {


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


    return (
        <div className='fixed  inset-0 flex items-center justify-center z-50 mx-8 sm:mx-0 min-h-screen w-full backdrop-blur-md'>
            <div className='flex justify-center items-center mt-8'>
                <div className=' bg-white h-full w-[35rem] mx-8 text-black'>
                    <div className='mb-4'>
                        <h2 className="text-center  font-bold pt-8">Confirmation of Ticket Purchase for {StatusTicket?.nameOfCustomer.eventDetails.eventName}</h2>
                    </div>
                    <div className='m-4'>
                        <p>Dear  {StatusTicket?.nameOfCustomer.customerDetails.name},</p>
                    </div>
                    <div className='m-4'>
                        We are thrilled to confirm your ticket purchase for the upcoming {StatusTicket?.nameOfCustomer.eventDetails.eventName}!
                        Your attendance means a lot to us, and we can't wait to have you join us.
                    </div>
                    <div className='m-4'>
                        <div className='mb-2'>
                            Event Details:
                        </div>
                        <div>
                            Event Name: {StatusTicket?.nameOfCustomer.eventDetails.eventName} <br />
                            Event Date: {formattedEventDate}<br />
                            Ticket Price: {StatusTicket?.nameOfCustomer.eventDetails.ticketPrice}
                            <div className='bg-black text-white text-center w-full my-4 py-2'>
                                {StatusTicket?.nameOfCustomer.eventDetails.ticketCode}
                            </div>

                        </div>
                        <div>
                            Please keep the following unique ticket code handy for any
                            future references or inquiries regarding your ticket:<span className='font-bold'> {StatusTicket?.nameOfCustomer.eventDetails.ticketCode}.</span>  <br /><br />
                            If you have any questions or need further assistance, feel free to reply to this email, and we'll be happy to help. <br /><br />
                            Thank you once again for choosing to be a part of  {StatusTicket?.nameOfCustomer.eventDetails.eventName}. We look forward to seeing you there! <br /> <br />
                            Warm regards, <span className='font-bold'>Grupo Spark</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default EmailConfirmation