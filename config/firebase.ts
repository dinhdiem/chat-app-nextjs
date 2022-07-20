import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9rVTHH3VdUVigHt7hA2v-77nNwNUAcDY",
  authDomain: "whatsapp-clone-5bae0.firebaseapp.com",
  projectId: "whatsapp-clone-5bae0",
  storageBucket: "whatsapp-clone-5bae0.appspot.com",
  messagingSenderId: "337077068106",
  appId: "1:337077068106:web:cae0e3cb4ba9ceb0e361b3",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
