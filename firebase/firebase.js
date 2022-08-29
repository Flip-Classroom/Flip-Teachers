// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_APP_FIREBASE_API_KEY}`,
  authDomain: "trusty-force-358809.firebaseapp.com",
  projectId: `${process.env.NEXT_PUBLIC_APP_FIREBASE_APP_ID}`,
  storageBucket: "trusty-force-358809.appspot.com",
  messagingSenderId: "775640691968",
  appId: "1:775640691968:web:5ebc914d178388a27c6fe5",
  measurementId: "G-CE6CWWNLB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}
export const storage = getStorage(app);
