import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Platform, StatusBar
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import NavigationController from "../../components/UI/NavigationController";
import SecondaryButton from "../../components/UI/SecondaryButton";

const TripDetailScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Trip preview"} />
      <View style={styles.layer}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.addresses}>
              <View style={styles.extra}>
                <View style={styles.top}>
                  <Text style={styles.city}>Toronto</Text>
                  <Text style={styles.time}>Fri, Feb 24 at 4:00pm</Text>
                </View>
                <Text style={styles.location}>
                  100 Queen st W, Toronto, ON M5H 2N2, Canada
                </Text>
              </View>

              <View>
                <View style={styles.top}>
                  <Text style={styles.city}>Kitchener</Text>
                  <Text style={styles.time}>Fri, Feb 24 at 4:00pm</Text>
                </View>
                <Text style={styles.location}>
                  1400 Ottawa St S, Kitchener, ON N2E 4E2, Canada
                </Text>
              </View>
            </View>

            <View style={styles.seat}>
              <View style={styles.NumOfseat}>
                <Text style={styles.seatText}>3 seats left</Text>
              </View>
              <View style={styles.priceOfseat}>
                <Text style={[styles.seatText, styles.green]}>
                  $17 per seat
                </Text>
              </View>
            </View>

            <Text style={styles.additionaMessage}>"Going back home"</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.detailItem,
              pressed && styles.detailItemPressed,
            ]}
          >
            <View style={styles.detailFirst}>
              <Text style={styles.detailItemText}>Booked: </Text>
              <View style={styles.icons}>
                <View style={styles.iconCointainer}>
                  <FontAwesome name="user" size={24} color="white" />
                </View>
                <View style={styles.iconCointainer}>
                  <FontAwesome name="user" size={24} color="white" />
                </View>
                <View style={styles.iconCointainer}>
                  <FontAwesome name="user" size={24} color="white" />
                </View>
              </View>
            </View>
            <Pressable>
              <FontAwesome name="angle-right" size={30} color="black" />
            </Pressable>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.detailItem,
              pressed && styles.detailItemPressed,
            ]}
          >
            <View style={styles.detailFirst}>
              <View style={styles.profileImageContainer}>
                <Image
                  style={styles.profileImage}
                  source={require("../../assets/user.jpg")}
                />
              </View>
              <Text style={styles.detailItemText}>Tobiloba </Text>
            </View>
            <Pressable>
              <FontAwesome name="angle-right" size={30} color="black" />
            </Pressable>
          </Pressable>
          <View style={styles.carDetails}>
            <View style={styles.carImgContainer}>
              <Image style={styles.carImg} source={require("../../assets/car.jpeg")} />
            </View>
            <View style={styles.carInfoContainer}>
              <Text style={styles.seatText}>Chevrolet</Text>
              <Text style={styles.location}>Blue</Text>
              <Text style={styles.location}>2015</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.requestContainer}>
          <SecondaryButton
            title={"Request to book"}
            radius={10}
            isValid={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  layer: {
    backgroundColor: "#F4F4F4",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addresses: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#246BCE",
  },
  extra: {
    paddingBottom: 20,
  },
  city: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#246BCE",
  },
  time: {
    fontWeight: "bold",
    fontSize: 17,
  },
  location: {
    marginTop: 10,
    fontSize: 15,
    color: "#616060",
  },

  seat: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  NumOfseat: {
    width: "40%",
    borderRightColor: "#cccccc",
    borderRightWidth: 1,
    paddingVertical: 18,
  },
  priceOfseat: {
    width: "60%",
    paddingVertical: 18,
  },
  seatText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  green: {
    color: "#16b802",
  },
  additionaMessage: {
    marginVertical: 25,
    marginLeft: 20,
    fontSize: 18,
    color: "#616060",
  },
  detailItem: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    backgroundColor: "white",
    paddingVertical: 10,
  },
  detailItemPressed: {
    backgroundColor: "#e8e6e6",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailFirst: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItemText: {
    marginRight: 10,
    fontWeight: "500",
    fontSize: 20,
  },
  iconCointainer: {
    backgroundColor: "#ebebeb",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  carDetails: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    marginTop: 25,
    minHeight: 250
  },
  carImgContainer: {
    width: "35%",
  },
  carImg: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  carInfoContainer: {
    marginLeft: 15
  },
  requestContainer: {
    paddingHorizontal: 20,
  },
});

export default TripDetailScreen;
