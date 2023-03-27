import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import NavigationController from "../../components/UI/NavigationController";
import { Ionicons } from "@expo/vector-icons";
import { contextData } from "../../context/store";
import { getAge } from "../../utils";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../http";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CustomImageBottomSheet from "../../components/UI/CustomImageBottomSheet";

const ProfileScreen = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const {
    loadingUserData,
    getUserData,
    userId,
    handleUserUpdate,
    updatingUserData,
    getUser,
  } = contextData();
  const isFocused = useIsFocused();
  const refRBSheet = useRef();

  const { visitorId } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (visitorId) {
          const userData = await getUser(visitorId);
          const names = userData?.name ? userData?.name?.split(" ") : ["", ""];
          setFirstName(names[0]);
          setGender(userData?.gender);
          setDescription(userData.description);
          setImageUri(userData?.profile_picture);

          const date = userData?.createdAt;
          // console.log("CREATED AT", date);
          setCreatedAt(date);

          if (userData?.date_of_birth) {
            const age = getAge(userData?.date_of_birth);
            setAge(age);
          }
        } else {
          const userData = await getUserData();
          // console.log("user data", userData);
          const names = userData?.name ? userData?.name?.split(" ") : ["", ""];
          setFirstName(names[0]);
          setGender(userData?.gender);
          setDescription(userData.description);
          setImageUri(userData?.profile_picture);

          const date = userData?.createdAt;
          // console.log("CREATED AT", date);
          setCreatedAt(date);

          if (userData?.date_of_birth) {
            const age = getAge(userData?.date_of_birth);
            setAge(age);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [userId, isFocused, updatingUserData]);

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
            handleUserUpdate({ profile_picture: url });
            // console.log("THE URL", url);
          })
          .catch((error) => console.log(error));
        Alert.alert("Operation error", "Error uploading picture");
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Operation error", "Error uploading picture");
      });
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
        // if(result.assets[0].fileSize > 2500000){
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
      Alert.alert("Operation error", "Error uploading picture");
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
        // if(result.assets[0].fileSize > 2500000){
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
      Alert.alert("Operation error", "Error uploading picture");
      console.log(error);
    }
  };

  const closeButtomSheet = () => {
    refRBSheet.current.close();
  };

  const checkImage = () => {
    if (image || imageUri) {
      refRBSheet.current.close();
      navigation.navigate("imageScreen", { image: image || imageUri });
    } else {
      refRBSheet.current.close();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loadingUserData ? (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <NavigationController
            title={`${firstName}'s profile`}
            right={!visitorId && "Edit"}
            onPressRight={
              !visitorId
                ? () => navigation.navigate("ProfileSettings")
                : () => {}
            }
          />
          <ScrollView>
            <View style={styles.contentContainer}>
              <View style={styles.profileInfoContainer}>
                <View style={styles.profileInfo}>
                  <Pressable
                    onPress={() => refRBSheet?.current?.open()}
                    style={({ pressed }) => pressed && styles.profilePressed}
                  >
                    <View style={styles.profileImageContainer}>
                      {/* <Image
                    style={styles.profileImage}
                    source={require("../../assets/user.jpg")}
                  /> */}
                      <ImageBackground
                        source={{
                          uri: imageUri
                            ? imageUri
                            : image
                            ? image
                            : "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png",
                        }}
                        style={styles.profileImage}
                      >
                        <View style={styles.iconContainer}>
                          <Ionicons
                            name="camera"
                            size={30}
                            color="white"
                            style={styles.profileIcon}
                          />
                        </View>
                      </ImageBackground>
                    </View>
                  </Pressable>
                  <View style={styles.profileTitleContainer}>
                    <Text style={styles.profileTitle1}>{firstName}</Text>
                    <Text style={styles.profileTitle2}>Joined {createdAt}</Text>
                    <Text style={styles.profileTitle3}>
                      Gender: {gender}, {age ? `${age} years old` : "Age: N/A"}{" "}
                    </Text>
                  </View>
                </View>

                <View style={styles.bioContainer}>
                  <Text style={[styles.profileTitle2, styles.bioText]}>
                    Bio
                  </Text>
                  <Text style={styles.profileTitle3}>
                    {description === "" ? "N/A" : description}
                  </Text>
                </View>
              </View>

              <View style={styles.appUsage}>
                <View style={styles.usageItem}>
                  <FontAwesome5 name="car" size={24} color="black" />
                  <Text style={styles.usageValue}>0</Text>
                  <Text style={styles.profileTitle3}>people driven</Text>
                </View>
                <View style={styles.usageItem}>
                  <FontAwesome5 name="user-alt-slash" size={24} color="black" />
                  <Text style={styles.usageValue}>0</Text>
                  <Text style={styles.profileTitle3}>rides taken</Text>
                </View>
                <View style={styles.usageItem}>
                  <FontAwesome5 name="road" size={24} color="black" />
                  <Text style={styles.usageValue}>0</Text>
                  <Text style={styles.profileTitle3}>km shared</Text>
                </View>
              </View>

              <View style={styles.styleSpace}></View>
              <View style={styles.reviews}>
                <Text style={styles.profileTitle3}>No reviews yet</Text>
              </View>
              <View style={styles.styleSpace}></View>
            </View>
          </ScrollView>
          <CustomImageBottomSheet
            myRef={refRBSheet}
            handleCameraPhoto={takePhotoFromCamera}
            handleLibraryPhoto={choosePhotoFromLibrary}
            handleCancel={checkImage}
            image={image || imageUri}
            visitorId={visitorId}
          />
        </View>
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

  contentContainer: {
    flex: 1,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileInfoContainer: {
    paddingTop: 30,
  },
  profileInfo: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    marginRight: 20,
    backgroundColor: "#E8E8E8",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileIcon: {
    opacity: 0.7,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePressed: {
    opacity: 0.7,
  },

  profileTitle1: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  profileTitle2: {
    fontWeight: "500",
    marginBottom: 8,
  },
  profileTitle3: {
    color: "#555555",
  },
  bioContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
  },
  bioText: {
    fontWeight: "bold",
  },
  appUsage: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 40,
    justifyContent: "space-between",
  },
  usageItem: {
    display: "flex",
    alignItems: "center",
  },
  usageValue: {
    fontWeight: "600",
    paddingVertical: 5,
    fontSize: 20,
  },
  styleSpace: {
    height: 25,
    backgroundColor: "#F5F5F5",
  },
  reviews: {
    padding: 18,
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
});

export default ProfileScreen;
