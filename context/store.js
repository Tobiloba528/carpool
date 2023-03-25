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
  getDocs,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { Alert } from "react-native";
import moment from "moment";
import { sortedArr } from "../utils";

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
  updatingUserData: false,
  userData: {},
  handleSaveTrip: () => {},
  loadingSaveTrip: false,
  tripSaved: false,
  handleFetchTrips: () => {},
  searchedTrips: [],
  fetchingTrips: false,
  getTrip: () => {},
  loadingTrip: false,
});

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({});
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [updatingUserData, setUpdatingUserData] = useState(false);
  const [loadingSaveTrip, setLoadingSaveTrip] = useState(false);
  const [tripSaved, setTripSaved] = useState(false);
  const [searchedTrips, setSearchedTrips] = useState([]);
  const [fetchingTrips, setFetchingTrips] = useState(false);
  const [loadingTrip, setLoadingTrip] = useState(false);

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
            console.log("USER DATA DELETED");
          })
          .catch((error) => console.log("error again", error));
      })
      .catch((error) => {
        setIsAuthLoading(false);
      });
  };

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
    setUpdatingUserData(true);
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
        setUpdatingUserData(false);
      })
      .catch((error) => {
        setUpdatingUserData(false);
        console.log("error again", error);
      });
  };

  const getUser = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());

      const data = await docSnap.data();
      return { ...data };
    } else {
      console.log("No such document!");
    }
  };

  // <------------------------------------------------------------------------>

  const handleSaveTrip = (data) => {
    // console.log(data)
    setLoadingSaveTrip(true);
    const tripsRef = collection(db, "trips");
    addDoc(tripsRef, {
      creator: userId,
      passengers: [],
      status: "pending",
      ...data,
    })
      .then((res) => {
        console.log("RESPONSE: ", res);
        setTripSaved(true);
        setLoadingSaveTrip(false);
        Alert.alert("Action successful", "Trip successfully created.", [
          { onPress: () => setTripSaved(true) },
        ]);
      })
      .catch((error) => {
        console.log("error again", error);
        setLoadingSaveTrip(false);
      });
  };

  const handleFetchTrips = async (originData, destinationData, date) => {
    setFetchingTrips(true);
    try {
      const tripsRef = collection(db, "trips");
      const q = query(tripsRef);
      const requestedTrips1 = [];
      const requestedTrips2 = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        data.id = doc?.id
        // data.creatorData = await getUser(data?.creator);

        const originTerms = data?.origin?.terms;
        const destinationTerms = data?.destination?.terms;

        const checkOriginAddress =
          originTerms[originTerms.length - 2]?.value ==
          originData?.terms[originData?.terms.length - 2]?.value;
        const checkDestinationAddress =
          destinationTerms[destinationTerms.length - 2]?.value ==
          destinationData?.terms[destinationData?.terms.length - 2]?.value;

        const today = moment().format();
        // console.log("TODAY: ", today)

        const checkDate = date
          ? moment(data.date).isSame(date, "second") ||
            moment(data.date).isAfter(date, "second")
          : moment(data.date).isSame(today, "second") ||
            moment(data.date).isAfter(today, "second");

        // console.log(checkDate);
        if (checkOriginAddress && checkDestinationAddress && checkDate) {
          data?.type == "trip_driver"
            ? requestedTrips1.push(data)
            : requestedTrips2.push(data);

          // console.log(checkDate);
        }
        // console.log(doc.id, " => ", doc.data());
      });

      const correctRequestedTrips1 = sortedArr(requestedTrips1)
      const correctRequestedTrips2 = sortedArr(requestedTrips2)
      setSearchedTrips([...correctRequestedTrips1, ...correctRequestedTrips2]);
      // console.log("REQUESTED TRIPS", requestedTrips);
      setFetchingTrips(false);
    } catch (error) {
      console.log(error);
      setFetchingTrips(false);
    }
  };

  const getTrip = async (id) => {
    setLoadingTrip(true);
    try {
      const tripRef = doc(db, "trips", id);
      const docSnap = await getDoc(tripRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());

        const data = await docSnap.data();
        setLoadingTrip(false);
        return { ...docSnap.data() };
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error)
      setLoadingTrip(false);
    }
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
        updatingUserData: updatingUserData,
        userData: userData,
        handleSaveTrip: handleSaveTrip,
        loadingSaveTrip: loadingSaveTrip,
        tripSaved: tripSaved,
        handleFetchTrips: handleFetchTrips,
        searchedTrips: searchedTrips,
        fetchingTrips: fetchingTrips,
        getUser: getUser,
        getTrip: getTrip,
        loadingTrip: loadingTrip,
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
