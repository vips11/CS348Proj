import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Login Page</Text>
        <Text style={styles.subtitle}>This is the Login Page</Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginVertical: "1%",
          }}
        >
          <Link href="/Home">Home</Link>
          <Link href="/Spaces">Spaces</Link>
          <Link href="/People">People</Link>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
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
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
