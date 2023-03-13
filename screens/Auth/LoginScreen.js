import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  Platform,
 StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import SvgTest from "../../assets/login";
import Input from "../../components/UI/Input";
import SecondaryButton from "../../components/UI/SecondaryButton";
import { contextData } from "../../context/store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string().min(7, "Too Short!").required("Password Required"),
});

const LoginScreen = ({ navigation }) => {
  const { handleLogin, loginError } = contextData();

  const handleSubmit = (values) => {
    handleLogin(values);
  };

  

  return (
    <SafeAreaView style={styles.mainContainer}>
    <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer} style={styles.contentContainer}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
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
          <View style={styles.container}>
            {/* <Image source={require('../../assets/login.png')} style={{width: "100%", height: "80%"}}/> */}
            <Pressable onPress={() => navigation.goBack()} style={styles.backIcon}>
              <Ionicons name="arrow-back-outline" size={25} />
            </Pressable>
            <View style={styles.imageContainer}>
              <SvgTest />
            </View>
            <Text style={styles.title}>Login</Text>
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
              authError={loginError}
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
              fieldButtonLabel={"Forgot?"}
              fieldButtonFunction={() => {}}
              value={values.password}
              handleChange={handleChange}
              name="password"
              error={errors.password}
              setFieldTouched={setFieldTouched}
              touched={touched.password}
            />
            <SecondaryButton
              title={"Login"}
              onPress={handleSubmit}
              isValid={isValid}
            />

            <View style={styles.bottom}>
              <Text>New to the app?</Text>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.bottomLink}>Register</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingHorizontal: 20,
  },
  backIcon: {
    // marginTop: 30,
    width: "100%"
  },
  imageContainer: {
    height: "30%",
    width: "80%",
    alignSelf: "center",
    marginTop: 30
    // backgroundColor: "red"
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

export default LoginScreen;
