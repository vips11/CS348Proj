import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const PageBarMenu = ({ selected }) => {
  return (
    <View style={styles.container}>
      <Link
        style={[
          styles.iconContainer,
          selected === 1 ? styles.selectedIcon : styles.deselectedIcon,
        ]}
        href="/Home"
      >
        <Ionicons
          name="home-outline"
          size={selected === 1 ? 30 : 28}
          color={selected === 1 ? "#007AFF" : "white"}
        />
      </Link>

      <View style={styles.space} />

      <Link
        style={[
          styles.iconContainer,
          selected === 2 ? styles.selectedIcon : styles.deselectedIcon,
        ]}
        href="/Spaces"
      >
        <Ionicons
          name="grid-outline"
          size={selected === 2 ? 30 : 28}
          color={selected === 2 ? "#007AFF" : "white"}
        />
      </Link>

      <View style={styles.space} />

      <Link
        style={[
          styles.iconContainer,
          selected === 3 ? styles.selectedIcon : styles.deselectedIcon,
        ]}
        href="/People"
      >
        <Ionicons
          name="people-outline"
          size={selected === 3 ? 30 : 28}
          color={selected === 3 ? "#007AFF" : "white"}
        />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  selectedIcon: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2,
    transform: [{ scale: 1.3 }],
  },
  deselectedIcon: {
    transform: [{ scale: 1.3 }],
  },
  space: {
    width: 30,
  },
});

export default PageBarMenu;
