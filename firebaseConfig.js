// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getReactNativePersistence, initializeAuth } from "firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8M9Y36I3tU_p6xHPYhctKH0XrtBHfRp4",
    authDomain: "auxiliaryv2-87fa0.firebaseapp.com",
    projectId: "auxiliaryv2-87fa0",
    storageBucket: "auxiliaryv2-87fa0.firebasestorage.app",
    messagingSenderId: "844145231386",
    appId: "1:844145231386:web:bbfc388294fa68f2d4f3a3",
    measurementId: "G-9KZ40GCY4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");