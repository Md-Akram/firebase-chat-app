// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6xToK0uOeY2PIL5lZK9SDEXgw0UbB6tQ",
    authDomain: "fir-chat-app-a3448.firebaseapp.com",
    projectId: "fir-chat-app-a3448",
    storageBucket: "fir-chat-app-a3448.appspot.com",
    messagingSenderId: "69372543119",
    appId: "1:69372543119:web:19719e4a41a559b7e3b0fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()