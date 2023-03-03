import React from "react";
import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeadingItem = ({ border, label, info, onPress, image }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, border && styles.borderBottom, pressed && styles.pressed]}>
      <View>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={image} />
        </View>
        <Text style={styles.title}>{label}</Text>
        <Text style={styles.info}>{info}</Text>
      </View>
      <Ionicons name="chevron-forward" size={30} color={"#424242"} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 50,
    height: "50%",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
  },
  info: {
    color: "#737373",
  },
  pressed: {
    backgroundColor: "#E8E8E8"
  },
  imageContainer: {
    marginBottom: 20,
    height: 100,
    width: 100
    
  },
  image: {
    width: "100%",
    height: "100%",

  }
});

export default HeadingItem;
