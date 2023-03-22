import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  onPress,
} from "react-native";
import React, { useState, useEffect } from "react";
import { contextData } from "../../context/store";
import moment from "moment";

const TripItem = ({ item, onPress }) => {
  const [creatorData, setCreatorData] = useState(null);
  const { getUser } = contextData();

  useEffect(() => {
    (async () => {
      const data = await getUser(item.creator);
      setCreatorData(data);
    })();
  }, [item]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.top}>
        <Text style={styles.topText}>{moment(item.date).format("ddd, MMM D YYYY, ha")}</Text>
        <Text style={styles.topText}>
          {item.seats} seats left{" "}
          {item?.type == "trip_driver" && (
            <Text style={styles.price}>{` $${item.price}`}</Text>
          )}
        </Text>
      </View>

      <View
        style={[
          styles.addresses,
          {
            borderLeftColor:
              item?.type == "trip_driver" ? "#246BCE" : "#C40234",
          },
        ]}
      >
        <Text style={styles.address} numberOfLines={1}>
          <Text
            style={{
              color: item?.type == "trip_driver" ? "#246BCE" : "#C40234",
            }}
          >{`${
            item?.origin?.terms[item?.origin?.terms.length - 2]?.value
          }  `}</Text>
          {item?.origin?.description}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          <Text
            style={{
              color: item?.type == "trip_driver" ? "#246BCE" : "#C40234",
            }}
          >{`${
            item?.destination?.terms[item?.destination?.terms.length - 2]?.value
          }  `}</Text>{" "}
          {item?.destination?.description}
        </Text>
      </View>

      {item?.type == "trip_driver" && (
        <View style={styles.carContainer}>
          <Text style={styles.car}>
            {item?.vehicle?.model
              ? item?.vehicle?.model
              : "Vehicle not specified"}
          </Text>
        </View>
      )}

      <View style={[styles.info, styles.driverInfo]}>
        <View style={styles.info}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: creatorData?.profile_picture
                  ? creatorData?.profile_picture
                  : "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png",
              }}
            />
          </View>
          <Text style={styles.topText}>
            {creatorData ? creatorData?.name : item?.creatorData?.name}
          </Text>
        </View>
        {/* <Text style={styles.driven}>{item.driver.driven} driven</Text> */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 20,
    marginBottom: 15,
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
    justifyContent: "space-between",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  },
});

export default TripItem;
