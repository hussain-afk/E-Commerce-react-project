import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, // Added this import
  signOut            // Added this import
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5xCZyGe48NtvQWTztk6P4RWBqvSL8Hno",
  authDomain: "bata-website-project.firebaseapp.com",
  projectId: "bata-website-project",
  storageBucket: "bata-website-project.firebasestorage.app",
  messagingSenderId: "681169287793",
  appId: "1:681169287793:web:fa0c68d875834c34a9f9d0",
  measurementId: "G-54JF0X8TGE"
};

// 1. Initialize Firebase first
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 2. Define the sign-in function
export const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Auth Error:", error.message);
    return null;
  }
};

// 3. Export the tools needed by other components
export { auth, onAuthStateChanged, signOut };