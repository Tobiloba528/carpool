import React, { useState, useContext, createContext } from "react";
import jwt_decode from "jwt-decode";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseApp, db } from "../http";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

const AppContext = createContext({
  token: null,
  handleLogin: () => {},
  isLoggedIn: () => {},
  handleLogout: () => {},
  handleSignUp: () => {},
  isAuthLoading: false,
  loginError: null,
  signUpError: null,
  handleUserInfoCreation: () => {},
  userId: null,
  loadingUserData: false,
  getUserData: () => {},
  handleUserUpdate: () => {}
});

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);

  // console.log(token, "this is the token");

  const auth = getAuth(firebaseApp);
  const handleLogin = (data) => {
    setIsAuthLoading(true);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        setToken(userCredential._tokenResponse.idToken);
        AsyncStorage.setItem(
          "userToken",
          userCredential._tokenResponse.idToken
        );
        setIsAuthLoading(false);
      })
      .catch((error) => {
        setLoginError(
          error?.message?.split(":")[1]
            ? error?.message?.split(":")[1]
            : "Invalid email or passowrd!"
        );
        setIsAuthLoading(false);
      });
  };

  const handleSignUp = (data) => {
    setIsAuthLoading(true);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        setToken(userCredential._tokenResponse.idToken);
        AsyncStorage.setItem(
          "userToken",
          userCredential._tokenResponse.idToken
        );
        setIsAuthLoading(false);

        const usersRef = collection(db, "users");
        setDoc(doc(usersRef, userCredential.user.uid), {
          name: data.fullName,
        }).catch((error) => console.log("error again", error));
      })
      .catch((error) => {
        setIsAuthLoading(false);
        setSignUpError(
          error?.message?.split(":")[1]
            ? error?.message?.split(":")[1]
            : "Error signing up your account!"
        );
      });
  };

  const isLoggedIn = async () => {
    setIsAuthLoading(true);
    try {
      let userToken = await AsyncStorage.getItem("userToken");
      setToken(userToken);
      setIsAuthLoading(false);

      var decoded = jwt_decode(userToken);
      setUserId(decoded.user_id);
      // console.log("THE USERID", decoded.user_id);
    } catch (error) {
      console.log(error);
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthLoading(true);
    signOut(auth)
      .then(() => {
        AsyncStorage.removeItem("userToken");
        setToken(null);
        setIsAuthLoading(false);
        setLoginError(null);
      })
      .catch((error) => {
        setIsAuthLoading(false);
      });
  };

  const getUserData = async () => {
    setLoadingUserData(true);
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setLoadingUserData(false);
      console.log("Document data:", docSnap.data().name);

      const data = await docSnap.data();
      return { ...data };
    } else {
      console.log("No such document!");
      setLoadingUserData(false);
    }
  };

  const handleUserUpdate = (data) => {
    const usersRef = collection(db, "users");
    setDoc(doc(usersRef, userId), {
      ...data,
    })
      .then((res) => {
        getUserData()
        console.log("USER SAVED SUCCESSFULLY.")
      })
      .catch((error) => console.log("error again", error));
  };

  return (
    <AppContext.Provider
      value={{
        token: token,
        handleLogin: handleLogin,
        isLoggedIn: isLoggedIn,
        isAuthLoading: isAuthLoading,
        handleLogout: handleLogout,
        loginError: loginError,
        handleSignUp: handleSignUp,
        signUpError: signUpError,
        userId: userId,
        loadingUserData: loadingUserData,
        getUserData: getUserData,
        handleUserUpdate: handleUserUpdate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

export const contextData = () => {
  return useContext(AppContext);
};
