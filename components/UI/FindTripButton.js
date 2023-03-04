import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const FindTripButton = ({ children, text, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, style, pressed && styles.pressed]}>
      {children}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: "#E8E8E8",
        paddingHorizontal: 10,
        paddingVertical: 13,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    text: {
      fontWeight: "300",
      marginLeft: 10,
      color: "#696969"
    },
    pressed: {
      backgroundColor: "#B6B6B4"
    }
})

export default FindTripButton