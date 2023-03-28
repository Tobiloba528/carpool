import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import NavigationController from "../../components/UI/NavigationController";

const ImageScreen = ({ route }) => {
  const { image } = route.params;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={""} right="" />
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={[styles.image, styles.imageOverlay]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  imageContainer: {
    width: "100%",
    height: "70%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "#e1e4e8",
  },
});

export default ImageScreen;
