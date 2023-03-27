import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  StatusBar
} from "react-native";
import React, { useState } from "react";
import NavigationController from "../../components/UI/NavigationController";
import { contextData } from "../../context/store";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { handleChangePassword, changingPassword } = contextData();

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      Alert.alert("The passwords do not match", "Correct password.");
      return;
    }
    handleChangePassword(password);
    setConfirmPassword("")
    setPassword("")
    // console.log(password, confirmPassword);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Change Password"} right="" />
      <View style={styles.contentContainer}>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry
          />
        </View>

        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="Confirm Password"
            secureTextEntry
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
          onPress={handleSubmit}
        >
          <Text style={styles.btnText}>Change Password</Text>
        </Pressable>
      </View>
      {changingPassword && (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  contentContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  inputItem: {
    marginBottom: 30,
  },
  inputLabel: {
    color: "black",
    fontSize: 15,
    fontWeight: "300",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#E8E8E8",
    padding: 15,
    width: "75%",
    borderRadius: 15,
  },
  btn: {
    backgroundColor: "#006A61",
    padding: 15,
    width: 200,
    alignItems: "center",
    borderRadius: 10,
  },
  btnPressed: {
    opacity: 0.7,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
    backgroundColor: "black",
  },
});

export default ChangePassword;
