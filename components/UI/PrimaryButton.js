import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PrimaryButton = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{title}</Text>
      <Ionicons name="chevron-forward-outline" size={25} color={"white"} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#006A61",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    padding: 15,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
