import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import NavigationController from '../../components/UI/NavigationController'

const PostTrip = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
        <NavigationController title={"Post a trip"} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
})

export default PostTrip