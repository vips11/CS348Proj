import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Header from "../components/Header";

const Help = () => {
  const handleLinkClick = (url) => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={0} />
      </View>

      <View style={styles.body}>
        <View style={styles.contentBody}>
          <Text style={styles.title}>Welcome to our App!</Text>
          <Text style={styles.description}>
            We are aiming to create a digital space for UW students to connect
            with each other and discover new peers over shared interests and
            experiences.
          </Text>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => handleLinkClick("https://example.com")}
          >
            <Text style={styles.linkLabel}>Check us out on GitHub!</Text>
            <AntDesign name="right" size={16} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => handleLinkClick("https://example.com")}
          >
            <Text style={styles.linkLabel}>Give us some Feedback!</Text>
            <AntDesign name="right" size={16} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Help;

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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: "#fff",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  linkLabel: {
    fontSize: 16,
    color: "#007AFF",
    marginRight: 5,
  },
});
