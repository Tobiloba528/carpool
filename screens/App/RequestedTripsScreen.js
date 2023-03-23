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
  ActivityIndicator,
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
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filter, setFilter] = useState("all");

  const [items, setItems] = useState([
    { id: 1, active: true, title: "All", value: "all" },
    { id: 2, active: false, title: "Trips", value: "trip_driver" },
    { id: 3, active: false, title: "Request", value: "trip_rider" },
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

  useEffect(() => {
    if (filter === "all") {
      setFilteredTrips(trips);
    } else if (filter === "trip_driver") {
      const newArr = [];
      searchedTrips.forEach((item) => {
        if (item?.type === "trip_driver") {
          newArr.push(item);
        }
        setFilteredTrips(newArr);
      });
    } else if (filter === "trip_rider") {
      const newArr = [];
      searchedTrips.forEach((item) => {
        if (item?.type === "trip_rider") {
          newArr.push(item);
        }
        setFilteredTrips(newArr);
      });
    }
  }, [filter]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Search results"} />
      <View>
        <CustomTab items={items} setItems={setItems} setValue={setFilter} />
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
                  data={filteredTrips.length > 0 ? filteredTrips : trips}
                  key={(item) => item.id}
                  renderItem={({ item }) => (
                    <TripItem
                      item={item}
                      navigation={navigation}
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
