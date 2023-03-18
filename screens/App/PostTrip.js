import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import Checkbox from "expo-checkbox";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import FindTripButton from "../../components/UI/FindTripButton";
import NavigationController from "../../components/UI/NavigationController";
import SecondaryButton from "../../components/UI/SecondaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SecondaryInput from "../../components/UI/SecondaryInput";
import { contextData } from "../../context/store";

const PostTrip = ({ navigation }) => {
  const [skipVehicle, setSkipVehicle] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLabel, setModalLabel] = useState("Enter an origin");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [originData, setOriginData] = useState({});
  const [destinationData, setDestinationData] = useState({});

  const handleInput = (data) => {
    if (modalLabel === "Enter an origin") {
      setOriginData(data);
    } else {
      setDestinationData(data);
    }
    setIsModalVisible(false)
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Post a trip"} />
      <KeyboardAwareScrollView style={styles.contentContainer}>
        <Text style={styles.title}>Post a trip</Text>

        <View style={styles.space}></View>

        <Text style={styles.subtitle}>Itinerary</Text>
        <Text style={styles.smallText}>
          Your origin, destination and stops you're willing to make along the
          way
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Origin</Text>
          <FindTripButton
            text={originData?.description ? originData?.description : "Enter an origin"}
            onPress={() => {
              setIsModalVisible(true);
              setModalLabel("Enter an origin");
            }}
          >
            <Ionicons name="location-sharp" size={20} color="black" />
          </FindTripButton>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Destination</Text>
          <FindTripButton
            text={ destinationData?.description ? destinationData?.description : "Enter a destination"}
            onPress={() => {
              setIsModalVisible(true);
              setModalLabel("Enter a destination");
            }}
          >
            <Ionicons name="location-sharp" size={20} color="black" />
          </FindTripButton>
        </View>

        {/* <View style={styles.inputContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.inputLabel, styles.extraMargin]}>Stops</Text>
            <AntDesign name="questioncircle" size={20} color="black" />
          </View>
          <FindTripButton
            text={"Add a stop to get more bookings"}
            onPress={() =>
              navigation.navigate("SearchAddressScreen", {
                title: "Enter a stop",
              })
            }
          >
            <Ionicons name="add-circle-outline" size={20} color="black" />
          </FindTripButton>
        </View> */}

        <View style={styles.space}></View>

        <Text style={styles.subtitle}>Ride Schedule</Text>
        <Text style={styles.smallText}>
          Enter a precies date and time{" "}
          <Text style={styles.extraBold}>
            with am(morning) or pm (afternoon)
          </Text>
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Leaving</Text>
          <View style={styles.scheduleInputContainer}>
            <View style={styles.dateContainer}>
              <FindTripButton
                text={selectedDate ? selectedDate : "Departure Date"}
                style={styles.extraRadius}
                onPress={() => setIsDateModalVisible(true)}
              >
                <FontAwesome name="calendar-o" size={18} color="black" />
              </FindTripButton>
            </View>
          </View>
        </View>

        <View style={styles.space}></View>

        <Text style={styles.subtitle}>Vehicle details</Text>
        <Text style={styles.smallText}>
          This helps you get more bookings and makes it easier for passenger to
          identify your vehicle during pick-up
        </Text>

        <View style={styles.skipVehicle}>
          <Checkbox
            style={styles.checkbox}
            value={skipVehicle}
            onValueChange={setSkipVehicle}
          />
          <Text style={styles.skipText}>Skip vehicle</Text>
        </View>
        {skipVehicle ? (
          <Text style={styles.skipVehicleText}>
            {" "}
            No vehicle will be added to your trip
          </Text>
        ) : (
          <View>
            <Pressable
              style={({ pressed }) => [
                styles.addCarContainer,
                pressed && styles.addCarContainerPressed,
              ]}
            >
              {/* <FontAwesome5 name="car-side" size={100} color="#E8E8E8" /> */}
              <FontAwesome5 name="car" size={100} color="#E8E8E8" />
              <Text style={styles.addCarText}>Add photo</Text>
            </Pressable>

            <View style={styles.carInfoItem}>
              <Text style={styles.carInfoLabel}>Model</Text>
              <TextInput
                style={styles.carInfoInput}
                placeholder="e.g. Ford Forcus "
              />
            </View>
            <View style={styles.carInfoItem}>
              <Text style={styles.carInfoLabel}>Color</Text>
              <TextInput style={styles.carInfoInput} placeholder="Green" />
            </View>
            <View style={styles.carInfoItem}>
              <Text style={styles.carInfoLabel}>Color</Text>
              <TextInput style={styles.carInfoInput} placeholder="SUV" />
            </View>
            <View style={styles.carInfoItem}>
              <Text style={styles.carInfoLabel}>Year</Text>
              <TextInput style={styles.carInfoInput} placeholder="YYYY" />
            </View>
            <View style={styles.carInfoItem}>
              <Text style={styles.carInfoLabel}>License Plate</Text>
              <TextInput style={styles.carInfoInput} placeholder="POP123" />
            </View>
          </View>
        )}

        <View style={styles.space}></View>
        <Text style={styles.subtitle}>Empty Seats</Text>
        <Text style={styles.smallNote}>
          <Text style={styles.proTip}>Pro tip: </Text>We recommend putting a
          maximum of 2 people per row to ensure everyone's comfort
        </Text>
        <TextInput
          style={[styles.carInfoInput, styles.seatAvailable]}
          placeholder="Select a number"
        />

        <View style={styles.space}></View>

        <Text style={styles.subtitle}>Pricing</Text>
        <Text style={styles.smallText}>
          Enter a fair price per seat to cover your gas and other expenses. Note
          that all prices are CAD
        </Text>
        <Text style={styles.seatPrice}>Price per seat</Text>
        <View style={styles.seatPriceInputContainer}>
          <Text>$</Text>
          <TextInput style={styles.seatPriceInput} />
        </View>

        <View style={styles.space}></View>
        <Text style={styles.subtitle}>Trip description</Text>
        <Text style={styles.smallText}>
          Add any details relevant to your trip for passengers before the book
        </Text>
        <TextInput
          style={styles.message}
          multiline
          placeholder="We recommend writing the exact pick-up and drop-off locations in your description"
        />

        <View style={styles.terms}>
          <Checkbox
            style={styles.checkbox}
            value={agreeToTerms}
            onValueChange={setAgreeToTerms}
          />
          <Text style={styles.skipText}>
            I agree to these rules, to the{" "}
            <Text style={styles.extraUnderline}>
              Driver Cancellation policy
            </Text>
            , <Text style={styles.extraUnderline}>Terms of service</Text> and{" "}
            <Text style={styles.extraUnderline}>the Privacy Policy</Text> and{" "}
            <Text style={styles.extraBold}>
              {" "}
              I understand that my account could be suspended if I break the
              rules.
            </Text>
          </Text>
        </View>

        <View style={styles.postBtn}>
          <SecondaryButton isValid={true} title="Post request" radius={10} />
        </View>
      </KeyboardAwareScrollView>

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

          <View style={styles.secondaryInputContainer}>
            <SecondaryInput handleInput={handleInput}/>
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
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
  },
  space: {
    width: "20%",
    padding: 2,
    backgroundColor: "#E8E8E8",
    borderRadius: 5,
    marginTop: 60,
    marginBottom: 40,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  smallText: {
    color: "#848482",
    fontSize: 15,
    marginBottom: 30,
    fontWeight: "300",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: "500",
    fontSize: 17,
    marginBottom: 10,
  },
  extraMargin: {
    marginRight: 10,
  },
  extraBold: {
    color: "black",
    fontWeight: "300",
  },
  extraRadius: {
    borderRadius: 15,
  },
  scheduleInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateContainer: {
    width: "50%",
    marginRight: 10,
  },
  atText: {
    marginBottom: 15,
  },
  timeContainer: {
    marginLeft: 10,
    width: "25%",
  },
  skipVehicle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
    padding: 1,
    borderRadius: 5,
  },
  skipText: {
    color: "#848482",
    fontSize: 15,
    fontWeight: "300",
  },
  addCarContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#848482",
    borderRadius: 5,
    marginBottom: 40,
  },
  addCarContainerPressed: {
    opacity: 0.7
  },
  addCarText: {
    color: "#848482",
    fontSize: 15,
    fontWeight: "300",
    marginTop: 20,
  },
  carInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  carInfoLabel: {
    width: "40%",
    color: "#848482",
    fontSize: 15,
    fontWeight: "400",
  },
  carInfoInput: {
    backgroundColor: "#E8E8E8",
    width: "60%",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  skipVehicleText: {
    color: "#848482",
    fontSize: 15,
    fontWeight: "300",
    fontStyle: "italic",
    marginBottom: 30,
  },
  seatAvailable: {
    width: "100%",
  },
  smallNote: {
    backgroundColor: "#BEDBED",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#4B61D1",
    lineHeight: 20,
    marginVertical: 40,
  },
  proTip: {
    fontWeight: "600",
  },
  seatPrice: {
    fontWeight: "600",
    marginBottom: 30,
  },
  seatPriceInputContainer: {
    flexDirection: "row",
    backgroundColor: "#E8E8E8",
    padding: 10,
    borderRadius: 10,
    width: "20%",
  },
  seatPriceInput: {
    flex: 1,
    paddingLeft: 10,
  },
  message: {
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 15,
    paddingTop: 15,
    borderRadius: 10,
    height: 100,
  },
  terms: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 40,
    marginBottom: 20,
  },
  extraUnderline: {
    textDecorationLine: "underline",
  },
  postBtn: {
    marginBottom: 20,
  },

  modalContainer: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    paddingHorizontal: 10,
  },

  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
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
  secondaryInputContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
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

export default PostTrip;
