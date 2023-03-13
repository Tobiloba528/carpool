import { Pressable, Text, StyleSheet } from "react-native";

const SecondaryButton = ({ title, onPress, isValid, bgColor = "#006A61", radius=5 }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {backgroundColor: bgColor, borderRadius: radius },
        pressed && styles.pressed,
        !isValid && styles.notValid,
      ]}
      disabled={!isValid}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // width: "80%",
    padding: 15,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
  notValid: {
    opacity: 0.6,
  },
});

export default SecondaryButton;
