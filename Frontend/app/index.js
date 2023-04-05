import { StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  //useEffect(() => {
  //router.push("Login");
  //}, []);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>UWaterloo Ring</Text>
        <Text style={styles.subtitle}>Welcome to our CS 348 Project.</Text>

        <View
          style={{
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            marginVertical: "10%",
          }}
        >
          <Link href="/SignUp" style={styles.link}>
            Sign-Up
          </Link>
          <Link href="/Login" style={styles.link}>
            Login
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#1b1f1f",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 100,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 36,
    color: "#aaaaaa",
  },
  link: {
    color: "white",
    marginVertical: 10,
    fontSize: 20,
  },
});
