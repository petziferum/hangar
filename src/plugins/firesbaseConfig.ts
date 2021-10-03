import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAGwO2YDTyZFJsiZlWgfgaqkXYUqCgHsHc",
  authDomain: "hangar-7334.firebaseapp.com",
  projectId: "hangar-7334",
  storageBucket: "hangar-7334.appspot.com",
  messagingSenderId: "599803437234",
  appId: "1:599803437234:web:9f1e65e4944f3579d8e9ab",
  measurementId: "G-WGCYMBND6Q",
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const fireStore = firebaseApp.firestore()

export { fireStore }
export default firebaseApp;
