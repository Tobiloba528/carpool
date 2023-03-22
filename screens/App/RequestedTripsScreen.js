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
  Platform,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect } from "react";
import CustomTab from "../../components/UI/CustomTab";
import TripItem from "../../components/UI/TripItem";
import NavigationController from "../../components/UI/NavigationController";
import { contextData } from "../../context/store";


const forFlat = [
  {
    id: 1,
  },
];

const RequestedTripsScreen = ({ navigation, route }) => {
  const [trips, setTrips] = useState([]);
  const [items, setItems] = useState([
    { id: 1, active: true, title: "All" },
    { id: 2, active: false, title: "Trips" },
    { id: 3, active: false, title: "Request" },
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const { fetchingTrips, searchedTrips, handleFetchTrips } = contextData();
  const { originData, destinationData, selectedDate } = route.params;

  // console.log("PARAMS: ", originData, destinationData, selectedDate )

  const onRefresh = useCallback(() => {
    handleFetchTrips(originData, destinationData, selectedDate);
  }, []);

  useEffect(() => {
    setTrips(searchedTrips);
  }, [fetchingTrips]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Search results"} />
      <View>
        <CustomTab items={items} setItems={setItems} />
      </View>
      {fetchingTrips ? (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : trips.length == 0 ? (
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
            {"Looks like there are no results\n matching your search"}
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
              <Ionicons name="add" size={20} color="white" />
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
                {/* <Text style={styles.date}>Today</Text> */}
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    lineHeight: 20,
    textAlign: "center",
    marginVertical: 25,
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
    width: 120,
    bottom: 10,
    right: 20,
  },
  btnContainer2: {
    backgroundColor: "black",
    borderRadius: 15,
    overflow: "hidden",
    width: 120,
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    display: "flex",
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
    marginRight: 5,
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RequestedTripsScreen;
