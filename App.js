import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

import PreviewScreen from "./screens/Auth/PreviewScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import TripsScreen from "./screens/App/TripsScreen";
import AccountScreen from "./screens/App/AccountScreen";
import HeadingScreen from "./screens/App/HeadingScreen";
import FindTrip from "./screens/App/FindTripScreen";
import ContextProvider, { contextData } from "./context/store";
import ProfileScreen from "./screens/App/ProfileScreen";
import PostTrip from "./screens/App/PostTrip";
import SearchAddressScreen from "./screens/App/SearchAddressScreen";
import RequestedTripsScreen from "./screens/App/RequestedTripsScreen";
import TripDetailScreen from "./screens/App/TripDetailScreen";
import PostRequest from "./screens/App/PostRequest";
import { useEffect } from "react";
import ProfileSettings from "./screens/App/ProfileSettings";
import PersonalDetailsScreen from "./screens/App/PersonalDetailsScreen";
import NotificationScreen from "./screens/App/NotificationScreen";
import AboutScreen from "./screens/App/AboutScreen";
import TripRequestDetailScreen from "./screens/App/TripRequestDetailScreen";

const AuthNavigator = () => {
  const navigation = useNavigation();

  const { isAuthLoading, isLoggedIn, token, loginError, signUpError } =
    contextData();

  useEffect(() => {
    if (loginError) {
      navigation.navigate("Login");
    } else if (signUpError) {
      navigation.navigate("Register");
    }
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Preview"
        component={PreviewScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: "#006A61",
        tabBarLabelStyle: { fontWeight: "600", fontSize: 15 },
      }}
    >
      <BottomTabs.Screen
        name="TripsScreen"
        component={TripsScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: "Trips",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "car-sport" : "car-sport-outline"}
              size={size}
              color={color}
              style={{ fontSize: 30 }}
            />
          ),
        })}
      />
      <BottomTabs.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
              style={{ fontSize: 30 }}
            />
          ),
        })}
      />
    </BottomTabs.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // contentStyle: { backgroundColor: "red" },
        }
      }
    >
      <Stack.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HeadingScreen"
        component={HeadingScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="FindTrip"
        component={FindTrip}
        options={{
          // presentation: "modal",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PostTrip"
        component={PostTrip}
        options={{
          // presentation: "modal",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          // presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchAddressScreen"
        component={SearchAddressScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="RequestedTripsScreen"
        component={RequestedTripsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripDetailScreen"
        component={TripDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripRequestDetailScreen"
        component={TripRequestDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PostRequest"
        component={PostRequest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PersonalDetailsScreen"
        component={PersonalDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Root = () => {
  const { isAuthLoading, isLoggedIn, token } = contextData();

  useEffect(() => {
    isLoggedIn();
  }, []);

  if (isAuthLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (!isAuthLoading) {
    return (
      <NavigationContainer>
        {/* <AppNavigator /> */}
        {token && <AppNavigator />}
        {!token && <AuthNavigator />}
      </NavigationContainer>
    );
  }
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ContextProvider>
        <Root />
      </ContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
