import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyBmLZb0W1h1_YvIkdGFPkbe5vyTgcO_Dug",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "meelad-zhraa.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "meelad-zhraa",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "meelad-zhraa.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "595012512604",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:595012512604:web:37295239a8a2d772fdaf99"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    console.log("Adding doc...");
    const docRef = await addDoc(collection(db, 'gifts'), {
      test: "data",
      createdAt: Date.now()
    });
    console.log("Document written with ID: ", docRef.id);
    process.exit(0);
  } catch (e) {
    console.error("Error adding document: ", e);
    process.exit(1);
  }
}

test();
