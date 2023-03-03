import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState, useCallback } from "react";
import CustomTab from "../../components/UI/CustomTab";
import TripItem from "../../components/UI/TripItem";
import NavigationController from "../../components/UI/NavigationController";

const dummyTrips = [
  {
    id: 1,
    time: "3:15pm",
    seats: 4,
    price: 20,
    car: "Chevrolet Cruse 2016",
    driver: {
      name: "Kamal",
      driven: 5,
    },
    pickup: "Waterloo, ON, Canada",
    pickupCity: "Waterloo",
    destination: "Richmond Hill, ON, Canada",
    destinationCity: "Richmond Hill",
  },
  {
    id: 2,
    time: "4:15pm",
    seats: 3,
    price: 150,
    car: "Chevrolet Cruse 2016",
    driver: {
      name: "Kamal",
      driven: 2,
    },
    pickup: "Waterloo, ON, Canada",
    pickupCity: "Waterloo",
    destination: "Richmond Hill, ON, Canada",
    destinationCity: "Richmond Hill",
  },
  {
    id: 3,
    time: "5:15pm",
    seats: 6,
    price: 22,
    car: "Chevrolet Cruse 2016",
    driver: {
      name: "Kamal",
      driven: 2,
    },
    pickup: "Waterloo, ON, Canada",
    pickupCity: "Waterloo",
    destination: "Richmond Hill, ON, Canada",
    destinationCity: "Richmond Hill",
  },
  {
    id: 4,
    time: "6:15pm",
    seats: 2,
    price: 19,
    car: "Chevrolet Cruse 2016",
    driver: {
      name: "Kamal",
      driven: 9,
    },
    pickup: "Waterloo, ON, Canada",
    pickupCity: "Waterloo",
    destination: "Richmond Hill, ON, Canada",
    destinationCity: "Richmond Hill",
  },
  {
    id: 5,
    time: "3:15pm",
    seats: 4,
    price: 20,
    car: "Chevrolet Cruse 2016",
    driver: {
      name: "Kamal",
      driven: 5,
    },
    pickup: "Waterloo, ON, Canada",
    pickupCity: "Waterloo",
    destination: "Richmond Hill, ON, Canada",
    destinationCity: "Richmond Hill",
  },
  {
    id: 6,
    time: "4:15pm",
    seats: 3,
    price: 150,
    car: "Chevrolet Cruse 2016",
    driver: {
      name: "Kamal",
      driven: 2,
    },
    pickup: "Waterloo, ON, Canada",
    pickupCity: "Waterloo",
    destination: "Richmond Hill, ON, Canada",
    destinationCity: "Richmond Hill",
  },
  {
    id: 7,
    time: "5:15pm",
    seats: 6,
    price: 22,
    car: "Chevrolet Cruse 2016",
    driver: {
      name: "Kamal",
      driven: 2,
    },
    pickup: "Waterloo, ON, Canada",
    pickupCity: "Waterloo",
    destination: "Richmond Hill, ON, Canada",
    destinationCity: "Richmond Hill",
  },
  {
    id: 8,
    time: "6:15pm",
    seats: 2,
    price: 19,
    car: "Chevrolet Cruse 2016",
    driver: {
      name: "Kamal",
      driven: 9,
    },
    pickup: "Waterloo, ON, Canada",
    pickupCity: "Waterloo",
    destination: "Richmond Hill, ON, Canada",
    destinationCity: "Richmond Hill",
  },
];

const forFlat = [
  {
    id: 1,
  },
];

const RequestedTripsScreen = ({ navigation }) => {
  const [items, setItems] = useState([
    { id: 1, active: true, title: "All" },
    { id: 2, active: false, title: "Trips" },
    { id: 3, active: false, title: "Request" },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Search results"} />
      <View>
        <CustomTab items={items} setItems={setItems} />
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={forFlat}
          key={(item) => item.id}
          renderItem={({}) => (
            <View>
              <Text style={styles.date}>Today</Text>
              <FlatList
                data={dummyTrips}
                key={(item) => item.id}
                renderItem={({ item }) => (
                  <TripItem
                    item={item}
                    onPress={() => navigation.navigate("TripDetailScreen")}
                  />
                )}
              />
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <View style={styles.btnContainer}>
          <Pressable
            onPress={() => navigation.navigate("HeadingScreen")}
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
          >
            <Text style={styles.btnText}>Post</Text>
            <Ionicons name="add" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  date: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  btnContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    width: 140,
    paddingVertical: 15,
    display: "flex",
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "white",
    marginRight: 15,
  },
  btnPressed: {
    opacity: 0.7
  }
});

export default RequestedTripsScreen;
