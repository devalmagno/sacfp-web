import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "folha-de-ponto-5d9d4.firebaseapp.com",
  projectId: "folha-de-ponto-5d9d4",
  storageBucket: "folha-de-ponto-5d9d4.appspot.com",
  messagingSenderId: "155504812305",
  appId: "1:155504812305:web:b5ae97c30e6d58c4a9ecb0",
  measurementId: "G-VKKJGW845D"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth
};