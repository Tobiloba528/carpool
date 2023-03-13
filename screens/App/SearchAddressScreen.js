import { View, Text, Pressable, StyleSheet, Platform, StatusBar } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SecondaryInput from "../../components/UI/SecondaryInput";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchAddressScreen = ({ navigation, route }) => {

    const { title } = route.params;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topView}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => pressed && styles.btnPressed}
          >
           <Text style={[styles.topText]}>{title}</Text>
          </Pressable>
        </View>

        <View style={styles.topView}>
          <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => pressed && styles.btnPressed}>
            <Text style={[styles.closeText]}>Close</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <SecondaryInput />
        <Text style={styles.inputText}>Enter at least three characters to get started</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 10,
        backgroundColor: "white",
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    topContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10
      },
      topView: {
        flex: 1,
      },
      profileNameText: {
        textAlign: "center",
      },
      topText: {
        fontWeight: "bold",
        fontSize: 19
      },
      closeText: {
        textAlign: "right",
        fontWeight: "400",
        fontSize: 17
      },
      btnPressed: {
        opacity: 0.5,
      },
      inputContainer: {
        marginTop: 15
      },
      inputText: {
        marginTop: 10,
        color: "#555555"
      }
    
})

export default SearchAddressScreen;
