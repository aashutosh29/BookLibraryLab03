// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZrtLZiuth1VSbdZrH_FHTsLWZj0Y1obo",
  authDomain: "booklibrary-91afe.firebaseapp.com",
  projectId: "booklibrary-91afe",
  storageBucket: "booklibrary-91afe.firebasestorage.app",
  messagingSenderId: "528640796116",
  appId: "1:528640796116:web:4421b0327c9608be516241",
  measurementId: "G-LK7VS52LVR"
};

const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized:', app);
export const db = getFirestore(app);
