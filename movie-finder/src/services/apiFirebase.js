import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLoeuYozDcKQpp06Ke-KAAsaSTOZ_5W58",
  authDomain: "movie-finder-web.firebaseapp.com",
  projectId: "movie-finder-web",
  storageBucket: "movie-finder-web.appspot.com",
  messagingSenderId: "161611281262",
  appId: "1:161611281262:web:9a4cc86565e257571c477f",
  measurementId: "G-KD3NMP5G59"
}

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);