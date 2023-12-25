// firebase.js
const firebaseConfig = {
    apiKey: 'sua-chave-api',
    authDomain: 'seu-domínio.firebaseapp.com',
    projectId: 'seu-projeto-id',
    storageBucket: 'seu-storage-bucket.appspot.com',
    messagingSenderId: 'seu-sender-id',
    appId: 'seu-app-id'
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
