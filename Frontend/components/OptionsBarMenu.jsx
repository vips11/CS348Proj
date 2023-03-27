import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const OptionsBarMenu = () => {
  return (
    <View style={styles.container}>
      <Link style={styles.iconContainer} href="Help">
        <View style={styles.circle}>
          <Ionicons name="help" size={25} color="white" />
        </View>
      </Link>
      <Link style={styles.iconContainer} href="ViewSelfProfile">
        <View style={styles.circle}>
          <Ionicons name="person-outline" size={25} color="white" />
        </View>
      </Link>
      <Link style={styles.iconContainer} href="Settings">
        <View style={styles.circle}>
          <Ionicons name="settings-outline" size={25} color="white" />
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  iconContainer: {
    marginHorizontal: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1e2323",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OptionsBarMenu;
