// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA6s28EcJE7gXRaYCGrVSURTdUSWZuxkoQ",

  authDomain: "gallery-book-78cba.firebaseapp.com",

  projectId: "gallery-book-78cba",

  storageBucket: "gallery-book-78cba.appspot.com",

  messagingSenderId: "723563721124",

  appId: "1:723563721124:web:c2e5fe8f67cf91dff09131",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const register = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error;
    });
};
export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error;
    });
};
export const logout = () => {
  signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    });
};
export default auth;
