import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
  Modal,
  Alert,
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
import CustomDate from "../../components/UI/CustomDate";
import CustomAddressSearch from "../../components/UI/CustomAddressSearch";
import { contextData } from "../../context/store";

const FindTrip = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLabel, setModalLabel] = useState("From");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [originData, setOriginData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);

  const { handleFetchTrips } = contextData();

  const handleInput = (data) => {
    if (modalLabel === "From") {
      setOriginData(data);
    } else {
      setDestinationData(data);
    }
    setIsModalVisible(false);
  };

  const handleSwap = () => {
    const tempOriginData = originData;
    const tempDestinationData = destinationData;
    setDestinationData(tempOriginData);
    setOriginData(tempDestinationData);
  };

  const handleSubmit = () => {
    if (!destinationData && !originData) {
      Alert.alert("Error", "Please pick at least an origin or a destination");
      return;
    }

    handleFetchTrips(originData, destinationData, selectedDate);
    navigation.navigate("RequestedTripsScreen", {
      originData: originData,
      destinationData: destinationData,
      selectedDate: selectedDate,
    });
  };

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
          text={
            destinationData?.description ? destinationData?.description : "To"
          }
          onPress={() => {
            setIsModalVisible(true);
            setModalLabel("To");
          }}
        >
          <Ionicons name="location-sharp" size={20} color="black" />
        </FindTripButton>

        <FindTripButton
          text={selectedDate ? selectedDate : "Departing (optional)"}
          onPress={() => setIsDateModalVisible(true)}
        >
          <FontAwesome name="calendar-o" size={18} color="black" />
        </FindTripButton>
        <SecondaryButton
          title={"Search"}
          isValid
          bgColor="#3B444B"
          radius={15}
          onPress={handleSubmit}
        />
      </View>

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
          minDate={getToday()}
        />
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
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  contentContainer2: {
    flex: 1,
    paddingHorizontal: 10,
  },
  swapIcon: { marginVertical: -25, zIndex: 10, marginLeft: "80%" },
  pressed: {
    opacity: 0.75,
  },
  profileNameText: {
    textAlign: "center",
  },
});

export default FindTrip;
