import { getFirestore, addDoc, collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref as refImg, uploadBytes, getDownloadURL } from "firebase/storage";

export const SaveEvent = async (data) => {
    const db = getFirestore()
    const storage = getStorage()
    if (data) {
        try {
            const storageRef = refImg(storage, 'Eventos/' + data.EventImage.name)
            await uploadBytes(storageRef, data.EventImage)
            const url = await getDownloadURL(storageRef)
            data.EventImage = url
            const docRef = await addDoc(collection(db, "Eventos"), data)
            console.log("Guardado")
        } catch (error) {
            console.log(error)
        }
    } else {
    }
}

export const ListEvent = async (setListEvents) => {
    const db = getFirestore()

    try {
        const querySnapshot = await getDocs(collection(db, 'Eventos'))
        const Events = []

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const Iddoc = doc.id;
            data.Iddoc = Iddoc;
            Events.push(data);
        })

        setListEvents(Events)

    } catch (error) {
        console.log(error)
    }
}

export const EventEditar = async (data, idDoc, setListEvents) => {
    const db = getFirestore();
    const storage = getStorage()
    try {
        const storageRef = refImg(storage, 'Eventos/' + data.EventImage.name)
        await uploadBytes(storageRef, data.EventImage)
        const url = await getDownloadURL(storageRef)
        data.EventImage = url
        const docRef = doc(db, 'Eventos', idDoc)
        await updateDoc(docRef, data);
        console.log('Documento actualizado correctamente.');
        ListEvent(setListEvents)
        return true;
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
        return false;
    }
}

export const EditarStatusTickets = async (ListTickets, idDoc, setListEvents) => {
    const db = getFirestore();
    try {
        console.log(idDoc)
        console.log(ListTickets)
        const docRef = doc(db, 'Eventos', idDoc);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const eventData = docSnap.data();
            const ticketsArray = Array.isArray(ListTickets) ? ListTickets : [ListTickets];
            eventData.Tickets.map((ticket) => {

                ticketsArray.map((ticketList, i) => {
                    if (ticket.IdTickets === ticketList.IdTickets) {
                        console.log("Cuantas veces")
                        if (ticketList.Status === "Disponible") {
                            ticketList.Status = "Comprado"
                            ticket.Status = ticketList.Status
                        } else {
                            ticket.Status = ticketList.Status
                        }

                    }
                })

            })
            console.log(eventData.Tickets)
            await updateDoc(docRef, {
                Tickets: eventData.Tickets
            });
            console.log('Documento actualizado correctamente.');
            ListEvent(setListEvents)
        } else {
            console.log('El documento no existe.');
        }
        return true;
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
        return false;
    }
}
