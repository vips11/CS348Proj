import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { useRouter, useSearchParams } from "expo-router";

import Header from "../components/Header";
import Post from "../components/Post";
import { useState, useEffect } from "react";

import { getSpaceInfo } from "./api";

const ViewSpace = () => {
  const { key } = useSearchParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getSpaceInfo(key, (response) => {
      setData(response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={2} />
      </View>
      <View style={styles.body}>
        <View style={styles.contentBody}>
          <Text style={styles.title}>{data && data.name}</Text>
          <Text style={styles.subtitle}>{data && data.description}</Text>
          {data &&
            data.posts.map((post, idx) => (
              <Post
                key={idx}
                title={post.title}
                description={post.description}
              />
            ))}
        </View>
      </View>
    </View>
  );
};

export default ViewSpace;

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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  contentBody: {
    width: "55%",
    height: "100%",

    padding: "1%",

    backgroundColor: "#171a1a",
    alignSelf: "center",
  },
});
