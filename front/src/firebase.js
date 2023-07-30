// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFEVAAXYEdpO6k5CDdJ2cd1dW9lAco8xo",
  authDomain: "spotify-clone-ed974.firebaseapp.com",
  projectId: "spotify-clone-ed974",
  storageBucket: "spotify-clone-ed974.appspot.com",
  messagingSenderId: "6799487191",
  appId: "1:6799487191:web:bed53828b6fc87a69a0092",
  measurementId: "G-6K6N1J9MQN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      localStorage.setItem("name", result.user.displayName);
      localStorage.setItem("email", result.user.email);
      localStorage.setItem("img", result.user.photoURL);
      localStorage.setItem("id", result.user.uid);
      window.location.reload()
    })
    .catch((error) => {
      alert(error);
    });
};
