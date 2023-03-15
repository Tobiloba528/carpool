import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import NavigationController from "../../components/UI/NavigationController";


const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title="Notifications" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default NotificationScreen;
