import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import { EditarStatusTickets } from "../Evento/Evento";

export const SaveReservar = async (data, setalert, alert, Iddoc, setListEvents) => {
    const db = getFirestore();
    console.log(data.Tickets);
    data.TicketNumber.Status = "Reserved"
    data.Tickets.forEach(ticket => {
        ticket.Status = "Reserved"
      
    });

    // Verificar si 'data' tiene un valor para el campo 'Name'
    if (data && data.Name) {
        try {
            const docRef = await addDoc(collection(db, "Reservar"), data);
            console.log("Documento agregado con éxito:", docRef.id);

            if (EditarStatusTickets(data.Tickets, Iddoc, setListEvents)) {
                setalert({
                    ...alert,
                    open: true,
                    message: `Reservar realizada`,
                    severity: 'success'
                });
            } else {
                setalert({
                    ...alert,
                    open: true,
                    message: `Reservar no realizada`,
                    severity: 'error'
                });
            }

        } catch (error) {
            console.error("Error al agregar documento:", error);

        }
    } else {
        console.error("El campo 'Name' en 'data' es undefined o null.");
        setalert({
            ...alert,
            open: true,
            message: `Reservar no realizada`,
            severity: 'error'
        });
    }
}

export const GetReservedList = async (setListReservar) => {
    const db = getFirestore();
    try {
        const querySnapshot = await getDocs(collection(db, "Reservar"));
        const reservedList = [];
        querySnapshot.forEach((doc) => {
            reservedList.push({
                id: doc.id,
                data: doc.data()
            });
        });

        return setListReservar(reservedList)
    } catch (error) {
        console.error("Error al obtener la lista de reservas:", error);
        return [];
    }
}
