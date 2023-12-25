// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyA5Nuat8zdtRd8cAB64Ti-0noV6XRWBuqA',
    authDomain: 'promessas2024.firebaseapp.com',
    projectId: 'promessas2024',
    storageBucket: 'promessas2024.appspot.com',
    messagingSenderId: '1038888621959',
    appId: '1038888621959'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
