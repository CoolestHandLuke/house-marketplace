// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCfUdsEb2y1938RW7PfFiEZf9-z4saiOWY',
    authDomain: 'house-marketplace-app-7381d.firebaseapp.com',
    projectId: 'house-marketplace-app-7381d',
    storageBucket: 'house-marketplace-app-7381d.appspot.com',
    messagingSenderId: '233149395090',
    appId: '1:233149395090:web:b55949667ec7baa549764b',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
