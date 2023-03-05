import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ScrollView,
  Image,
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
  const [trips, setTrips] = useState([]);
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
      setTrips(dummyTrips);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Search results"} />
      <View>
        <CustomTab items={items} setItems={setItems} />
      </View>
      {trips.length == 0 ? (
        <ScrollView
          contentContainerStyle={styles.emptyContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.thinkContainer}>
            <Image
              style={styles.thinkImg}
              source={require("../../assets/think.png")}
            />
          </View>
          <Text style={styles.emptyText}>
            Looks like there are no results matching your search
          </Text>
          <View style={styles.btnContainer2}>
            <Pressable
              onPress={() => navigation.navigate("HeadingScreen")}
              style={({ pressed }) => [
                styles.btn,
                pressed && styles.btnPressed,
              ]}
            >
              <Text style={styles.btnText}>Post</Text>
              <Ionicons name="add" size={24} color="white" />
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.contentContainer}>
          <FlatList
            data={forFlat}
            key={(item) => item.id}
            renderItem={({}) => (
              <View>
                <Text style={styles.date}>Today</Text>
                <FlatList
                  data={trips}
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
              style={({ pressed }) => [
                styles.btn,
                pressed && styles.btnPressed,
              ]}
            >
              <Text style={styles.btnText}>Post</Text>
              <Ionicons name="add" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18,
    width: "65%",
    textAlign: "center",
    marginVertical: 20,
    color: "#555555",
  },
  date: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  btnContainer: {
    backgroundColor: "black",
    borderRadius: 15,
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  btnContainer2: {
    backgroundColor: "black",
    borderRadius: 15,
    overflow: "hidden",
    width: 140,
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: "flex",
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 17,
    marginRight: 15,
  },
  btnPressed: {
    opacity: 0.7,
  },
  thinkContainer: {
    width: 50,
    height: 50,
  },
  thinkImg: {
    width: "100%",
    height: "100%",
  },
});

export default RequestedTripsScreen;
