import React, { useState, useCallback } from "react";
import {
  RefreshControl,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const TripList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [trips, setTrips] = useState([]);
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={[styles.container]}
    >
      <View style={styles.shadow}>
        <ImageBackground
          style={styles.empty}
          source={require("../../assets/background2.jpg")}
        >
          <Ionicons
            name="car-sport"
            size={50}
            color={"#2E2E2E"}
            //   style={{ fontSize: 30 }}
          />
          <Text style={styles.title}>Driving or need a ride?</Text>
          <Text style={styles.info}>Post a trip or request a ride here.</Text>

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={() => navigation.navigate("HeadingScreen")}
          >
            <Text style={styles.buttonText}>Let's go</Text>
          </Pressable>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    backgroundColor: "white",
    flex: 1,
    marginTop: 30,
  },
  empty: {
    flex: 1,
    backgroundColor: "#E7F5E9",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  shadow: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  title: {
    fontWeight: "bold",
    color: "#2E2E2E",
    fontSize: 20,
    marginVertical: 10,
  },
  info: {
    color: "#2E2E2E",
    fontSize: 15,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#006A61",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
  },
  pressed: {
    opacity: 0.7,
  },
});

export default TripList;
