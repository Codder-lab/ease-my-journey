// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChY3tobl6p661D2228Ix7K6ViTvc7hVdo",
  authDomain: "easemyjourney-c7b67.firebaseapp.com",
  projectId: "easemyjourney-c7b67",
  storageBucket: "easemyjourney-c7b67.firebasestorage.app",
  messagingSenderId: "385269622697",
  appId: "1:385269622697:web:b31a4ba8ef4dae193006b8",
  measurementId: "G-PGTKN8KJXX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
export const auth = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
