import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import NavigationController from "../../components/UI/NavigationController";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Tobiloba's profile"} right="settings" />
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.profileInfoContainer}>
            <View style={styles.profileInfo}>
              <View style={styles.profileImageContainer}>
                <Image
                  style={styles.profileImage}
                  source={require("../../assets/user.jpg")}
                />
              </View>
              <View style={styles.profileTitleContainer}>
                <Text style={styles.profileTitle1}>Tobiloba</Text>
                <Text style={styles.profileTitle2}>Joined December 2022</Text>
                <Text style={styles.profileTitle3}>Male, 25 years old</Text>
              </View>
            </View>

            <View style={styles.bioContainer}>
              <Text style={[styles.profileTitle2, styles.bioText]}>Bio</Text>
              <Text style={styles.profileTitle3}>
                {'"I travel to visit my family"'}
              </Text>
            </View>
          </View>

          <View style={styles.appUsage}>
            <View style={styles.usageItem}>
              <FontAwesome5 name="car" size={24} color="black" />
              <Text style={styles.usageValue}>0</Text>
              <Text style={styles.profileTitle3}>people driven</Text>
            </View>
            <View style={styles.usageItem}>
              <FontAwesome5 name="user-alt-slash" size={24} color="black" />
              <Text style={styles.usageValue}>0</Text>
              <Text style={styles.profileTitle3}>rides taken</Text>
            </View>
            <View style={styles.usageItem}>
              <FontAwesome5 name="road" size={24} color="black" />
              <Text style={styles.usageValue}>0</Text>
              <Text style={styles.profileTitle3}>km shared</Text>
            </View>
          </View>

          <View style={styles.styleSpace}></View>
          <View style={styles.reviews}>
            <Text style={styles.profileTitle3}>No reviews yet</Text>
          </View>
          <View style={styles.styleSpace}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  contentContainer: {
    flex: 1,
  },

  profileInfoContainer: {
    paddingTop: 30,
  },
  profileInfo: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    marginRight: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },

  profileTitle1: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  profileTitle2: {
    fontWeight: "500",
    marginBottom: 8,
  },
  profileTitle3: {
    color: "#555555",
  },
  bioContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
  },
  bioText: {
    fontWeight: "bold",
  },
  appUsage: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 40,
    justifyContent: "space-between"
  },
  usageItem: {
    display: "flex",
    alignItems: "center"
  },
  usageValue: {
    fontWeight: "600",
    paddingVertical: 5,
    fontSize: 20
  },
  styleSpace: {
    height: 25,
    backgroundColor: "#F5F5F5"
  },
  reviews: {
    padding: 18
  }
});

export default ProfileScreen;
