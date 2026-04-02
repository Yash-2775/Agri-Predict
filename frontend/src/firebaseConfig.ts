import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGqmJZsMLdifjJ4byFj2pIpLObRerIN_U",
  authDomain: "agripredict-c4598.firebaseapp.com",
  projectId: "agripredict-c4598",
  storageBucket: "agripredict-c4598.firebasestorage.app",
  messagingSenderId: "342241641132",
  appId: "1:342241641132:web:aa4623890253b7385cd509",
  measurementId: "G-1KMXCC31N6",
};

// Initialize App (Safety Check)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Simple Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
