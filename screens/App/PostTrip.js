import React, { useState, useRef } from "react";
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
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
import CustomDate from "../../components/UI/CustomDate";
import CustomAddressSearch from "../../components/UI/CustomAddressSearch";
import CustomImageBottomSheet from "../../components/UI/CustomImageBottomSheet";
import { storage } from "../../http";

const PostTrip = ({ navigation }) => {
  const [skipVehicle, setSkipVehicle] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLabel, setModalLabel] = useState("Enter an origin");
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [originData, setOriginData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);
  const [description, setDescription] = useState("");
  const [seats, setSeats] = useState(null);
  const [price, setPrice] = useState(null);

  const [vehicleImage, setVehicleImage] = useState(null);
  const [vehicleModel, setVehicleModel] = useState(null);
  const [vehicleColor, setVehicleColor] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState(null);
  const [vehicleYear, setVehicleYear] = useState(null);

  const [image, setImage] = useState(null);

  const refRBSheet = useRef();
  const { handleSaveTrip, loadingSaveTrip, tripSaved } = contextData();

  const handleInput = (data) => {
    if (modalLabel === "Enter an origin") {
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
      !selectedDate ||
      !price ||
      !agreeToTerms
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
      price: price,
      type: "trip_driver",
      vehicle: {
        image: vehicleImage,
        model: vehicleModel,
        color: vehicleColor,
        type: vehicleType,
        year: vehicleYear,
        licensePlate: vehicleLicensePlate,
      },
    });
    if (tripSaved) {
      setSelectedDate(null);
      setDescription("");
      setSeats(null);
      setOriginData(null);
      setDestinationData(null);
      setPrice(null);
      setVehicleImage(null);
      setVehicleModel(null);
      setVehicleColor(null);
      setVehicleType(null);
      setVehicleYear(null);
      setVehicleLicensePlate(null);
      setAgreeToTerms(false);
    }
  };

  // <----------------------------------------------------------------------->
  const handleSaveImage = async (imageUri) => {
    const img = await fetch(imageUri);
    const blob = await img.blob();
    let filename = imageUri?.substring(imageUri?.lastIndexOf("/") + 1);
    console.log(filename);

    const storageRef = ref(storage, `${filename}`);

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        getDownloadURL(storageRef)
          .then((url) => {
            console.log("Totally done.");
            setVehicleImage(url);
          })
          .catch((error) => console.log(error));
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => console.log(error));
  };

  const takePhotoFromCamera = async () => {
    try {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      console.log(cameraStatus);
      if (cameraStatus.status === "granted") {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);
        // if (result.assets[0].fileSize > 2500000) {
        //   Alert.alert("File size exceeded", "Kind choose a small size.");
        //   return;
        // }

        if (!result.canceled) {
          setImage(result.assets[0].uri);
          handleSaveImage(result.assets[0].uri);
          closeButtomSheet();
        }
      } else {
        Alert.alert(
          "Camera Permission required",
          "Kindly give camera permision",
          "OK"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const choosePhotoFromLibrary = async () => {
    try {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(galleryStatus);
      if (galleryStatus.status === "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);
        // if (result.assets[0].fileSize > 2500000) {
        //   Alert.alert("File size exceeded", "Kind choose a small size.");
        //   return;
        // }

        if (!result.canceled) {
          setImage(result.assets[0].uri);
          handleSaveImage(result.assets[0].uri);
          closeButtomSheet();
        }
      } else {
        Alert.alert(
          "Media Permission required",
          "Kindly give media permision",
          "OK"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeButtomSheet = () => {
    refRBSheet.current.close();
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
            text={
              originData?.description
                ? originData?.description
                : "Enter an origin"
            }
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
            text={
              destinationData?.description
                ? destinationData?.description
                : "Enter a destination"
            }
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
              onPress={() => refRBSheet?.current?.open()}
              style={({ pressed }) => [
                styles.addCarContainer,
                pressed && styles.addCarContainerPressed,
              ]}
            >
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : "https://static.vecteezy.com/system/resources/thumbnails/008/694/437/small/white-and-grey-background-space-design-concept-decorative-web-layout-or-poster-banner-vector.jpg",
                }}
                style={styles.carImagebg}
              >
                {/* <FontAwesome5 name="car-side" size={100} color="#E8E8E8" /> */}
                <FontAwesome5
                  name="car"
                  size={100}
                  color="#E8E8E8"
                  style={styles.addCarContainerPressed}
                />
                <Text style={styles.addCarText}>Click to add photo</Text>
              </ImageBackground>
            </Pressable>

            <View style={styles.carInfoItem}>
              <Text style={styles.carInfoLabel}>Model</Text>
              <TextInput
                style={styles.carInfoInput}
                placeholder="e.g. Ford Focus "
                value={vehicleModel}
                onChangeText={(text) => setVehicleModel(text)}
              />
            </View>
            <View style={styles.carInfoItem}>
              <Text style={styles.carInfoLabel}>Color</Text>
              <TextInput
                style={styles.carInfoInput}
                placeholder="Green"
                value={vehicleColor}
                onChangeText={(text) => setVehicleColor(text)}
              />
            </View>
            <View style={styles.carInfoItem}>
              <Text style={styles.carInfoLabel}>Type</Text>
              <TextInput
                style={styles.carInfoInput}
                placeholder="SUV"
                value={vehicleType}
                onChangeText={(text) => setVehicleType(text)}
              />
            </View>
            <View style={styles.carInfoItem}>
              <Text style={styles.carInfoLabel}>Year</Text>
              <TextInput
                style={styles.carInfoInput}
                placeholder="YYYY"
                value={vehicleYear}
                onChangeText={(text) => setVehicleYear(text)}
              />
            </View>
            <View style={styles.carInfoItem}>
              <Text style={styles.carInfoLabel}>License Plate</Text>
              <TextInput
                style={styles.carInfoInput}
                placeholder="POP123"
                value={vehicleLicensePlate}
                onChangeText={(text) => setVehicleLicensePlate(text)}
              />
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
          keyboardType={"number-pad"}
          value={seats}
          onChangeText={(text) => setSeats(text)}
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
          <TextInput
            style={styles.seatPriceInput}
            keyboardType={"number-pad"}
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </View>

        <View style={styles.space}></View>
        <Text style={styles.subtitle}>Trip description</Text>
        <Text style={styles.smallText}>
          Add any details relevant to your trip for passengers before the book
        </Text>
        <TextInput
          style={styles.message}
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
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
      <CustomImageBottomSheet
        myRef={refRBSheet}
        handleCameraPhoto={takePhotoFromCamera}
        handleLibraryPhoto={choosePhotoFromLibrary}
        handleCancel={closeButtomSheet}
      />
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
  contentContainer2: {
    flex: 1,
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
    borderWidth: 1,
    borderColor: "#848482",
    borderRadius: 5,
    marginBottom: 40,
  },
  addCarContainerPressed: {
    opacity: 0.7,
  },
  carImagebg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 5,
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

  profileNameText: {
    textAlign: "center",
  },
  secondaryInputContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
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

export default PostTrip;
