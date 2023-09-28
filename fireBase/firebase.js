import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBhCUlTiV-vs869Y3xdP917l3mVal69TBw",
  authDomain: "minga-e2fb3.firebaseapp.com",
  projectId: "minga-e2fb3",
  storageBucket: "minga-e2fb3.appspot.com",
  messagingSenderId: "794188098025",
  appId: "1:794188098025:web:a3f8721731015e604c4378",
  measurementId: "G-DNP2G6P54J"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

// Función para cargar un archivo a Firebase Storage

async function upLoadFile(file) {
  if (!file) {
    console.error('El archivo es nulo o indefinido.');
    return;
  }

  const storeRef = ref(storage, '/image');

  try {
    const snapshot = await uploadBytes(storeRef, file);
    console.log('Archivo cargado correctamente:', snapshot);
    return snapshot;
  } catch (error) {
    console.error('Error al cargar el archivo en Firebase Storage:', error);
    throw error;
  }
}

export { firebaseApp };
