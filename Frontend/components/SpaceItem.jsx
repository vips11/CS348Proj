import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SpaceItem = ({ spaceName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{spaceName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#262c2c",
  },
  nameText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SpaceItem;
