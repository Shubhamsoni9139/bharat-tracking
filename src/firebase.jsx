import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyAHMjz__0dxpI0ksyToUCVv2giPZmDBYrM",
  
    authDomain: "tracker-b9495.firebaseapp.com",
  
    projectId: "tracker-b9495",
  
    storageBucket: "tracker-b9495.appspot.com",
  
    messagingSenderId: "337773015723",
  
    appId: "1:337773015723:web:67d1a500ddaf9126573dee",
  
    measurementId: "G-7HE0QNEYR2"
  
  };


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };