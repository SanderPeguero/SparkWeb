// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfVE-mnNIFggp-z0ZpFqxwnwP_GuGJXO4",
  authDomain: "sparkgroup-506bf.firebaseapp.com",
  databaseURL: "https://sparkgroup-506bf-default-rtdb.firebaseio.com",
  projectId: "sparkgroup-506bf",
  storageBucket: "sparkgroup-506bf.appspot.com",
  messagingSenderId: "500296261817",
  appId: "1:500296261817:web:3c1295f04a74f9d2747b68",
  measurementId: "G-EK1C1Q3KK0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const tickets = [
    { 'ticketId': '00001', 'name': 'TEST PRUEBA', 'paid': 'false', 'price': 1000.00, 'discount': null, 'seller': 'Sander Peguero' },
]

console.log("Iniciando...")

tickets.forEach(async (ticket) => {
    try {
        const docRef = await addDoc(collection(db, "Tickets"), {
            ticketId: ticket.ticketId,
            name: ticket.name,
            paid: ticket.paid,
            price: ticket.price,
            discount: ticket.discount,
            seller: ticket.seller,
            dateOfPurchase: '',
            submitDate: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})

