import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import NavigationController from "../../components/UI/NavigationController";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import FindTripButton from "../../components/UI/FindTripButton";
import SecondaryButton from "../../components/UI/SecondaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SecondaryInput from "../../components/UI/SecondaryInput";
import { contextData } from "../../context/store";

const PostRequest = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLabel, setModalLabel] = useState("From");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [seats, setSeats] = useState(null);
  const [originData, setOriginData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);

  const { handleSaveTrip, loadingSaveTrip, tripSaved } = contextData();

  const handleInput = (data) => {
    if (modalLabel === "From") {
      setOriginData(data);
    } else {
      setDestinationData(data);
    }
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    if (
      !originData ||
      !destinationData ||
      !description ||
      !seats ||
      !selectedDate
    ) {
      Alert.alert("Incomplete form", "Kindly complete the form");
      return;
    }
    handleSaveTrip({
      origin: originData,
      destination: destinationData,
      description: description,
      date: selectedDate,
      seats: seats,
      type: "trip_rider",
    });
    if(tripSaved){
      setSelectedDate(null);
      setDescription("")
      setSeats(null)
      setOriginData(null)
      setDestinationData(null)
    }

  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title="Post a request" />
      <KeyboardAwareScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>From</Text>
          <FindTripButton
            text={
              originData?.description ? originData?.description : "Enter Origin"
            }
            onPress={() => {
              setIsModalVisible(true);
              setModalLabel("From");
            }}
          >
            <Ionicons name="location-sharp" size={20} color="black" />
          </FindTripButton>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>To</Text>
          <FindTripButton
            text={
              destinationData?.description
                ? destinationData?.description
                : "Enter Destination"
            }
            onPress={() => {
              setIsModalVisible(true);
              setModalLabel("To");
            }}
          >
            <Ionicons name="location-sharp" size={20} color="black" />
          </FindTripButton>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Departure</Text>
          <FindTripButton
            text={selectedDate ? selectedDate : "Pick a departure date"}
            onPress={() => setIsDateModalVisible(true)}
          >
            <FontAwesome name="calendar-o" size={18} color="black" />
          </FindTripButton>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Seats Required</Text>
          <TextInput
            style={styles.seatInput}
            value={seats}
            keyboardType={"number-pad"}
            onChangeText={(text) => setSeats(text)}
            placeholder={"Enter seat numbers"}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={styles.message}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline
            placeholder="Tell driver a little bit more about you and why you're travelling"
          />
        </View>
        <View style={styles.postBtn}>
          <SecondaryButton
            isValid={true}
            title="Post request"
            radius={10}
            onPress={handleSubmit}
          />
        </View>
      </KeyboardAwareScrollView>
      {loadingSaveTrip && <View  style={styles.loading}>
          <ActivityIndicator size={"large"}/>
        </View>}

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
              mode="datepicker"
              selected={selectedDate}
              onSelectedChange={(date) => {
                setSelectedDate(date);
              }}
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
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    marginTop: 20,
  },
  seatInput: {
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
    marginBottom: 10,
    fontWeight: "300",
    color: "#696969",
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
  loading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    backgroundColor: 'black',
  }

});

export default PostRequest;
