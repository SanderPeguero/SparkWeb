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
                        <h2 className="text-center  font-bold pt-8">Confirmación de la compra de entradas para: {StatusTicket?.nameOfCustomer.eventDetails.eventName}</h2>
                    </div>
                    <div className='m-4'>
                        <p>Estimad@:  {StatusTicket?.nameOfCustomer.customerDetails.name},</p>
                    </div>
                    <div className='m-4'>
                        Estamos encantados de confirmar la compra de su entrada para el próximo {StatusTicket?.nameOfCustomer.eventDetails.eventName}!
                        Su asistencia significa mucho para nosotros, y estamos ansiosos por que se una a nosotros.
                    </div>
                    <div className='m-4'>
                        <div className='mb-2'>
                            Detalles del evento:
                        </div>
                        <div>
                            Nombre del evento: {StatusTicket?.nameOfCustomer.eventDetails.eventName} <br />
                            Fecha del evento: {formattedEventDate}<br />
                            Precio de la entrada: {StatusTicket?.nameOfCustomer.eventDetails.ticketPrice}
                            <div className='bg-black text-white text-center w-full my-4 py-2'>
                                {StatusTicket?.nameOfCustomer.eventDetails.ticketCode}
                            </div>

                        </div>
                        <div>
                            Tenga a mano el siguiente código de entrada único para cualquier
                            Futuras referencias o consultas sobre su boleto:<span className='font-bold'> {StatusTicket?.nameOfCustomer.eventDetails.ticketCode}.</span>  <br /><br />
                            Si tiene alguna pregunta o necesita más ayuda, no dude en responder a este correo electrónico y estaremos encantados de ayudarle. <br /><br />
                            Gracias una vez más por elegir ser parte de  {StatusTicket?.nameOfCustomer.eventDetails.eventName}. ¡Te esperamos! <br /> <br />
                            Saludos cordiales, <span className='font-bold'>Grupo Spark</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default EmailConfirmation