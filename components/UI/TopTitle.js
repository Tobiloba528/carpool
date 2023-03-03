import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const TopTitle = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>CARPOOL</Text>
      </View>
      <View style={styles.icons}>
        <Pressable onPress={() => navigation.navigate("HeadingScreen")}>
          <Ionicons name="add" size={35} style={styles.icon} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("FindTrip")}>
          <Ionicons
            name="search"
            size={25}
            style={[styles.icon, styles.search]}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#456360",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    // fontSize: 30
  },
  search: {
    marginLeft: 20,
  },
});

export default TopTitle;
