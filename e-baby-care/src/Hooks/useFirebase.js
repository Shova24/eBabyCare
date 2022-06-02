import initializeFirebase from "../Pages/Login/Firebase/Firebase.init";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const [isValid, setIsvalid] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  // const navigate = useNavigate();

  const registerUser = (email, password, name) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setAuthError("");
        // const newUser = { email, displayName: name };
        // setUser(newUser);
        // //send name to firebase after creation
        // updateProfile(auth.currentUser, {
        //   displayName: "Jane Q. User",
        //   // photoURL: "https://example.com/jane-q-user/profile.jpg"
        // })
        //   .then(() => {
        //     // Profile updated!
        //     // ...
        //   })
        //   .catch((error) => {
        //     // An error occurred
        //     // ...
        //   });

        // navigate("/parenthome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAuthError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  const signInWithGoogle = () => {
    setIsLoading(true);

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setAuthError("");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        setAuthError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  //observe user presence
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser({});
  //     }
  //     setIsLoading(false);
  //   });
  //   return () => unsubscribe;
  // }, []);

  const logout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (email, password) => {
    setIsvalid(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setAuthError("");
        setIsvalid(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsvalid(false);
        setAuthError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //for trial
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    setUser,
    isLoading,
    registerUser,
    logout,
    loginUser,
    authError,
    setAuthError,
    signInWithGoogle,
    isValid,

    //from trial session
    logIn,
    signUp,
    logOut,
    googleSignIn,
  };
};

export default useFirebase;
