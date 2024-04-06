import { ref as refImg, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'
import { collection, addDoc, getDocs, doc, query, where, updateDoc, orderBy } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';

export const EditImageHero1 = async (fileImg, id, setListImages) => {

    const db = getFirestore();

    const storage = getStorage();

    try {
         const querySnapshot = await getDocs(query(collection(db, 'Hero1Img'), where('Id', '==', id)))

         querySnapshot.forEach(async (docSnapshot) => {

             const docRef = doc(db, "Hero1Img", docSnapshot.id)

             const storageRef = refImg(storage, 'Hero1Img/' + fileImg.name)

             await uploadBytes(storageRef, fileImg)

             const url = await getDownloadURL(storageRef)
             
             await updateDoc(docRef, { Url: url })

             obtenerTodasLasImagenes(setListImages)
         });

    } catch (error) {

    }
}

export const DeleteImageHero1 = async ( id, setListImages) => {

    const db = getFirestore();

    try {
         const querySnapshot = await getDocs(query(collection(db, 'Hero1Img'), where('Id', '==', id)))

         querySnapshot.forEach(async (docSnapshot) => {

             const docRef = doc(db, "Hero1Img", docSnapshot.id)
             
             await updateDoc(docRef, { Url: null })

             obtenerTodasLasImagenes(setListImages)

         });

    } catch (error) {

    }
}

export const UploadFile = async (fileImg, id) => {

    const db = getFirestore()

    const storage = getStorage()

    try {

        const storageRef = refImg(storage, 'Hero1Img/' + fileImg.name)

        await uploadBytes(storageRef, fileImg)

        const url = await getDownloadURL(storageRef)
        const data = {
            Id: id,
            Url: url
        }
        const docRef = await addDoc(collection(db, "Hero1Img"), data)


    } catch (error) {

    }
}

export const SaveTextHero1 = async (Text) => {

    const db = getFirestore()

    const storage = getStorage()

    try {

        const data = {
            Text: Text
        }
        const docRef = await addDoc(collection(db, "Hero1Text"), data)


    } catch (error) {

    }
}

export const EditarText = async (Text, setTextHero) => {

    const db = getFirestore()
console.log(Text)
    try {

        const ref = collection(db, 'Hero1Text');
        const docsSnap = await getDocs(ref);
        if (docsSnap.empty) {
            console.log('No hay documentos en la colección "Hero1Text"');
            return;
        }

        const firstDoc = docsSnap.docs[0];
        const docRef = doc(db, 'Hero1Text', firstDoc.id);

        await updateDoc(docRef, { Text: Text });
        
        obtenerText(setTextHero)

    } catch (error) {

    }
};

export const obtenerText = async (setTextHero) => {

    const db = getFirestore()

    try {

        const ref = collection(db, 'Hero1Text');

        const docsSnap = await getDocs(ref);


        const Text = [];
        docsSnap.forEach(doc => {

            const data = doc.data();
            Text.push(data);
        });
        setTextHero(Text[0].Text)

    } catch (error) {

    }
};

export const obtenerTodasLasImagenes = async (setListImages) => {

    const db = getFirestore()

    try {

        const ref = collection(db, 'Hero1Img');

        const querySnapshot = await getDocs(query(ref, orderBy('Id')));

        const images = [];

        querySnapshot.forEach(doc => {

            const data = doc.data();

            images.push(data);
        })

        setListImages(images)

    } catch (error) {

    }
};
