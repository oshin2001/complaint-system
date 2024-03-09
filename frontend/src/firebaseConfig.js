import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMALzML7J7AXwzpqklvdRPxxHcc_pulE4",
  authDomain: "webprogproj-7a70d.firebaseapp.com",
  projectId: "webprogproj-7a70d",
  storageBucket: "webprogproj-7a70d.appspot.com",
  messagingSenderId: "271302820352",
  appId: "1:271302820352:web:eca5a4b9a07dd050770ee5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export default storage;