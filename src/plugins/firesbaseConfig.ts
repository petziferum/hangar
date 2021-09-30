import "firebase/firestore";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import store from "@/store";

const firebaseConfig = {
  apiKey: "AIzaSyAGwO2YDTyZFJsiZlWgfgaqkXYUqCgHsHc",
  authDomain: "hangar-7334.firebaseapp.com",
  projectId: "hangar-7334",
  storageBucket: "hangar-7334.appspot.com",
  messagingSenderId: "599803437234",
  appId: "1:599803437234:web:9f1e65e4944f3579d8e9ab",
  measurementId: "G-WGCYMBND6Q",
};

initializeApp(firebaseConfig);

const fireAuth = firebase.auth();
fireAuth.onAuthStateChanged(
  (user: firebase.User | null): Promise<firebase.User> =>
    store.dispatch("FETCH_USER", user)
);
const firestore = firebase.firestore();
export default firestore.app;
