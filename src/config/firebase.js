import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_urO1yeR54CNL_8_SaH1_VRvQgJ3zAMU",
  authDomain: "chat-app-69e3d.firebaseapp.com",
  databaseURL: "https://chat-app-69e3d-default-rtdb.firebaseio.com",
  projectId: "chat-app-69e3d",
  storageBucket: "chat-app-69e3d.appspot.com",
  messagingSenderId: "932689976460",
  appId: "1:932689976460:web:14f352bd92f80d58402fa9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
