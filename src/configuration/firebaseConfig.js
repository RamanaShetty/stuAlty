import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDII_8JPkyx7AjFfBicvE_sU2inUf2lcBI",
  authDomain: "e-learning-91e5c.firebaseapp.com",
  projectId: "e-learning-91e5c",
  storageBucket: "e-learning-91e5c.appspot.com",
  messagingSenderId: "183063228063",
  appId: "1:183063228063:web:ccf9a1966ae1bafd7efcaa",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();