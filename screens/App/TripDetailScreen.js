import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import NavigationController from "../../components/UI/NavigationController";
import SecondaryButton from "../../components/UI/SecondaryButton";
import { contextData } from "../../context/store";
import moment from "moment";

const TripDetailScreen = ({ route }) => {
  const [tripData, setTripData] = useState({});
  const [passengers, setPassengers] = useState([]);
  const [driver, setDriver] = useState([]);
  const { getTrip, loadingTrip, getUser } = contextData();

  const { id } = route.params;

  useEffect(() => {
    (async () => {
      // console.log("TRIP ID", id);
      const trip = await getTrip(id);
      // console.log("GOTTEN TRIP DATA!!!", trip);
      setTripData(trip);

      getPassengers(trip);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUser(tripData?.creator);
        console.log("DRIVER", data);
        setDriver({ ...data });
        return;
      } catch (error) {
        console.log("error 1", error);
      }
    })();
  }, [tripData]);

  const getPassengers = async (trip) => {
    if (trip?.passengers?.length == 0) {
      let newArr = new Array(parseInt(trip?.seats ? trip?.seats : 0));
      setPassengers(newArr);
      return newArr;
    } else {
      let newArr = new Array(parseInt(trip?.seats ? trip?.seats : 0));
      trip?.passengers?.forEach((item) => {
        getUser(item)
          .then((res) => {
            // console.log("LETS SEE", res);
            newArr = [{ ...res }];
            setPassengers([
              ...newArr,
              ...Array(parseInt(trip?.seats ? trip?.seats - 1 : 0)),
            ]);
            // newArr.unshift({ ...res });
          })
          .catch((error) => console.log(error));
      });
    }
  };

  // console.log("THE ARR", passengers);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationController title={"Trip preview"} />
      {loadingTrip ? (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={styles.layer}>
          <ScrollView>
            <View style={styles.contentContainer}>
              <View style={styles.addresses}>
                <View style={styles.extra}>
                  <View style={styles.top}>
                    <Text style={styles.city}>
                      {
                        tripData?.origin?.terms[
                          tripData?.origin?.terms.length - 3
                        ]?.value
                      }
                    </Text>
                    <Text style={styles.time}>
                      {moment(tripData.date).format("ddd, MMM D YYYY, ha")}
                    </Text>
                  </View>
                  <Text style={styles.location} numberOfLines={1}>
                    {tripData?.origin?.description}
                  </Text>
                </View>

                <View>
                  <View style={styles.top}>
                    <Text style={styles.city}>
                      {
                        tripData?.destination?.terms[
                          tripData?.destination?.terms.length - 3
                        ]?.value
                      }
                    </Text>
                    <Text style={styles.time}>
                      est. {""}
                      {moment(tripData.date)
                        .add(1, "hours")
                        .format("ddd, MMM D YYYY, ha")}
                    </Text>
                  </View>
                  <Text style={styles.location}>
                    {tripData?.destination?.description}
                  </Text>
                </View>
              </View>

              <View style={styles.seat}>
                <View style={styles.NumOfseat}>
                  <Text style={styles.seatText}>
                    {tripData.seats} seats left
                  </Text>
                </View>
                <View style={styles.priceOfseat}>
                  <Text style={[styles.seatText, styles.green]}>
                    {` $${tripData.price}`} per seat
                  </Text>
                </View>
              </View>

              <Text style={styles.additionaMessage}>
                {tripData?.description}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.detailItem,
                pressed && styles.detailItemPressed,
              ]}
            >
              <View style={styles.detailFirst}>
                <Text style={styles.detailItemText}>Booked: </Text>
                <View style={styles.icons}>
                  {[...passengers].map((item, index) =>
                    item == undefined ? (
                      <View style={styles.iconCointainer} key={index}>
                        <FontAwesome name="user" size={24} color="white" />
                      </View>
                    ) : (
                      <View style={styles.iconCointainer} key={index}>
                          <Image
                            source={{
                              uri: !item?.profile_picture
                                ? "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
                                : item?.profile_picture
                            }}
                            style={styles.passengerImage}
                          />
                      </View>
                    )
                  )}

                  {/* {passengers.map((item) => {
                    item == undefined && (
                      <View style={styles.iconCointainer}>
                        <FontAwesome name="user" size={24} color="white" />
                      </View>
                    );
                  })} */}
                  {/* <View style={styles.iconCointainer}>
                    <FontAwesome name="user" size={24} color="white" />
                  </View>
                  <View style={styles.iconCointainer}>
                    <FontAwesome name="user" size={24} color="white" />
                  </View>
                  <View style={styles.iconCointainer}>
                    <FontAwesome name="user" size={24} color="white" />
                  </View> */}
                </View>
              </View>
              <Pressable>
                <FontAwesome name="angle-right" size={30} color="black" />
              </Pressable>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.detailItem,
                pressed && styles.detailItemPressed,
              ]}
            >
              <View style={styles.detailFirst}>
                <View style={styles.profileImageContainer}>
                  <Image
                    style={styles.profileImage}
                    source={{
                      uri: driver?.profile_picture
                        ? driver?.profile_picture
                        : "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png",
                    }}
                  />
                </View>
                <Text style={styles.detailItemText}>{driver?.name}</Text>
              </View>
              <Pressable>
                <FontAwesome name="angle-right" size={30} color="black" />
              </Pressable>
            </Pressable>
            {tripData?.vehicle?.model ? (
              <View style={styles.carDetails}>
                <View style={styles.carImgContainer}>
                  <Image
                    style={styles.carImg}
                    source={{
                      uri: tripData?.vehicle?.image
                        ? tripData?.vehicle?.image
                        : "https://images.prismic.io/brimbdollar/95ed2cc20f5cffaa8f8810b160205a20f5ee2e77_winter-driving-black-ice.png?auto=compress,format",
                    }}
                  />
                  {!tripData?.vehicle?.image && (
                    <Text style={styles.carSmallText}>Vehicle placeholder</Text>
                  )}
                </View>
                <View style={styles.carInfoContainer}>
                  <Text style={styles.seatText}>
                    {tripData?.vehicle?.model}
                  </Text>
                  <Text style={styles.location}>
                    {tripData?.vehicle?.color}
                  </Text>
                  <Text style={styles.location}>{tripData?.vehicle?.year}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.emptyCarState}>
                <Text style={styles.emptyCarStateText}>
                  Vehicle Data not added
                </Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.requestContainer}>
            <SecondaryButton
              title={"Request to book"}
              radius={10}
              isValid={true}
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
  layer: {
    backgroundColor: "#F4F4F4",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addresses: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#246BCE",
  },
  extra: {
    paddingBottom: 20,
  },
  city: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#246BCE",
  },
  time: {
    fontWeight: "bold",
    fontSize: 17,
  },
  location: {
    marginTop: 10,
    fontSize: 15,
    color: "#616060",
  },

  seat: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  NumOfseat: {
    width: "40%",
    borderRightColor: "#cccccc",
    borderRightWidth: 1,
    paddingVertical: 18,
  },
  priceOfseat: {
    width: "60%",
    paddingVertical: 18,
  },
  seatText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  green: {
    color: "#16b802",
  },
  additionaMessage: {
    marginVertical: 25,
    marginLeft: 20,
    fontSize: 18,
    color: "#616060",
  },
  detailItem: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    backgroundColor: "white",
    paddingVertical: 10,
  },
  detailItemPressed: {
    backgroundColor: "#e8e6e6",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailFirst: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItemText: {
    marginRight: 10,
    fontWeight: "500",
    fontSize: 20,
  },
  iconCointainer: {
    backgroundColor: "#ebebeb",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    overflow: "hidden",
  },
  passengerImage: {
    width: "100%",
    height: "100%",
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  carDetails: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    marginTop: 25,
    minHeight: 250,
  },
  carImgContainer: {
    width: "35%",
  },
  carImg: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  carInfoContainer: {
    marginLeft: 15,
  },
  carSmallText: {
    fontSize: 12,
    color: "#616060",
    textAlign: "center",
  },
  emptyCarState: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    marginTop: 25,
    minHeight: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCarStateText: {
    fontWeight: "500",
    fontSize: 18,
    color: "#616060",
  },
  requestContainer: {
    paddingHorizontal: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TripDetailScreen;
