import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

const mode = import.meta.env.MODE;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "folha-de-ponto-5d9d4.firebaseapp.com",
  projectId: "folha-de-ponto-5d9d4",
  storageBucket: "folha-de-ponto-5d9d4.appspot.com",
  messagingSenderId: "155504812305",
  appId: "1:155504812305:web:b5ae97c30e6d58c4a9ecb0",
  measurementId: "G-VKKJGW845D"
};

const firebaseConfigProd = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "folha-de-ponto-sgcfp.firebaseapp.com",
  projectId: "folha-de-ponto-sgcfp",
  storageBucket: "folha-de-ponto-sgcfp.appspot.com",
  messagingSenderId: "621263422247",
  appId: "1:621263422247:web:11b227f1d87f540e389f02",
  measurementId: "G-F30E27197R"
}

const config = mode === 'development' ? firebaseConfig : firebaseConfigProd;

const app = initializeApp(config);

const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth,
};