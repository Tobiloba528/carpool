import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";

const NavigationController = ({ title, right = "", onPressRight }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topContainer}>
      <View style={styles.topView}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => pressed && styles.btnPressed}
        >
          <FontAwesome
            style={styles.topText}
            name="angle-left"
            size={30}
            color="black"
          />
        </Pressable>
      </View>

      <View style={styles.topView}>
        <Text style={[styles.profileNameText, styles.topText]}>{title}</Text>
      </View>

      <View style={styles.topView}>
        <Pressable
          style={({ pressed }) => pressed && styles.btnPressed}
          onPress={onPressRight}
        >
          <Text style={[styles.topText, styles.settingsText]}>{right}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    // backgroundColor: "red"
  },
  topView: {
    flex: 1,
  },
  profileNameText: {
    textAlign: "center",
  },
  topText: {
    fontWeight: "bold",
  },
  settingsText: {
    textAlign: "right",
  },
  btnPressed: {
    opacity: 0.5,
  },
});

export default NavigationController;
