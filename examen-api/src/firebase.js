import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const firebaseConfig = {
  apiKey: "AIzaSyDNMopPL8vSlT8Nidx0H425VRPrFWthsdc",
  authDomain: "richard-men.firebaseapp.com",
  databaseURL: "https://richard-men-default-rtdb.firebaseio.com",
  projectId: "richard-men",
  storageBucket: "richard-men.appspot.com",
  messagingSenderId: "299419461732",
  appId: "1:299419461732:web:efa41b37415994cb859771"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
