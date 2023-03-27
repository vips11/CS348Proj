import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SpaceItem = ({ spaceName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleContainer}>
        <Text style={styles.nameText}>{spaceName}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#262c2c",
    borderRadius: 10,
    width: "60%",
    justifyContent: "center",
    marginVertical: 10,
  },
  titleContainer: {
    width: "100%",
    paddingVertical: 20,
    // backgroundColor: "red",
  },
  nameText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SpaceItem;
