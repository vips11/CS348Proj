import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfilesListItem = ({ FirstName, LastName, TermInfo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.nameText}>
          {FirstName} {LastName}
        </Text>
        <Text style={styles.termInfoText}>{TermInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#262c2c",
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
  },
  nameText: {
    flex: 1,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "right",
  },
  termInfoText: {
    flex: 1,
    color: "white",
    fontSize: 16,
    textAlign: "right",
    alignSelf: "right",
  },
});

export default ProfilesListItem;
