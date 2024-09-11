import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB5W3B1mSYMzY_kJOa7zwsIEzToGueIdZ8",
  authDomain: "milhas-dashboard.firebaseapp.com",
  projectId: "milhas-dashboard",
  storageBucket: "milhas-dashboard.appspot.com",
  messagingSenderId: "408165476556",
  appId: "1:408165476556:web:95c2afa5330b949762fa69"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

export { auth };
