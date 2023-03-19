import { View, Text, SafeAreaView, Pressable, StyleSheet, StatusBar } from "react-native";
import React from "react";
import SecondaryInput from "./SecondaryInput";

const CustomAddressSearch = ({ closeModal, handleInput, modalLabel }) => {
  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topView}>
          <Pressable
            onPress={closeModal}
            style={({ pressed }) => pressed && styles.btnPressed}
          >
            <Text style={[styles.topText]}>{modalLabel}</Text>
          </Pressable>
        </View>

        <View style={styles.topView}>
          <Pressable
            onPress={closeModal}
            style={({ pressed }) => pressed && styles.btnPressed}
          >
            <Text style={[styles.closeText]}>Close</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <SecondaryInput handleInput={handleInput} />
        <Text style={styles.inputText}>
          Enter at least three characters to get started
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        paddingHorizontal: 20,
        backgroundColor: "white",
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
      },
    
      topContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
      },
      topView: {
        flex: 1,
      },
      closeText: {
        textAlign: "right",
        fontWeight: "400",
        fontSize: 17,
      },
      btnPressed: {
        opacity: 0.5,
      },
      inputContainer: {
        marginTop: 15,
      },
      inputText: {
        marginTop: 10,
        color: "#555555",
      },
      topText: {
        fontWeight: "bold",
        fontSize: 19,
      },
})

export default CustomAddressSearch;
