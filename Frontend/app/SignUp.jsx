import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";

import { createStudent } from "./api";
import { saveUserEmail } from "./asyncStore";

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [studentID, setStudentID] = useState("");
  const [program, setProgram] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    // Check if any fields are empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const result = await createStudent(
      firstName,
      lastName,
      email,
      password,
      studentID,
      program
    );

    if (result) {
      // ADD EMAIL TO ASYNC STORE HERE
      await saveUserEmail(email);
      router.push("/Home");
    } else {
      setError("Something Wrong. Contact Site Admin.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
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
          placeholder="Email Address"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Student ID"
          placeholderTextColor="#fff"
          value={studentID}
          onChangeText={setStudentID}
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
      <View style={styles.inputView}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#fff"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#fff"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          style={styles.inputText}
        />
      </View>
      {error ? <Text style={styles.errorMsg}>{error}</Text> : null}
      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1f1f",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  inputView: {
    width: "25%",
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
  signupBtn: {
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
