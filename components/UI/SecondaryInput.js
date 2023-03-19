import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React, { useRef, useEffect } from "react";

const SecondaryInput = ({ handleInput }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="location-sharp" size={18} color="black" />
      <GooglePlacesAutocomplete
        ref={inputRef}
        // styles={styles.input}
        
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log("DATA: ", data);
          handleInput(data);
          // console.log("DETAILS: ", details )
        }}
        query={{
          key: "AIzaSyDhaj6gSuSlUBRMkegB5uk914KoahTNXtc",
          language: "en",
        }}
      />
      {/* <TextInput style={styles.input} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#A9A9A9",
    paddingVertical: 10,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  // input: {
  //   paddingLeft: 5,
  //   flex: 1,
  //   fontWeight: "500",
  //   padding: 0,
  //   backgroundColor: "red"
  // },
});

export default SecondaryInput;
