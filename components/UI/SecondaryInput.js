import { View, Text, TextInput, StyleSheet } from 'react-native'
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from 'react'

const SecondaryInput = () => {
  return (
    <View style={styles.container}>
        <Ionicons name="location-sharp" size={18} color="black" />
      <TextInput style={styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        borderBottomColor: "#A9A9A9",
        paddingVertical: 10,
        borderBottomWidth: 1
    },
    input: {
        paddingLeft: 5,
        flex: 1,
        fontWeight: "500"
    }
})

export default SecondaryInput