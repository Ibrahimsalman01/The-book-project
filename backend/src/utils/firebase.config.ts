import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC9mX10lyHWR8BumEC8UWbqcDGHVSNH0ew",
  authDomain: "the-book-project-ccf55.firebaseapp.com",
  projectId: "the-book-project-ccf55",
  storageBucket: "the-book-project-ccf55.appspot.com",
  messagingSenderId: "618656199382",
  appId: "1:618656199382:web:d9c93bed198959a1190f77",
  measurementId: "G-K3NEYS1ED9"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
