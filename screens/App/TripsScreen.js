import { Button, SafeAreaView, Text, View, StyleSheet, Platform, StatusBar } from "react-native";
import React, { useState, useEffect } from 'react';
import CustomTab from "../../components/UI/CustomTab";
import TopTitle from "../../components/UI/TopTitle";
import TripList from "../../components/UI/TripList";
import { contextData } from "../../context/store";

const TripsScreen = ({ navigation }) => {
  const [items, setItems] = useState([
    { id: 1, active: true, title: "Active" },
    { id: 2, active: false, title: "Recent" },
    { id: 3, active: false, title: "Cancelled" },
  ]);

  
  return (
    <SafeAreaView style={styles.container}>
      <TopTitle />
      <CustomTab items={items} setItems={setItems}/>
      <TripList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});

export default TripsScreen;
