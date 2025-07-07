import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.config";
import Swal from "sweetalert2";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  // createUser

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login existing user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   continue with google
  const continueWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  //   updateUser profile

  const updateUser = (moreInfo) => {
    return updateProfile(auth.currentUser, moreInfo);
  };
  //   logoutUser
  const logoutUser = () => {
    return signOut(auth)
      .then(() => {
        setUser(null);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "sign out  Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message} || something went wrong`,
        });
      });
  };

  // set  observer for

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }

      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    createUser,
    loginUser,
    user,
    setUser,
    loading,
    setLoading,
    continueWithGoogle,
    updateUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
