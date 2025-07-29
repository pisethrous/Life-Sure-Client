import React, { useEffect, useState } from "react";

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
import { Context } from "./Context";

import axios from "axios";

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
     localStorage.removeItem('token');
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
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setLoading(true);

    if (currentUser?.email) {
      try {
        const res = await axios.post("https://assignment-12-server-xi-orpin.vercel.app/jwt", {
          email: currentUser.email,
        });

        localStorage.setItem("token", res.data.Token);
        setUser(currentUser); // set only after successful JWT
      } catch (err) {
        console.error("JWT fetch error", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
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
    <Context.Provider value={authData}>{children}</Context.Provider>
  );
};

export default ContextProvider;
