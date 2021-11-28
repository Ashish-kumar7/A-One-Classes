import firebase from 'firebase';
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA3xmDhxFtDI1lVDERG43mqsDNWPrfDLMM",
    authDomain: "a-one-classes-e5c41.firebaseapp.com",
    projectId: "a-one-classes-e5c41",
    storageBucket: "a-one-classes-e5c41.appspot.com",
    messagingSenderId: "590158608021",
    appId: "1:590158608021:web:e9f4403a8ed49ccc88cd9c",
    measurementId: "G-WJX9Q0BBZ5"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const authenticate = firebase.auth();
const googleprovider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { authenticate, googleprovider, storage  };
export default db;