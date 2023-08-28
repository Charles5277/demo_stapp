import { initializeApp } from 'firebase/app'
import { getDatabase, dbRef } from 'firebase/database'
import { getAuth } from 'firebase/auth';



const db = getDatabase(vuefire)
const auth = getAuth(firebaseApp);

export default firebaseApp;
export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  databaseURL: import.meta.env.VITE_databaseURL,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
})
export { auth, db };
export const todosRef = dbRef(db, 'todos')

