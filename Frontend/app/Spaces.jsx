import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";

import Header from "../components/Header";
import SpaceItem from "../components/SpaceItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { getSpaces } from "./api";

const Spaces = () => {
  const router = useRouter();

  const [data, setData] = useState([]);

  useEffect(() => {
    getSpaces("", (response) => {
      setData(response.data);
    });
  }, []);

  const handleClickOnSpace = (index) => {
    const params = new URLSearchParams({
      key: data[index].space_ID,
    });

    router.push(`/ViewSpace?${params.toString()}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={2} />
      </View>

      <SafeAreaView style={styles.body}>
        <ScrollView style={styles.contentBody}>
          {data &&
            data.map((space, index) => (
              <TouchableOpacity
                onPress={() => handleClickOnSpace(index)}
                style={{
                  width: "60%",
                  marginVertical: 10,
                  alignSelf: "center",
                }}
              >
                <SpaceItem spaceName={space.name} key={space.space_ID} />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Spaces;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1f1f",
    alignItems: "center",
    maxHeight: "100%",
  },
  headerContainer: {
    width: "100%",
    height: "10%",
    maxHeight: "10%",
  },
  body: {
    width: "100%",
    height: "90%",
    maxHeight: "90%",
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
