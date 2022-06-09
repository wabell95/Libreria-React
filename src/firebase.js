import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, addDoc } from "firebase/firestore"

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDqpDyJ7j9VtGn8rmeBD-hQhFNnZQT37aw",
//   authDomain: "react-firebase-2022-128c2.firebaseapp.com",
//   projectId: "react-firebase-2022-128c2",
//   storageBucket: "react-firebase-2022-128c2.appspot.com",
//   messagingSenderId: "1050612323064",
//   appId: "1:1050612323064:web:42a4d143c74eb4e27e610d"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB9OQON4FhMvPVtlOiC3i2aW5tyIs1HAoo",
  authDomain: "libreria-react-f1d55.firebaseapp.com",
  projectId: "libreria-react-f1d55",
  storageBucket: "libreria-react-f1d55.appspot.com",
  messagingSenderId: "921316191573",
  appId: "1:921316191573:web:b62ef472cf20f8de9053dc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// export { auth };

const db = getFirestore(app);

// Obtener libro por ID
const obtenerLibroPorId = async (id) => {
  const docRef = doc(collection(db, "libros"), id)
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}

// Obtener id para la orden de compra
const addOrder = async (order) => {

  console.log("order", order);

  const docSnap = await addDoc(collection(db, "orders"), order)
  return docSnap.id
}


export {
  db,
  obtenerLibroPorId,
  addOrder
}