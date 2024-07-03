import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyD-uQycHMcWq815Q8I3WyTR9kYBUs8hyuY",
    authDomain: "certamen-86732.firebaseapp.com",
    projectId: "certamen-86732",
    storageBucket: "certamen-86732.appspot.com",
    messagingSenderId: "1088584934404",
    appId: "1:1088584934404:web:3c34f8793503f361b70151",
    measurementId: "G-849R304E7C"
  }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const coleccion = collection(db, 'productos')

export const save = producto => addDoc(coleccion, producto)
export const getAll = callback => getDocs(coleccion).then(snapshot => {
    const datos = snapshot.docs
    callback(datos)
})
export const remove = id => deleteDoc(doc(db, 'productos', id))
export const selectOne = id => getDoc(doc(db, 'productos', id))
export const update = (id, producto) => updateDoc(doc(db, 'productos', id), producto)
