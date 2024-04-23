import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";

export const SaveReservar = async (data) => {
    const db = getFirestore();
    console.log(data);

    // Verificar si 'data' tiene un valor para el campo 'Name'
    if (data && data.Name) {
        try {
            const docRef = await addDoc(collection(db, "Reservar"), data);
            console.log("Documento agregado con éxito:", docRef.id);
        } catch (error) {
            console.error("Error al agregar documento:", error);
        }
    } else {
        console.error("El campo 'Name' en 'data' es undefined o null.");
    }
}

export const GetReservedList = async (setListReserved) => {
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
        return setListReserved(reservedList)
    } catch (error) {
        console.error("Error al obtener la lista de reservas:", error);
        return [];
    }
}
