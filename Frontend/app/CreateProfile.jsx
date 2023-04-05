import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter, useSearchParams } from "expo-router";

const CreateProfile = () => {
  const { fn, ln, email } = useSearchParams();

  const [firstName, setFirstName] = useState(fn);
  const [lastName, setLastName] = useState(ln);
  const [program, setProgram] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Create Your Profile</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#fff"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#fff"
          value={lastName}
          onChangeText={setLastName}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Program"
          placeholderTextColor="#fff"
          value={program}
          onChangeText={setProgram}
          style={styles.inputText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1f1f",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  inputView: {
    width: "30%",
    backgroundColor: "#262c2c",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#fff",
    outlineStyle: "none",
  },
  loginBtn: {
    width: "30%",
    backgroundColor: "#262c2c",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
  },
  errorMsg: {
    color: "#ff0000",
    marginTop: 10,
  },
});

export default CreateProfile;
