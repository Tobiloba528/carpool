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
import CustomDate from "../../components/UI/CustomDate";
import CustomAddressSearch from "../../components/UI/CustomAddressSearch";

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
    if (tripSaved) {
      setSelectedDate(null);
      setDescription("");
      setSeats(null);
      setOriginData(null);
      setDestinationData(null);
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
      {loadingSaveTrip && (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} />
        </View>
      )}

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.contentContainer2}>
          <CustomAddressSearch
            closeModal={() => setIsModalVisible(false)}
            handleInput={handleInput}
            modalLabel={modalLabel}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDateModalVisible}
      >
        <CustomDate
          value={selectedDate}
          handleChange={(date) => setSelectedDate(date)}
          closeModal={() => setIsDateModalVisible(false)}
          datepicker
          minDate={getToday()}
        />
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
  contentContainer2: {
    flex: 1,
    paddingHorizontal: 10,
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

export default PostRequest;
