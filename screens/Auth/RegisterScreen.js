import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import SvgTest from "../../assets/Register";
import Input from "../../components/UI/Input";
import SecondaryButton from "../../components/UI/SecondaryButton";
import { contextData } from "../../context/store";

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().min(3, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string().min(7, "Too Short!").required("Password Required"),
  confirmPassword: Yup.string()
    .min(7, "Too Short!")
    .oneOf([Yup.ref("password")], "The passwords do not match.")
    .required("Confirm Password Required"),
});

const RegisterScreen = ({ navigation }) => {
  const data = contextData();

  const handleSubmit = (values) => {
    console.log(values)
    data.handleToken(values.email);
    console.log(data.token)
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldTouched,
          isValid,
        }) => (
          <KeyboardAvoidingView style={styles.container} behavior="position">
            {/* <Image source={require('../../assets/login.png')} style={{width: "100%", height: "80%"}}/> */}
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={25} />
            </Pressable>
            <View style={styles.imageContainer}>
              <SvgTest />
            </View>
            <Text style={styles.title}>Register</Text>
            <Input
              placeholder={"Full name"}
              icon={
                <Ionicons name="person-outline" size={25} style={styles.icon} />
              }
              value={values.fullName}
              handleChange={handleChange}
              name="fullName"
              error={errors.fullName}
              setFieldTouched={setFieldTouched}
              touched={touched.fullName}
            />
            <Input
              placeholder={"Email"}
              icon={
                <Ionicons name="mail-outline" size={25} style={styles.icon} />
              }
              keyboardType="email-address"
              value={values.email}
              handleChange={handleChange}
              name="email"
              error={errors.email}
              setFieldTouched={setFieldTouched}
              touched={touched.email}
            />
            <Input
              placeholder={"Password"}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={25}
                  style={styles.icon}
                />
              }
              inputType="password"
              value={values.password}
              handleChange={handleChange}
              name="password"
              error={errors.password}
              setFieldTouched={setFieldTouched}
              touched={touched.password}
            />
            <Input
              placeholder={"Confirm Password"}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={25}
                  style={styles.icon}
                />
              }
              inputType="password"
              value={values.confirmPassword}
              handleChange={handleChange}
              name="confirmPassword"
              error={errors.confirmPassword}
              setFieldTouched={setFieldTouched}
              touched={touched.confirmPassword}
            />
            <SecondaryButton
              title={"Register"}
              onPress={handleSubmit}
              isValid={isValid}
            />
            <View style={styles.bottom}>
              <Text>Already a user?</Text>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.bottomLink}>Login</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    height: "32%",
    width: "80%",
    // marginTop: 40,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 30,
  },
  icon: {
    marginRight: 10,
  },
  bottom: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
  },
  bottomLink: {
    color: "#006A61",
    fontWeight: "700",
    marginLeft: 5,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default RegisterScreen;
