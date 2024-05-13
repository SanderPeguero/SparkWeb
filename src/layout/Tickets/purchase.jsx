import { useState, useContext, useEffect } from 'react'
import { ContextVariable } from '../../Context';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SparkleMania from "../../assets/TicketMania.png"
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { EditarStatusTickets } from '../../Scripts/Evento/Evento';

function Purchase({ event }) {

  const { alert, setalert, user, setlocattion, dataComprar, setListEvents } = useContext(ContextVariable)
  const Location = useLocation()
  const navigate = useNavigate()
  const [Email, setEmail] = useState('')
  const [number, setnumber] = useState('')
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Transfer', label: 'Transfer' },
  ];



  useEffect(() => {

    console.log(dataComprar)
  }, [])


  function generateTicket() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ticketLength = 5

    let ticket = '';
    for (let i = 0; i < ticketLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      ticket += characters[randomIndex];
    }

    return ticket;
  }


  useEffect(() => {
    if (user) {
      setEmail(user?.email)
      setnumber(user?.phone)
    }
  }, [user])

  const [load, setLoad] = useState(false)
  function SeleccionarTickets(CantidadTickets) {
    const ticketsDisponibles = [];
    let ticketsSeleccionados = 0;
    let ticketSeleccionado = null; // Inicializamos como null

    dataComprar.Tickets.forEach(ticket => {
      if (ticket.Status === "Disponible" && ticketsSeleccionados < CantidadTickets) {

        if (CantidadTickets === 1) {
          ticketSeleccionado = ticket;
          return;
        } else {
          ticketsDisponibles.push(ticket);
          ticketsSeleccionados++;
        }
      }
    });
    if (ticketSeleccionado !== null) {
      return ticketSeleccionado;
    }

    return ticketsDisponibles;
  }


  useEffect(() => {
    if (dataComprar) {
      setLoad(true)
      setEventName(dataComprar.EventName)
      // const eventDateStr = "21/10/23";
      // const [day, month, year] = eventDateStr.split('/');
      // const eventDate = new Date(`20${year}`, month - 1, day);
      setEventDate(dataComprar.EvenetDate)
      setCustomerName(user?.name)
      setTicketPrice(dataComprar.PriceTickets)
      setTicketQuantity(1)
      const ticket = SeleccionarTickets(1);
      setTicketCode(ticket)
      setCustomerEmail(Email)
      setCustomerPhoneNumber(user?.phone)
      setPaymentMethod(selectedOption)
      setPaymentStatus('Pending')
    }

  }, [selectedOption, Email, dataComprar])

  useEffect(() => {
    const eventData = {
      nameOfCustomer: {
        eventDetails: {
          eventName: eventName,
          eventDate: eventDate,
          ticketPrice: ticketPrice,
          ticketQuantity: ticketQuantity,
          ticketCode: ticketCode
        },
        customerDetails: {
          name: customerName,
          email: customerEmail,
          phoneNumber: customerPhoneNumber
        },
        paymentDetails: {
          paymentMethod: selectedOption,
          paymentStatus: paymentStatus
        }
      }
    };

    localStorage.setItem("purchase", JSON.stringify(eventData));
  }, [load === true, selectedOption])

  const handleEditEmail = () => {
    const newEmail = prompt('Edit Email:', Email);
    if (newEmail !== null) {
      setEmail(newEmail);
    }
  }

  const handleEditPhone = () => {
    const newPhone = prompt('Edit Phone:', number);
    if (newPhone !== null) {
      setnumber(newPhone);
    }
  }

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState('');
  const [ticketCode, setTicketCode] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const db = getFirestore()
  const purchaseStart = async (e) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("purchase"));

    if (
      data &&
      data.nameOfCustomer &&
      data.nameOfCustomer.eventDetails &&
      data.nameOfCustomer.customerDetails &&
      data.nameOfCustomer.paymentDetails &&
      data.nameOfCustomer.eventDetails.eventName &&
      data.nameOfCustomer.eventDetails.eventDate &&
      data.nameOfCustomer.eventDetails.ticketPrice &&
      data.nameOfCustomer.eventDetails.ticketQuantity &&
      data.nameOfCustomer.eventDetails.ticketCode &&
      data.nameOfCustomer.customerDetails.name &&
      data.nameOfCustomer.customerDetails.email &&
      data.nameOfCustomer.customerDetails.phoneNumber &&
      data.nameOfCustomer.paymentDetails.paymentMethod &&
      data.nameOfCustomer.paymentDetails.paymentStatus
    ) {
      try {
        const docRef = await addDoc(collection(db, "Purchase"), data);
        console.log("Document written with ID: ", docRef.id);
        // ListTickets, idDoc, setListEvents
        if (EditarStatusTickets(data.nameOfCustomer.eventDetails.ticketCode, dataComprar.Iddoc, setListEvents)) {
          localStorage.clear();
          setalert({
            ...alert,
            open: true,
            message: `Tu compra se ha hecho correctamente`,
            severity: 'success'
          });
          setlocattion(`${user.role === 'admin' ? '/admin/boletas' : '/boletas'}`)
          navigate(`${user.role === 'admin' ? '/admin/boletas' : '/boletas'}`)
          openWhatsAppGroup();
        } else {
          setalert({
            ...alert,
            open: true,
            message: `Tu compra no se ha podido hacer en este momento`,
            severity: 'error'
          });
        }



      } catch (error) {
        console.error("Error adding document: ", error);
        setalert({
          ...alert,
          open: true,
          message: `Tu compra no se ha podido hacer en este momento`,
          severity: 'error'
        });
      }
    } else {
      setalert({
        ...alert,
        open: true,
        message: `Por favor, asegúrate de llenar todos los campos antes de realizar la compra.`,
        severity: 'error'
      });
    }
  };

  const openWhatsAppGroup = () => {
    if (selectedOption === "Cash") {

      const message = `Hello! I'm currently on your website and I'm interested in purchasing a ticket for the
      ${event} event. I've chosen to pay in ${selectedOption}. Could you please assist me with the purchase process? Thank you!`;
      const encodedMessage = encodeURIComponent(message);
      console.log(encodedMessage)
      window.location.href = `https://wa.me/message/EH45EKR7CQL6H1?text=${encodedMessage}`;

    } else if (selectedOption === "Transfer") {

      const message = `Hi there! I'm currently on your website and I'm interested in purchasing a ticket for the ${event}event. 
      I've chosen to pay via bank wire ${selectedOption}. Could you please provide me with the necessary routing numbers for the company's bank account?`;
      const encodedMessage = encodeURIComponent(message);
      console.log(encodedMessage)
      window.location.href = `https://wa.me/message/EH45EKR7CQL6H1?text=${encodedMessage}`;

    }
  };

  const BackRoute = () => {
    setlocattion(`${user.role === 'admin' ? '/admin/boletas' : '/boletas'}`)
    navigate(`${user.role === 'admin' ? '/admin/boletas' : '/boletas'}`)
  }

  return (
    <>
      <div onClick={() => BackRoute()} className='ml-8 text-white flex flex-row'><div className='hover:underline cursor-pointer'>Boletas</div>{Location.pathname}</div>
      <div className="px-4 mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="flex flex-col items-center  w-full mb-8 lg:flex-row">
          <div className=" md:mb-15 lg:mb-0 lg:max-w-lg lg:pr-5" >
            <div className="max-w-xl mr-lg">
              <h2 className="font-sans text-3xl sm:mt-0 mt-6 font-medium tracking-tight text-purple-500 sm:text-4xl sm:leading-none max-w-lg mb-3">
                Hey Keyla <span className="text-gray-400 text-[1rem]">Únete a la chispa!</span>
              </h2>
              <div className="text-white mt-10">
                Para empezar: <br /><br />
                1. Confirmar el correo <br />
                2. Entrar al chat <br />
                3. Comprar la boleta <br />
                esperar la confirmación en el correo <br />
              </div>

              <form className='mt-8 '>

                <div className="-mx-3 flex flex-wrap">
                  <div className="flex w-full flex-col lg:flex-row ">
                    <div className="mb-4" onClick={handleEditEmail}>
                      <label
                        htmlFor="fName"
                        className="mb-3 block text-base font-medium text-[#ffffff]"
                      >
                        Email
                      </label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={Email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder='email@email.com'
                        className="rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>



                    {/* <div className="mb-4" onClick={handleEditPhone}>
                      <label
                        htmlFor="time"
                        className="w-[10rem] mb-3 block text-base font-medium text-[#ffffff]"
                      >
                        Número de Teléfono
                      </label>
                      <input
                        onChange={(e) => setnumber(e.target.value)}
                        value={number}
                        type="text"
                        name="number"
                        id="number"
                        className="rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div> */}

                    {/* <div>
                      <div className="">
                        <label
                          className="w-[10rem] mb-3 block text-base font-medium text-[#ffffff]"
                        >
                          Payment type
                        </label>
                        <select
                          name="title"
                          value={selectedOption}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="rounded-md border border-[#e0e0e0] bg-white py-3 px-3 w-[13.5rem] text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

                        >
                          <option className='' value="" disabled>Payment option</option>
                          {options.map((option) => (
                            <option className='text-black' key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div> */}


                    {/*   space-x-4  */}

                   
                    <div className='mx-6 mt-11 mb-6 lg:ml-[29rem] '>
                      <button onClick={purchaseStart} className="group relative  h-12 w-full md:w-48 overflow-hidden rounded-xl bg-purple-500 text-lg font-bold text-white">
                        Comprar
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                      </button>
                    </div>
                    

                  </div>
                </div>
              </form>
            </div>

            {/* <div className='space-x-4 mt-4 mb-4 '>
              <button onClick={purchaseStart} className="group relative h-12 w-full md:w-48 overflow-hidden rounded-xl bg-purple-500 text-lg font-bold text-white">
                Comprar
                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
              </button>
            </div> */}

          </div>
        </div>
        <img className='-my-20 w-full md:w-[70%]' src={dataComprar?.EventImage} />
      </div>

    </>

  )
}

export default Purchase
