import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";

const Post = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{description}</Text>
    </View>
  );
};

export default Post;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1f1f",
    width: "60%",
    paddingVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
});
