import React from "react";
import { Pressable, View, StyleSheet, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AccountList = ({ items, noMargin }) => {


  // const checkBorder = (id) => {
  //     return items.length !== id
  // }

  return (
    <View style={[styles.root, noMargin && styles.noMargin]}>
      {items.map((item) => (
        <Pressable
          style={({ pressed }) => [styles.container, pressed && styles.pressed]}
          key={item.id}
          onPress={item.onPress}
        >
          <View style={styles.labelContainer}>
            {item?.imagePath && (
              <View style={styles.imageContainer}>
                <Image source={item.imagePath} style={styles.image} />
              </View>
            )}
            <Text style={[styles.label, item.red && styles.red]}>{item.label}</Text>
          </View>
          <Ionicons name="chevron-forward" size={30} color={"#424242"} />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 25,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#F4F4F4",
    overflow: "hidden"
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
  },
  pressed: {
    backgroundColor: "#E8E8E8",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4"
  },
  red: {
    color: "#FF4C4C"
  },
  noMargin: {
    marginBottom: 0
  }

});

export default AccountList;
