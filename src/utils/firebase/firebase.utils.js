import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDuTeJ7rPIjhTVbiff-mkhrlD84IT7bAVU",
    authDomain: "clothing-site-db-3caf4.firebaseapp.com",
    projectId: "clothing-site-db-3caf4",
    storageBucket: "clothing-site-db-3caf4.appspot.com",
    messagingSenderId: "660896097369",
    appId: "1:660896097369:web:60a7c261109a0f64373d48"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const SignInWithGooglePopup = () => signInWithPopup(auth, provider); 