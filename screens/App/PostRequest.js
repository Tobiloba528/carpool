import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import NavigationController from "../../components/UI/NavigationController";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import FindTripButton from "../../components/UI/FindTripButton";
import SecondaryButton from "../../components/UI/SecondaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PostRequest = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title="Post a request" />
      <KeyboardAwareScrollView style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>From</Text>
            <FindTripButton
              text={"Enter Origin"}
              onPress={() =>
                navigation.navigate("SearchAddressScreen", {
                  title: "From",
                })
              }
            >
              <Ionicons name="location-sharp" size={20} color="black" />
            </FindTripButton>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>To</Text>
            <FindTripButton
              text={"Enter Destination"}
              onPress={() =>
                navigation.navigate("SearchAddressScreen", {
                  title: "To",
                })
              }
            >
              <Ionicons name="location-sharp" size={20} color="black" />
            </FindTripButton>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Departure</Text>
            <FindTripButton
              text={"Pick a departure date"}
              onPress={() =>
                navigation.navigate("SearchAddressScreen", {
                  title: "",
                })
              }
            >
              <FontAwesome name="calendar-o" size={18} color="black" />
            </FindTripButton>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Seats Required</Text>
            <FindTripButton
              text={"Select number"}
              onPress={() =>
                navigation.navigate("SearchAddressScreen", {
                  title: "",
                })
              }
            ></FindTripButton>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.message}
              multiline
              placeholder="Tell driver a little bit more about you and why you're travelling"
            />
          </View>
          <View style={styles.postBtn}>
            <SecondaryButton isValid={true} title="Post request" radius={10} />
          </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: "500",
    fontSize: 17,
    marginBottom: 10,
  },
  message: {
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 15,
    paddingTop: 15,
    borderRadius: 10,
    height: 150,
  },
  postBtn: {
    marginTop: 20
  },
  // postBtn: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderTopWidth: 1,
  //   borderTopColor: "#A9A9A9",
  //   paddingVertical: 15,
  // },
  // postText: {
  //   fontWeight: "600",
  //   color: "#A9A9A9",
  // },
});

export default PostRequest;
