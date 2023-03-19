import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import DatePicker, {
    getToday,
    getFormatedDate,
  } from "react-native-modern-datepicker";



const CustomDate = ({ value, handleChange, closeModal, minDate, datepicker}) => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <DatePicker
          mode={datepicker ? "datepicker" : "calendar"}
          selected={value}
          onSelectedChange={handleChange}
          minimumDate={minDate}
          options={{
            textHeaderColor: "#006A61",
            textDefaultColor: "black",
            mainColor: "#006A61",
            selectedTextColor: "#fff",
            textSecondaryColor: "#006A61",
            // backgroundColor: '#090C08',
            // borderColor: 'rgba(122, 146, 165, 0.1)',
          }}
        />
        <Pressable onPress={closeModal}>
          <Text>Close</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        // backgroundColor: "red",
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        width: "90%",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
})

export default CustomDate;
