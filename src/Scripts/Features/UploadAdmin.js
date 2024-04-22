
import { collection, addDoc, getDocs, doc, query, where, updateDoc, orderBy } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';

export const AllFeature = async (setFeatureData) => {

    const db = getFirestore()

    try {

        const ref = collection(db, 'Feature');

        const querySnapshot = await getDocs(query(ref, orderBy('Feature.Layout.Id')));

        const feature = [];

        querySnapshot.forEach(doc => {

            const data = doc.data();
            const Iddoc = doc.id;
            data.Iddoc = Iddoc;
            feature.push(data);
        })

        setFeatureData(feature)

    } catch (error) {
        console.log(error)
    }
};


export const SaveFeature = async (data) => {
    const db = getFirestore()
    if (data) {
        try {
            const docRef = await addDoc(collection(db, "Feature"), data)
        } catch (error) {
        }
    } else {
    }
};


export const EditFeature = async (data, id, setFeatureData, FieldName) => {
    const db = getFirestore();

    try {
        const querySnapshot = await getDocs(query(collection(db, 'Feature'), where('Feature.Layout.Id', '==', id)))

        querySnapshot.forEach(async (docSnapshot) => {

            const docRef = doc(db, "Feature", docSnapshot.id)
            const updateData = {};
            updateData[FieldName] = data;
            await updateDoc(docRef, updateData);
            AllFeature(setFeatureData)
        });

    } catch (error) {

    }

}