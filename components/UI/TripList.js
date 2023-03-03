import React, { useState, useCallback } from "react";
import {
  RefreshControl,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
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
      <View style={styles.empty}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    backgroundColor: "white",
    flex: 1,
  },
  empty: {
    flex: 1,
    backgroundColor: "#36E0D2",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
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
    backgroundColor: "#E7E7E7",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "700",
  },
  pressed: {
    backgroundColor: "#DADADA",
  },
});

export default TripList;
