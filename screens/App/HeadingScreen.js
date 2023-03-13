import { Text, View, Button, SafeAreaView, Pressable, StyleSheet, Platform, StatusBar } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import HeadingItem from "../../components/UI/HeadingItem";

const HeadingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
      <FontAwesome
              style={styles.backIcon}
              name="angle-left"
              size={30}
              color="black"
            />
      </Pressable>
      <Text style={styles.title}>Heading  somewhere?</Text>
      <View style={styles.itemsContainer}>
        <HeadingItem border label="I'm driving" info={"I want to fill empty seats in my car"} onPress={() => navigation.navigate("PostTrip")} image={require("../../assets/newCar1.png")} />
        <HeadingItem label="I need a ride" info="Notify me when a ride is available" onPress={() => navigation.navigate("PostRequest")} image={require("../../assets/bell1.png")}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  title: {
    paddingHorizontal: 15,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20

  },
  itemsContainer: {
    flex: 1
  },
  backIcon :{
    marginLeft: 10
  }
})

export default HeadingScreen;
