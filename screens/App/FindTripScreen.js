import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import FindTripButton from "../../components/UI/FindTripButton";
import SecondaryButton from "../../components/UI/SecondaryButton";
import NavigationController from "../../components/UI/NavigationController";
import SecondaryInput from "../../components/UI/SecondaryInput";

const FindTrip = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLabel, setModalLabel] = useState("From");
  const [selectedDate, setSelectedDate] = useState(getFormatedDate(new Date()));
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [originData, setOriginData] = useState({});
  const [destinationData, setDestinationData] = useState({});

  const handleInput = (data) => {
    if (modalLabel === "From") {
      setOriginData(data);
    } else {
      setDestinationData(data);
    }
    setIsModalVisible(false)
  };

  const handleSwap = () => {
    const tempOriginData = originData;
    const tempDestinationData = destinationData;
    setDestinationData(tempOriginData);
    setOriginData(tempDestinationData);
  }



  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Find a trip"} />
      <View style={styles.contentContainer}>
        <FindTripButton
          text={originData?.description ? originData?.description : "From"}
          onPress={
            () => {
              setIsModalVisible(true);
              setModalLabel("From");
            }
            // navigation.navigate("SearchAddressScreen", { title: "From" })
          }
        >
          <Ionicons name="location-sharp" size={20} color="black" />
        </FindTripButton>

        <Pressable
          onPress={handleSwap}
          style={({ pressed }) => [styles.swapIcon, pressed && styles.pressed]}
        >
          <MaterialIcons
            name="swap-vertical-circle"
            size={50}
            color="#3B444B"
          />
        </Pressable>




        <FindTripButton
          text={destinationData?.description ? destinationData?.description : "To"}
          onPress={() => {
            setIsModalVisible(true);
            setModalLabel("To");
          }}
        >
          <Ionicons name="location-sharp" size={20} color="black" />
        </FindTripButton>

        <FindTripButton
          text={"Departing (optional)"}
          onPress={() => setIsDateModalVisible(true)}
        >
          <FontAwesome name="calendar-o" size={18} color="black" />
        </FindTripButton>
        <SecondaryButton
          title={"Search"}
          isValid
          bgColor="#3B444B"
          radius={15}
          onPress={() => navigation.navigate("RequestedTripsScreen")}
        />
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        style={{ backgroundColor: "red" }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.topContainer}>
            <View style={styles.topView}>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                style={({ pressed }) => pressed && styles.btnPressed}
              >
                <Text style={[styles.topText]}>{modalLabel}</Text>
              </Pressable>
            </View>

            <View style={styles.topView}>
              <Pressable
                onPress={() => setIsModalVisible(false)}
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
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDateModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              selected={selectedDate}
              onSelectedChange={(date) => setSelectedDate(date)}
              minimumDate={getToday()}
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
            <Pressable onPress={() => setIsDateModalVisible(false)}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  swapIcon: { marginVertical: -25, zIndex: 10, marginLeft: "80%" },
  pressed: {
    opacity: 0.75,
  },

  modalContainer: {
    paddingHorizontal: 10,
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
  profileNameText: {
    textAlign: "center",
  },
  topText: {
    fontWeight: "bold",
    fontSize: 19,
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
});

export default FindTrip;
