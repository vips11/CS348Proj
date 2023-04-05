import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { verifyLogin } from "./api";

const LoginScreen = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = () => {
    // Check if the username and password are correct
    const credentials = {
      username: username,
      password: password,
    };

    verifyLogin(credentials, (res) => {
      console.log(res);
      // if (res.authorized) {
      //   console.log("VERIFY-LOGIN RES: SUCCESS");
      // } else {
      //   console.log("VERIFY-LOGIN RES: FAILED");
      // }
    });

    if (username === "v56gupta@uwaterloo.ca" && password === "your_password") {
      router.push("/Home");
    } else {
      setErrorMsg("Username or Password Incorrect");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#bfbfbf"
          onChangeText={setUsername}
          value={username}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#bfbfbf"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
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

export default LoginScreen;
