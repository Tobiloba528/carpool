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

const data = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const PersonalDetailsScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(getFormatedDate(new Date()));
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [gender, setGender] = useState("male");
  const [isFocus, setIsFocus] = useState(false);

  const { loadingUserData, getUserData, userId, handleUserUpdate } =
    contextData();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        console.log("user data", userData);
        const names = userData?.name ? userData?.name?.split(" ") : ["", ""];
        setFirstName(names[0]);
        setLastName(names[1]);
        setDescription(userData?.description ? userData?.description : "");
        const dob = userData?.date_of_birth
          ? getFormatedDate(new Date(userData?.date_of_birth))
          : getFormatedDate(new Date());
        setSelectedDate(dob);
        const userType = userData?.user_type && userData?.user_type === "driver" ? true : false
        setIsDriver(userType)
        setGender(userData?.gender ? userData?.gender : "male")
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleSubmit = () => {
    handleUserUpdate({
      name: `${firstName} ${lastName}`,
      date_of_birth: selectedDate,
      description: description,
      gender: gender,
      user_type: isDriver ? "driver" : "user",
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
            <Text style={styles.inputLabel}>Date of birth</Text>
            <Pressable
              style={styles.datePicker}
              onPress={() => setIsPickerVisible(true)}
            >
              <Text style={styles.datePickerText}>{selectedDate}</Text>
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
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  selected={selectedDate}
                  onSelectedChange={(date) => setSelectedDate(date)}
                  options={{
                    textHeaderColor: "#006A61",
                    textDefaultColor: "black",
                    mainColor: "#006A61",
                    selectedTextColor: "#fff",
                    textSecondaryColor: "#006A61",
                    // backgroundColor: '#090C08',
                    // borderColor: 'rgba(122, 146, 165, 0.1)',
                  }}
                />
                <Pressable onPress={() => setIsPickerVisible(false)}>
                  <Text>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </KeyboardAwareScrollView>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    // backgroundColor: "red",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});

export default PersonalDetailsScreen;
