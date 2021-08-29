import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "signal-clone-b5dcc.firebaseapp.com",
  projectId: "signal-clone-b5dcc",
  storageBucket: "signal-clone-b5dcc.appspot.com",
  messagingSenderId: "118173403441",
  appId: "1:118173403441:web:1162ca37b2a44d22344810",
};

// optimizacion para que noinicialeice si no es necesario
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
