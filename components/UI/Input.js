import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";

const Input = ({
  icon,
  placeholder,
  keyboardType,
  inputType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  handleChange,
  name,
  error,
  setFieldTouched,
  touched,
  authError
}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        {icon}
        <TextInput
          placeholder={placeholder}
          style={[styles.input, inputType === "password" && styles.password]}
          keyboardType={keyboardType}
          secureTextEntry={inputType === "password" ? true : false}
          autoCapitalize={false}
          autoCorrect={false}
          value={value}
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
        />
        <Pressable>
          <Text style={styles.smallText}>{fieldButtonLabel}</Text>
        </Pressable>
      </View>
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
      {authError && !touched && <Text style={styles.errorText}>{authError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginBottom: 30,
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    padding: 5,
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    flex: 1
  },
  smallText: {
    color: "#006A61",
    fontWeight: "700",
  },
  password: {
    flex: 1,
  },
  errorText: {
    color: "red",
    marginTop: 5
  },
});

export default Input;
