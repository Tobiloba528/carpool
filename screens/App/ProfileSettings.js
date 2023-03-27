import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform, StatusBar
} from "react-native";
import AccountList from "../../components/AccountList";
import NavigationController from "../../components/UI/NavigationController";
import TopTitle from "../../components/UI/TopTitle";
import { contextData } from "../../context/store";


const ProfileSettings = ({ navigation }) => {
const firstArray = [
    {
      id: 1,
      label: "Personal details (name, phone number, ...)",
      onPress: () => navigation.navigate("PersonalDetailsScreen"),
    },
    {
      id: 2,
      label: "Change password",
      onPress: () => navigation.navigate("ChangePassword"),
    },
    // {
    //   id: 3,
    //   label: "Vehicles",
    //   onPress: () => navigation.navigate("ProfileScreen"),
    // },
  ];

  const secondArray = [
    {
      id: 1,
      label: "Email address",
      onPress: () => navigation.navigate("ProfileScreen"),
    },
    {
      id: 2,
      label: "Change password",
      onPress: () => navigation.navigate("ProfileScreen"),
    },
  ];


  return (
      <SafeAreaView style={styles.container}>
        {/* <TopTitle /> */}
        {/* <Button title="Click to show heading" onPress={() => navigation.navigate("HeadingScreen")}/> */}
        <NavigationController title={""} right="" />
        <View style={styles.layer}>
          <ScrollView>
            <View style={styles.title}>
              <Text style={styles.titleText}>Profile Settings</Text>
            </View>
            <AccountList items={firstArray} />
            {/* <AccountList items={secondArray} /> */}
            {/* <View style={styles.version}>
              <Text style={styles.versionText}>Version 1.0.0</Text>
            </View> */}
          </ScrollView>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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

export default ProfileSettings;
