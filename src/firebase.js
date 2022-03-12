import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import "firebase/storage"
import "firebase/compat/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBIyoDrIt1Mhgw1xFXf-kq58ilXVYfyeco",
  authDomain: "trequinhos-b4352.firebaseapp.com",
  projectId: "trequinhos-b4352",
  storageBucket: "trequinhos-b4352.appspot.com",
  messagingSenderId: "1027676800038",
  appId: "1:1027676800038:web:a5a6cacba7e82ef1e312e7"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export {db, firebaseConfig}