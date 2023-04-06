import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import TimeLine from "../components/TimeLine";
import { getStudentProfile } from "./api";
import { getUserEmail } from "./asyncStore";

const ViewSelfProfile = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(localStorage.getItem("userEmail"));
    getStudentProfile(localStorage.getItem("userEmail"), (response) => {
      console.log(response);
      setData(response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={0} />
      </View>
      <SafeAreaView style={styles.body}>
        <View style={styles.contentBody}>
          <ScrollView
            contentContainerStyle={{
              height: "100%",
              width: "70%",
              alignItems: "center",
              paddingVertical: 20,
              marginBottom: 20,
              alignSelf: "center",
            }}
          >
            <Text style={styles.title}>
              {data && data.firstName + " " + data.lastName}
            </Text>
            <Text style={styles.subtitle}>{data && data.description}</Text>

            {data && <TimeLine data={data.timeline} />}

            <View style={styles.linksContainer}>
              {data &&
                data.links.map((linkInfo, index) => (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(linkInfo.link)}
                    key={index}
                  >
                    <Text style={styles.link}>{linkInfo.type}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity
              style={{ marginVertical: 20 }}
              onPress={() => {
                const params = new URLSearchParams({
                  email1: localStorage.getItem("userEmail"),
                  firstName1: data.firstName,
                  lastName1: data.lastName,
                  program1: data.program,
                  description1: data.description,
                  term1: data.currentTerm,
                });

                router.push(`/EditProfile?${params.toString()}`);
              }}
            >
              <Text style={{ color: "white" }}>EDIT PROFILE</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ViewSelfProfile;

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
  linksContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  link: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3333ee",
    marginBottom: 10,
    textAlign: "center",
  },
});
