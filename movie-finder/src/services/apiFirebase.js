import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where 
} from "firebase/firestore";

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

export const watchlistRef = collection(db, 'watchlist');

export async function addMovieWatchlist(movieId, currentUserUid) {
  await addDoc(watchlistRef, {
    movie_id: movieId,
    user_id: currentUserUid
  });
};

export async function removeMovieWatchlist(id) {
  const docRef = doc(db, 'watchlist', id);

  await deleteDoc(docRef);
}

export async function getWatchlistByUser(currentUserUid) {
  const q = query(
    watchlistRef,
    where("user_id", "==", currentUserUid)
  );
  const docs = await getDocs(q);

  const results = [];
  docs.forEach((doc) => {
    results.push({id: doc.id, ...doc.data()});
  });

  return results;
}