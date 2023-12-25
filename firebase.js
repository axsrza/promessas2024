// firebase.js
const firebaseConfig = {
    apiKey: 'AIzaSyA5Nuat8zdtRd8cAB64Ti-0noV6XRWBuqA',
    authDomain: 'promessas2024.firebaseapp.com',
    projectId: 'promessas2024',
    storageBucket: 'promessas2024.appspot.com',
    messagingSenderId: '1038888621959', // Substitua com o seu ID do remetente
    appId: '1038888621959' // Substitua com o seu ID do aplicativo
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
