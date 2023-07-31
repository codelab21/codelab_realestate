import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig } from "../firebase/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const useAuthentication = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    // Add an observer to watch for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, [auth]); // Ensure this effect runs when auth object changes

  // Login codes
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // SignUp codes
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);

        // Save the user's email to Firestore on sign up
        addDoc(collection(db, "users"), {
          email: userCredential.user.email,
          createdAt: new Date(),
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // Logout codes
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return {
    user,
    email,
    password,
    isSignUp,
    error,
    setEmail,
    setPassword,
    setIsSignUp,
    handleLogin,
    handleSignUp,
    handleLogout,
  };
};

export default useAuthentication;
