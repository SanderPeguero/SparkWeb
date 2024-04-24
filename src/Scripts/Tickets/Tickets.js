import { getFirestore} from "firebase/firestore";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";

export const getPurchase = async (setTickets2) => {
    const db = getFirestore()
    try {
        const ref = collection(db, 'Purchase');

        const docsSnap = await getDocs(ref);


        const eventos = [];
        docsSnap.forEach(doc => {

            const data = doc.data();
            const eventId = doc.id; 
            data.eventId = eventId; 
            eventos.push(data);
        });
        setTickets2(eventos)

    } catch (error) {
        console.error("Error al obtener los datos de la colección 'events':", error);
    }
};

export const UpdateName = async (newName, idDoc) => {
    const db = getFirestore();
    try {

        console.log("Change: " + idDoc)
        const eventRef = doc(db, 'Purchase', idDoc);
        await updateDoc(eventRef, {
            'nameOfCustomer.customerDetails.name': newName
        });

        console.log('Estado del pago actualizado exitosamente.');

    } catch (error) {
        console.error('Error al actualizar el estado del pago:', error);
    }
}
