import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import * as SMS from "expo-sms";
import React, { useEffect, useState } from "react";
import NavigationController from "../../components/UI/NavigationController";
import { contextData } from "../../context/store";
import moment from "moment";
import SecondaryButton from "../../components/UI/SecondaryButton";

const TripRequestDetailScreen = ({ route }) => {
  const [tripData, setTripData] = useState({});
  const [user, setUser] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);
  const { getTrip, loadingTrip, getUser } = contextData();
  const { id } = route.params;

  useEffect(() => {
    (async () => {
      let isAvail = await SMS.isAvailableAsync();
      setIsAvailable(isAvail);
    })();
  }, []);

  const handleRequest = async () => {
    const firstName = user?.name?.split(" ")[0];
    const destination =
      tripData?.destination?.terms[tripData?.destination?.terms.length - 3]
        ?.value;
    const origin =
      tripData?.origin?.terms[tripData?.origin?.terms.length - 3]?.value;
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [user?.phone],
        `Hello ${firstName}, would you like a seat for a ride from ${origin} to ${destination}`
      );
    } else {
      Alert.alert("Unable to complete", "SMS not available");
    }
  };

  useEffect(() => {
    (async () => {
      const trip = await getTrip(id);
      setTripData(trip);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUser(tripData?.creator);
        // console.log("USER", data);
        setUser({ ...data });
      } catch (error) {
        console.log("error 2", error);
      }
    })();
  }, [tripData]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController />
      {loadingTrip ? (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: user?.profile_picture
                    ? user?.profile_picture
                    : "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png",
                }}
                style={styles.imageContainer}
              />
            </View>
            <Text style={styles.tripDescription}>
              {
                tripData?.origin?.terms[tripData?.origin?.terms.length - 3]
                  ?.value
              }{" "}
              to{" "}
              {
                tripData?.destination?.terms[
                  tripData?.destination?.terms.length - 3
                ]?.value
              }
            </Text>
            <Text style={styles.date}>
              {moment(tripData.date).format("ddd, MMM D YYYY, ha")}
            </Text>
            <Text style={styles.seats}>
              {`${tripData?.seats} needed by ${user?.name?.split(" ")[0]}`}
            </Text>
            <Text style={styles.description}>
              {`"${tripData?.description}"`}
            </Text>
          </ScrollView>
          <View style={styles.requestContainer}>
            <SecondaryButton
              title={`Invite ${user?.name?.split(" ")[0]} to join a trip`}
              radius={10}
              isValid={true}
              onPress={handleRequest}
            />
          </View>
        </View>
      )}
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
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    marginRight: 20,
    backgroundColor: "#E8E8E8",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  tripDescription: {
    marginTop: 14,
    fontSize: 30,
    fontWeight: "bold",
    color: "#006A61",
  },
  date: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
  },
  seats: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "500",
    color: "#555555",
  },
  description: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: "500",
    color: "#555555",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  requestContainer: {
    paddingHorizontal: 20,
  },
});

export default TripRequestDetailScreen;
