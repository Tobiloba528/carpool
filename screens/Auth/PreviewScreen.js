import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";

import PrimaryButton from "../../components/UI/PrimaryButton";

const PreviewScreen = ({ navigation }) => {
  const animationRef = useRef();

  const goHandler = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    animationRef.current?.play(1, 200);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>CARPOOL</Text>
      </View>
      <View style={styles.lottieContainer}>
        <LottieView
          ref={animationRef}
          source={require("../../assets/lottie/carpool.json")}
          style={styles.lottie}
          duration={4000}
          autoPlay
          loop={false}
        />
      </View>
      <PrimaryButton title={"Let's Go"} onPress={goHandler} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
    color: "#456360",
  },
  lottieContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "80%",
  },
});

export default PreviewScreen;
