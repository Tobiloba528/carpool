import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import NavigationController from "../../components/UI/NavigationController";

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title="About" />
      <ScrollView style={styles.contentContain}>
        <Text style={styles.title}>Our Story</Text>
        <Text style={styles.text1}>
          We are on a mission to fill empty seats in cars and make travel more
          social, affordable and sustainable for every person
        </Text>
        <Text style={styles.text2}>
          We provide city to city carpooling service that connects drivers who
          are already driving from point A to point B with passengers heading in
          the same direction.
        </Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/travel1.jpg")}
          />
        </View>
        <Text style={styles.founder}>Founder</Text>
        <Text style={styles.text2}>
          Carpool was founded by Tobiloba Omitomo, a Software Engineer. He
          developed this application to help people who do not drive to travel
          at a cheap price and great comfort.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContain: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text1: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 25,
  },
  text2: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 25,
    color: "#555555",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  founder: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
  },
});

export default AboutScreen;
