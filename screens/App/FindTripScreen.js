import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import FindTripButton from "../../components/UI/FindTripButton";
import SecondaryButton from "../../components/UI/SecondaryButton";
import NavigationController from "../../components/UI/NavigationController";

const FindTrip = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Find a trip"} />
      <View style={styles.contentContainer}>
        <FindTripButton
          text={"From"}
          onPress={() =>
            navigation.navigate("SearchAddressScreen", { title: "From" })
          }
        >
          <Ionicons name="location-sharp" size={20} color="black" />
        </FindTripButton>

        <Pressable
          style={({ pressed }) => [styles.swapIcon, pressed && styles.pressed]}
        >
          <MaterialIcons
            name="swap-vertical-circle"
            size={50}
            color="#3B444B"
          />
        </Pressable>

        <FindTripButton
          text={"To"}
          onPress={() =>
            navigation.navigate("SearchAddressScreen", { title: "To" })
          }
        >
          <Ionicons name="location-sharp" size={20} color="black" />
        </FindTripButton>

        <FindTripButton text={"Departing (optional)"} onPress={() => {}}>
          <FontAwesome name="calendar-o" size={18} color="black" />
        </FindTripButton>
        <SecondaryButton
          title={"Search"}
          isValid
          bgColor="#3B444B"
          radius="15"
          onPress={() => navigation.navigate("RequestedTripsScreen")}
        />
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
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  swapIcon: { marginVertical: -25, zIndex: 10, marginLeft: "80%" },
  pressed: {
    opacity: 0.75,
  },
});

export default FindTrip;
