import { ref as refImg, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'
import { collection, addDoc, getDocs, doc, query, where, updateDoc, orderBy } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';

export const UploadFileAllImg = async (fileImg, id) => {

    const db = getFirestore()

    const storage = getStorage()

    try {

        const storageRef = refImg(storage, 'AllImg/' + fileImg.name)

        await uploadBytes(storageRef, fileImg)

        const url = await getDownloadURL(storageRef)
        const data = {
            Id: id,
            Url: url
        }
        const docRef = await addDoc(collection(db, "AllImg"), data)


    } catch (error) {

    }
}

export const EditImageAll = async (fileImg, id, setImages) => {

    const db = getFirestore();

    const storage = getStorage();

    try {
        const querySnapshot = await getDocs(query(collection(db, 'AllImg'), where('Id', '==', id)))

        querySnapshot.forEach(async (docSnapshot) => {

            const docRef = doc(db, "AllImg", docSnapshot.id)

            const storageRef = refImg(storage, 'AllImg/' + fileImg.name)

            await uploadBytes(storageRef, fileImg)

            const url = await getDownloadURL(storageRef)

            await updateDoc(docRef, { Url: url })

            obtenerTodasLasImgAll(setImages)
        });

    } catch (error) {

    }
}

export const AddCategoriesAllImag = async (categories, id) => {

    const db = getFirestore();

    const storage = getStorage();

    try {
        const querySnapshot = await getDocs(query(collection(db, 'AllImg'), where('Id', '==', id)))

        querySnapshot.forEach(async (docSnapshot) => {

            const docRef = doc(db, "AllImg", docSnapshot.id)

            await updateDoc(docRef, { Categories: categories })
        });

    } catch (error) {

    }
}

export const obtenerTodasLasImgAll = async (setImages) => {

    const db = getFirestore()

    try {

        const ref = collection(db, 'AllImg');

        const querySnapshot = await getDocs(query(ref, orderBy('Id')));

        const images = [];

        querySnapshot.forEach(doc => {

            const data = doc.data();

            images.push(data);
        })
        setImages(images)

    } catch (error) {

    }
};

export const DeleteImgAll = async (id, setImages) => {

    const db = getFirestore();

    try {
        const querySnapshot = await getDocs(query(collection(db, 'AllImg'), where('Id', '==', id)))

        querySnapshot.forEach(async (docSnapshot) => {

            const docRef = doc(db, "AllImg", docSnapshot.id)

            await updateDoc(docRef, { Url: null })

            obtenerTodasLasImgAll(setImages)

        });

    } catch (error) {

    }
}

export const AddCategory = async (id, category, setCategories) => {
    const db = getFirestore();

    try {
        const docRef = await addDoc(collection(db, 'Categories'), {
            Id: id,
            Name: category
        })

        obtenerCategorias(setCategories)
    } catch (error) { }
}

export const obtenerCategorias = async (setCategories) => {
    const db = getFirestore()
    try {
        const querySnapshot = await getDocs(collection(db, 'Categories'))

        const categories = []

        categories.push({ id: 0, Name: "Todas las imágenes" });

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            categories.push(data);
        });
        

        setCategories(categories)

    } catch (error) { }
}
