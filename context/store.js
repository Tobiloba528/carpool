import React, { useState, useContext, createContext } from "react";
import jwt_decode from "jwt-decode";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseApp, db } from "../http";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Alert } from "react-native";
import moment from "moment";

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
  handleUserUpdate: () => {},
  handleDeleteUser: () => {},
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

  // FUNCTION THAT HANDLES LOGIN
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

  // FUNCTION THAT HANDLES SIGN UP
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
          createdAt: moment(new Date()).format("MMMM, YYYY"),
          user_img: null,
          description: "",
          date_of_birth: null,
          user_type: "user",
          gender: "N/A",
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

  // FUNCTION THAT PERSIST LOGGED IN USER
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

  // FUNCTION THAT HANDLES LOGOUT
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

  // FUNCTION THAT HANDLES CLOSING USER ACCOUNT
  const handleDeleteUser = () => {
    setIsAuthLoading(true);
    deleteUser(auth.currentUser)
      .then(() => {
        AsyncStorage.removeItem("userToken");
        setToken(null);
        setIsAuthLoading(false);

        const usersRef = collection(db, "users");
        deleteDoc(doc(usersRef, userId))
          .then((res) => {
            console.log("USER DATA DELETED")})
          .catch((error) => console.log("error again", error))
          
      })
      .catch((error) => {
        setIsAuthLoading(false);
      });
    }


  // FUNCTION THAT HANDLES USER FETCHING
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

  // FUNCTION THAT HANDLES USER UPDATE
  const handleUserUpdate = (data) => {
    const usersRef = collection(db, "users");
    updateDoc(doc(usersRef, userId), {
      ...data,
    })
      .then((res) => {
        // getUserData()
        console.log("USER SAVED SUCCESSFULLY.");
        Alert.alert(
          "Profile Update",
          "Your profile has been successfully updated!"
        );
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
        handleUserUpdate: handleUserUpdate,
        handleDeleteUser: handleDeleteUser,
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
