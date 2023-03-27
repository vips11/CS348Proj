import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import Header from "../components/Header";

const SearchResults = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={0} />
      </View>

      <View style={styles.body}>
        <View style={styles.contentBody}>
          <Text style={{ color: "white" }}>Search Results Screen</Text>
        </View>
      </View>
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1f1f",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    height: "10%",
  },
  body: {
    width: "100%",
    height: "90%",

    backgroundColor: "#1e2323",
  },
  contentBody: {
    width: "55%",
    height: "100%",

    padding: "1%",

    backgroundColor: "#171a1a",
    alignSelf: "center",
  },
});