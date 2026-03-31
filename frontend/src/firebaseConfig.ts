import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGqmJZsMLdifjJ4byFj2pIplOBRerIM_U",
  authDomain: "agripredict-c4598.firebaseapp.com",
  projectId: "agripredict-c4598",
  storageBucket: "agripredict-c4598.firebasestorage.app",
  messagingSenderId: "342241641132",
  appId: "1:342241641132:web:aa4623890253b7385cd509",
  measurementId: "G-1KMXCC31N6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database (Firestore) and Image Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
