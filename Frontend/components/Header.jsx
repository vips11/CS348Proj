import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

import SearchBar from "./SearchBar";
import PageBarMenu from "./PageBarMenu";
import OptionsBarMenu from "./OptionsBarMenu";

const Header = ({ pageNum }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>

      <View style={styles.pageBarContainer}>
        <PageBarMenu selected={pageNum} />
      </View>

      <View style={styles.optionsBarContainer}>
        <OptionsBarMenu />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  searchBarContainer: {
    width: "22.5%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "1%",
  },
  pageBarContainer: {
    width: "55%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsBarContainer: {
    width: "22.5%",
    height: "100%",
    justifyContent: "right",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: "10px",
  },

  circle: {
    height: "65px",
    width: "65px",
    backgroundColor: "white",
    borderRadius: "65px",
    marginHorizontal: "15px",
  },
});
