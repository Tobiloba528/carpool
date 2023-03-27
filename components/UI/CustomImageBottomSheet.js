import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

const CustomImageBottomSheet = forwardRef(
  ({
    myRef,
    handleCameraPhoto,
    handleLibraryPhoto,
    handleCancel,
    image,
    visitorId,
  }) => {
    return (
      <RBSheet
        ref={myRef}
        height={400}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderRadius: 20,
            shadowColor: "#000",
            overflow: "visible",
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },
        }}
      >
        <View style={styles.bottomSheetContainer}>
          <Text style={styles.uploadTitle}>
            {!visitorId ? "Upload" : "View"} Photo
          </Text>
          <Text style={styles.uploadInfo}>
            {!visitorId ? "Choose Your Profile Picture" : "View picture"}
          </Text>

          {!visitorId && (
            <Pressable
              onPress={handleCameraPhoto}
              style={({ pressed }) => [
                styles.bottomSheetButton,
                pressed && styles.bottomSheetButtonPressed,
              ]}
            >
              <Text style={styles.bottomSheetBottonText}>Take Photo</Text>
            </Pressable>
          )}

          {!visitorId && (
            <Pressable
              onPress={handleLibraryPhoto}
              style={({ pressed }) => [
                styles.bottomSheetButton,
                pressed && styles.bottomSheetButtonPressed,
              ]}
            >
              <Text style={styles.bottomSheetBottonText}>
                Choose from Library
              </Text>
            </Pressable>
          )}
          <Pressable
            onPress={handleCancel}
            style={({ pressed }) => [
              styles.bottomSheetButton,
              pressed && styles.bottomSheetButtonPressed,
            ]}
          >
            <Text style={styles.bottomSheetBottonText}>
              {image ? "View" : "Cancel"}
            </Text>
          </Pressable>
        </View>
      </RBSheet>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  uploadTitle: {
    fontWeight: "500",
    fontSize: 25,
    textAlign: "center",
  },
  uploadInfo: {
    textAlign: "center",
    color: "#555555",
    fontSize: 15,
    marginBottom: 40,
  },
  bottomSheetButton: {
    backgroundColor: "#006A61",
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 15,
  },
  bottomSheetButtonPressed: {
    opacity: 0.7,
  },
  bottomSheetBottonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default CustomImageBottomSheet;
