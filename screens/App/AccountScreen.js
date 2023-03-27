import { useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import AccountList from "../../components/AccountList";
import TopTitle from "../../components/UI/TopTitle";
import { contextData } from "../../context/store";
import { useIsFocused } from "@react-navigation/native";

const AccountScreen = ({ navigation }) => {
  const {
    handleLogout,
    handleDeleteUser,
    userId,
    getUserData,
    userData: user,
  } = contextData();
  const [profileList, setProfileList] = useState([
    {
      id: 1,
      label: "View your profile",
      imageUri: user?.profile_picture || null,
      imagePath: true,
      onPress: () => navigation.navigate("ProfileScreen",  { visitorId: null }),
    },
  ]);
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        const accountItem = {
          ...profileList[0],
          imageUri: userData?.profile_picture,
        };
        setProfileList([{ ...accountItem }]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [userId, isFocused]);

  // const profileList = [
  //   {
  //     id: 1,
  //     label: "View your profile",
  //     imagePath: require("../../assets/user.jpg"),
  //     onPress: () => navigation.navigate("ProfileScreen"),
  //   },
  // ];

  const firstArray = [
    {
      id: 1,
      label: "Profile settings",
      onPress: () => navigation.navigate("ProfileSettings"),
    },
    // {
    //   id: 2,
    //   label: "ID verification",
    //   onPress: () => navigation.navigate("ProfileScreen")
    // },
    // {
    //   id: 3,
    //   label: "Notifications",
    //   onPress: () => navigation.navigate("NotificationScreen"),
    // },
    {
      id: 4,
      label: "About",
      onPress: () => navigation.navigate("AboutScreen"),
    },
  ];

  const secondArray = [
    {
      id: 1,
      label: "Help",
      onPress: () => navigation.navigate("ProfileScreen"),
    },
    {
      id: 2,
      label: "Cool Stuff",
      onPress: () => navigation.navigate("ProfileScreen"),
    },
    {
      id: 3,
      label: "Students",
      onPress: () => navigation.navigate("ProfileScreen"),
    },
    {
      id: 4,
      label: "About",
      onPress: () => navigation.navigate("ProfileScreen"),
    },
  ];

  const thirdArray = [
    {
      id: 1,
      label: "Logout",
      onPress: handleLogout,
    },
    {
      id: 2,
      label: "Close your account",
      onPress: handleDeleteUser,
      red: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TopTitle />
      {/* <Button title="Click to show heading" onPress={() => navigation.navigate("HeadingScreen")}/> */}
      <View style={styles.layer}>
        <ScrollView>
          <View style={styles.title}>
            <Text style={styles.titleText}>Account</Text>
          </View>
          <AccountList items={profileList} />
          <AccountList items={firstArray} />
          {/* <AccountList items={secondArray} /> */}
          <AccountList items={thirdArray} noMargin={true} />
          <View style={styles.version}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  layer: {
    backgroundColor: "#F4F4F4",
    flex: 1,
  },
  title: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "white",
    marginBottom: 25,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  version: {
    // height: 25,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  versionText: {
    fontWeight: "500",
    color: "#999999",
  },
});

export default AccountScreen;
