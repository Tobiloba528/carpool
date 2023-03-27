import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
  Switch,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavigationController from "../../components/UI/NavigationController";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
import { Dropdown } from "react-native-element-dropdown";
import SecondaryButton from "../../components/UI/SecondaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { contextData } from "../../context/store";
import CustomDate from "../../components/UI/CustomDate";

const data = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
  { label: "Choose", value: "N/A" },
];

const PersonalDetailsScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [gender, setGender] = useState("N/A");
  const [isFocus, setIsFocus] = useState(false);
  const [userImg, setUserImg] = useState();

  const {
    loadingUserData,
    getUserData,
    userId,
    handleUserUpdate,
    updatingUserData,
  } = contextData();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        console.log("user data", userData);
        const names = userData?.name ? userData?.name?.split(" ") : ["", ""];
        setFirstName(names[0]);
        setLastName(names[1]);
        setPhone(userData?.phone)
        setDescription(userData?.description ? userData?.description : "");
        const dob = userData?.date_of_birth
          ? getFormatedDate(new Date(userData?.date_of_birth))
          : getFormatedDate(new Date());
        setSelectedDate(dob);
        const userType =
          userData?.user_type && userData?.user_type === "driver"
            ? true
            : false;
        setIsDriver(userType);
        setGender(userData?.gender ? userData?.gender : "male");
        setUserImg(userData?.user_img !== null && userData?.user_img);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleSubmit = () => {
    handleUserUpdate({
      name: `${firstName} ${lastName}`,
      phone: phone,
      date_of_birth: selectedDate,
      description: description,
      gender: gender,
      user_type: isDriver ? "driver" : "user",
      user_img: userImg || null,
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Personal details"} right="" />
      {loadingUserData ? (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <KeyboardAwareScrollView style={styles.contentContainer}>
          <Text style={styles.title}>Personal Details</Text>
          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Phone number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Date of birth</Text>
            <Pressable
              style={styles.datePicker}
              onPress={() => setIsPickerVisible(true)}
            >
              <Text style={styles.datePickerText}>{selectedDate ? selectedDate : "Pick a date"}</Text>
            </Pressable>
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.message}
              multiline
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Gender</Text>
            {/* <TextInput style={styles.message} /> */}
            <Dropdown
              style={styles.dropdown}
              data={data}
              labelField="label"
              valueField="value"
              value={gender}
              placeholder={!isFocus ? "Select item" : "..."}
              // search={true}
              // searchPlaceholder="Search..."
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setGender(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>User type</Text>
            <View style={styles.switchContainer}>
              <Switch
                value={isDriver}
                onValueChange={() => setIsDriver(!isDriver)}
                trackColor={{ true: "#006A61" }}
              />
              <Text style={styles.switchText}>I'm a driver</Text>
            </View>
          </View>

          <View style={styles.postBtn}>
            <SecondaryButton
              isValid={true}
              title="Update profile"
              radius={10}
              onPress={handleSubmit}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isPickerVisible}
          >
            <CustomDate
              value={selectedDate}
              handleChange={(date) => setSelectedDate(date)}
              closeModal={() => setIsPickerVisible(false)}
            />
          </Modal>
        </KeyboardAwareScrollView>
      )}
      {updatingUserData && (
        <View style={styles.loading2}>
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

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 30,
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
  message: {
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 15,
    paddingTop: 15,
    borderRadius: 15,
    height: 100,
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    color: "black",
    fontSize: 15,
    fontWeight: "300",
    marginLeft: 15,
  },

  dropdown: {
    // height: 50,
    borderRadius: 15,
    backgroundColor: "#E8E8E8",
    padding: 10,
    width: "30%",
  },
  postBtn: {
    marginBottom: 20,
  },
  loading2: {
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
  datePicker: {
    backgroundColor: "#E8E8E8",
    borderRadius: 15,
    padding: 15,
    width: "100%",
  },
  datePickerText: {
    color: "black",
    fontSize: 15,
    fontWeight: "300",
  },
});

export default PersonalDetailsScreen;
