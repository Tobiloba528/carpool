import { View, Text, StyleSheet, Pressable, Image, onPress } from "react-native";
import React from "react";

const TripItem = ({ item, onPress }) => {
  return (
    <Pressable
     onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.top}>
        <Text style={styles.topText}>Today at {item.time}</Text>
        <Text style={styles.topText}>
          {item.seats} seats left <Text style={styles.price}>${item.price}</Text>
        </Text>
      </View>

      <View style={styles.addresses}>
        <Text style={styles.address}>
          <Text style={styles.city}>{item.pickupCity}</Text> {item.pickup}
        </Text>
        <Text style={styles.address}>
          <Text style={styles.city}>{item.destinationCity}</Text> {item.destination}</Text>
      </View>

      <View style={styles.carContainer}>
        <Text style={styles.car}>{item.car}</Text>
      </View>

      <View style={[styles.info, styles.driverInfo]}>
        <View style={styles.info}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={require("../../assets/user.jpg")}
            />
          </View>
          <Text style={styles.topText}>{item.driver.name}</Text>
        </View>
        <Text style={styles.driven}>{item.driver.driven} driven</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  pressed: {
    backgroundColor: "#E8E8E8",
  },
  top: {
    display: "flex",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  topText: {
    fontWeight: "600",
    fontSize: 16,
  },
  price: {
    color: "#009F6B",
    fontWeight: "bold",
  },
  addresses: {
    paddingHorizontal: 15,
    borderLeftWidth: 2,
    borderLeftColor: "#246BCE",
  },
  address: {
    color: "#848482",
    fontWeight: "600",
    marginVertical: 5,
    fontSize: 16,
  },
  city: {
    color: "#246BCE",
  },
  car: {
    fontWeight: "bold",
    color: "#555555",
    marginTop: 10,
  },
  carContainer: {
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",
    paddingBottom: 17,
    // borderStyle: "dotted",
  },
  driverInfo: {
    marginHorizontal: 15,
    marginTop: 10,
    justifyContent: "space-between"
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  driven: {
    fontWeight: "400",
    fontSize: 16,
  }
});

export default TripItem;
