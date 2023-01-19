import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
// import { config } from 'dotenv';
// config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "folha-de-ponto-5d9d4.firebaseapp.com",
  projectId: "folha-de-ponto-5d9d4",
  storageBucket: "folha-de-ponto-5d9d4.appspot.com",
  messagingSenderId: "155504812305",
  appId: "1:155504812305:web:b5ae97c30e6d58c4a9ecb0",
  measurementId: "G-VKKJGW845D"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);