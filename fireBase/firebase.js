// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from "uuid"

const firebaseConfig = {
  apiKey: "AIzaSyANu7Jy2YL_QuMdKKPOvwUX5P17X8yM8Eg",
  authDomain: "fir-multer-822ac.firebaseapp.com",
  projectId: "fir-multer-822ac",
  storageBucket: "fir-multer-822ac.appspot.com",
  messagingSenderId: "243354845873",
  appId: "1:243354845873:web:3338c6340bb61b57e3d890"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp)


export async function uploadFile(file){
    const storageRef = ref(storage, v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}
