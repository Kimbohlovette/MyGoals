// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD6AI5477Ef69HGBIgKOPXAHfrTaOpkHxY',
  authDomain: 'mygoals-8552b.firebaseapp.com',
  projectId: 'mygoals-8552b',
  storageBucket: 'mygoals-8552b.appspot.com',
  messagingSenderId: '1084821028772',
  appId: '1:1084821028772:web:d3d73c67ad37f7f6230b31',
  measurementId: 'G-TH50MRD28V',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export default db;
