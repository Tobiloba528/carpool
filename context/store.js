import React, { useState, useContext, createContext } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,r
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseApp, db } from "../http";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";


const AppContext = createContext({
  token: null,
  handleLogin: () => {},
  isLoggedIn: () => {},
  handleLogout: () => {},
  handleSignUp: () => {},
  isAuthLoading: false,
  loginError: null,
  signUpError: null,
});

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  // console.log(token, "this is the token");

  const auth = getAuth(firebaseApp);
  const handleLogin = (data) => {
    setIsAuthLoading(true);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
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
        console.log( "Lets see", userCredential._tokenResponse.localId, userCredential.user.uid)
        setToken(userCredential._tokenResponse.idToken);
        AsyncStorage.setItem(
          "userToken",
          userCredential._tokenResponse.idToken
        );
        setIsAuthLoading(false);

        const names = data?.fullName.split(" ");
        setDoc(doc(db, "users", "145"), {
          firstName: names[0],
          lastName: names[1] ? names[1] : "",
        })
          .then((res) => console.log("user data created"))
          .catch((error) => console.log(error, "user data setting error"));
          return;
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
