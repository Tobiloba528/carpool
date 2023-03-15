import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React from "react";
import NavigationController from "../../components/UI/NavigationController";

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title="About" />
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

export default AboutScreen;
