import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SearchBar = () => {
  router = useRouter();
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="gray"
        value={text}
        onChangeText={(value) => setText(value)}
        onSubmitEditing={() => {
          const params = new URLSearchParams({
            search: text,
          });

          router.push(`/SearchResults?${params.toString()}`);
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "black",
    height: "100%",
    outlineStyle: "none",
  },
});
