import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDyX_fQ6kW5BEk3tTO5PHCKFQEcKEx5Go8",
    authDomain: "fir-test-e520e.firebaseapp.com",
    projectId: "fir-test-e520e",
    storageBucket: "fir-test-e520e.appspot.com",
    messagingSenderId: "811151169297",
    appId: "1:811151169297:web:e9ff46b3be5fa0237b5eb0"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);