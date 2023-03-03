import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const CustomTab = ({ items, setItems }) => {

  const handlePress = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.active = true;
        return item;
      } else {
        item.active = false;
        return item;
      }
    });
    setItems(newItems)
  };

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Pressable
          style={[styles.item, item.active && styles.selected]}
          key={item.id}
          onPress={() => handlePress(item.id)}
        >
          <Text style={[styles.itemText, item?.active && styles.selectedText]}>
            {item.title}
          </Text>
        </Pressable>
      ))}
      {/* <View style={styles.item}>
        <Text style={styles.itemText}>Active</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>Recent</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>Cancelled</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 15,
  },
  item: {
    flex: 1,
  },
  itemText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#808080",
  },
  selected: {
    backgroundColor: "#E8E8E8",
    paddingVertical: 5,
    borderRadius: 15,
  },
  selectedText: {
    color: "#36454F",
  },
});

export default CustomTab;
