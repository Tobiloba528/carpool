import React, { useState, useContext, createContext } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseApp } from "../http";

const AppContext = createContext({
  token: null,
  handleLogin: () => {},
  isLoggedIn: () => {},
  handleLogout: () => {},
  isAuthLoading: false,
});

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  console.log(token, "this is the token");

  const auth = getAuth(firebaseApp);
  const handleLogin = (data) => {
    setIsAuthLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential, "these are the credentials");
        setToken(userCredential._tokenResponse.idToken);
        AsyncStorage.setItem(
          "userToken",
          userCredential._tokenResponse.idToken
        );
        setIsAuthLoading(false);
      })
      .catch((error) => {
        console.log(error, "na the error be this");
        setIsAuthLoading(false);
      });
    console.log(data, "this is in context");
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
        handleLogout: handleLogout
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
