import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAlKslu_xS5RQWHu5wFGw59u8KP6FmKnvs",
    authDomain: "instagram-clone-react-8866e.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-8866e.firebaseio.com",
    projectId: "instagram-clone-react-8866e",
    storageBucket: "instagram-clone-react-8866e.appspot.com",
    messagingSenderId: "741372485463",
    appId: "1:741372485463:web:4041ece39b7fd66fad2812",
    measurementId: "G-S25JZVLDKQ"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};