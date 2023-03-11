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
} from "react-native";
import React, { useState } from "react";
import NavigationController from "../../components/UI/NavigationController";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";

const PersonalDetailsScreen = () => {
  // const today = new Date()
  // const startDate = getFormatedDate(today.getDate(today.getDate() + 1), "YYYY/MM/DD")
  const [selectedDate, setSelectedDate] = useState(getFormatedDate(new Date()));
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isDriver, setIsDriver] = useState(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Personal details"} right="" />
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>Personal Details</Text>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Date of birth</Text>
          <Pressable
            style={styles.datePicker}
            onPress={() => setIsPickerVisible(true)}
          >
            <Text style={styles.datePickerText}>Choose date</Text>
          </Pressable>
        </View>

        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput style={styles.message} multiline />
        </View>

        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Gender</Text>
          {/* <TextInput style={styles.message} /> */}
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
      </ScrollView>
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
    padding: 15,
    width: "100%",
    borderRadius: 15,
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
    marginLeft: 15
  }
});

export default PersonalDetailsScreen;
