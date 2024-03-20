import { useState, useContext, useEffect } from 'react'
import { ContextVariable } from '../../Context';
import SparkleMania from "../../assets/TicketMania.png"

// Import the functions you need from the SDKs you need
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
// import { ref, onValue } from 'firebase/database'
// import { db } from '../../firebase/firebase'
import { getFirestore } from 'firebase/firestore';



function Purchase({ event }) {

  const { alert, setalert, user } = useContext(ContextVariable)

  const [Email, setEmail] = useState('')
  const [number, setnumber] = useState('')
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  function generateTicket() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Caracteres permitidos
    const ticketLength = 5; // Longitud del ticket

    let ticket = '';
    for (let i = 0; i < ticketLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      ticket += characters[randomIndex];
    }

    return ticket;
  }


  useEffect(() => {
    if (user) {
      console.log(user)
      setEmail(user?.email)
      setnumber(user?.phone)


    }
  }, [user])

  const [load, setLoad] = useState(false)
  useEffect(() => {
    console.log("Datos de cargar")
    setLoad(true)
    setEventName(event)
    const eventDateStr = "21/10/23";
    const [day, month, year] = eventDateStr.split('/');
    const eventDate = new Date(`20${year}`, month - 1, day);
    setEventDate(eventDate)
    setCustomerName(user?.name)
    setTicketPrice(400)
    setTicketQuantity(1)
    const ticket = generateTicket();
    setTicketCode(ticket)
    setCustomerEmail(user?.email)
    setCustomerPhoneNumber(user?.phone)
    setPaymentMethod("efectivo")
    setPaymentStatus('Pending')
  }, [event, user])

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
          paymentMethod: paymentMethod,
          paymentStatus: paymentStatus
        }
      }
    };

    localStorage.setItem("purchase", JSON.stringify(eventData));
    console.log("Datos guardado en la base de datos")
    console.log(JSON.parse(localStorage.getItem("purchase")));
  }, [load === true])



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

  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Transfer', label: 'Transfer' },
  ];

  const db = getFirestore()
  const purchaseStart = async () => {
    const data = JSON.parse(localStorage.getItem("purchase"));
    console.log(data)

    try {
      const docRef = await addDoc(collection(db, "events"), data);
      console.log("Document written with ID: ", docRef.id);
      setalert({
        ...alert,
        open: true,
        message: `Tu compra se ha hecho correctamente`,
        severity: 'success'
      });
      openWhatsAppGroup()
    } catch (error) {
      console.error("Error adding document: ", error);
      setalert({
        ...alert,
        open: true,
        message: `Tu compra no se ha podido hacer en este momento`,
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

    }
  };



  return (
    <>
      <div className="px-4 mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="flex flex-col items-center  w-full mb-10 lg:flex-row">
          <div className="md:mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
            <div className="max-w-xl mr-8">
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
              <form className='mt-8'>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
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



                    <div className="mb-4" onClick={handleEditPhone}>
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
                    </div>
                    <div>
                      <div className=" ">
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
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='space-x-4 mt-8 mb-8'>
              <button onClick={purchaseStart} className="group relative h-12 w-full md:w-48 overflow-hidden rounded-xl bg-purple-500 text-lg font-bold text-white">
                Comprar
                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
              </button>
            </div>
          </div>
          <img className='w-full md:w-[70%]' src={SparkleMania} />
        </div>
      </div>

    </>

  )
}

export default Purchase


const InputMenu = ({ isOpenMenu, setIsOpenMenu }) => {

  return (
    <>

      {/* <>
      <button onClick={() => setIsOpenMenu(!isOpenMenu)} className="ml-3 group relative h-12 w-48 overflow-hidden rounded-xl bg-[#ba36ba] text-lg font-bold text-white my-4 bg-gradient-to-r from-[#9340FF] to-[#FF3C5F w-[200px]">
        Open Menu
        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
      </button>
      {isOpenMenu && (

        <ul
          role="menu"
          data-popover="menu"
          data-popover-placement="bottom"
          className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          <li
            role="menuitem"
            className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            Menu Item 1
          </li>
          <li
            role="menuitem"
            className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            Menu Item 2
          </li>
          <li
            role="menuitem"
            className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            Menu Item 3
          </li>
        </ul>
      )}


    </> */}
    </>
  )
}