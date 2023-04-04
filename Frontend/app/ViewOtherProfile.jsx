import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import { Link, useRouter } from "expo-router";

import Header from "../components/Header";
import TimeLine from "../components/TimeLine";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import allPeople from "./data";

const tempData = {
  firstName: "Anthony",
  lastName: "Vasquez",
  description:
    "Hi there, I'm Anthony. I'm currently in my 2B term studying CS.",
  timeLine: [
    {
      type: "study",
      term: "1A",
      termDescription: "Math 135, Math 137, CS 135, Phys 121, SPCOM 100",
      startDate: "Sept 2020",
      endDate: "Dec 2020",
    },
    {
      type: "study",
      term: "1B ",
      termDescription: "Math 136, Math 138, CS 136, AFM 101, Econ 101",
      startDate: "Jan 2021",
      endDate: "Apr 2021",
    },
    {
      type: "work",
      term: "Coop 1",
      termDescription: "Testing and QA @ ABC Inc.",
      startDate: "May 2021",
      endDate: "Aug 2021",
    },
    {
      type: "study",
      term: "2A",
      termDescription: "CS 245, CS 246, Math 239, Stat 230, AFM 102",
      startDate: "Sep 2021",
      endDate: "Dec 2021",
    },
    {
      type: "work",
      term: "Coop 2",
      termDescription: "Data Scientist @ DEF Inc.",
      startDate: "May 2022",
      endDate: "Aug 2022",
    },
    {
      type: "study",
      term: "2B",
      termDescription: "CS 241, CS 251, CS 240, SPCOM 200, Stat 231 ",
      startDate: "Sept 2022",
      endDate: "Dec 2022",
    },
  ],
  links: [
    {
      type: "LinkedIn",
      link: "https://www.linkedin.com",
    },
    {
      type: "Email",
      link: "mailto:email@gmail.com",
    },
    {
      type: "GitHub",
      link: "https://www.github.com",
    },
    {
      type: "Discord",
      link: "https://www.discord.com",
    },
  ],
};
const ViewOtherProfile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const queryParams = new URLSearchParams(window.location.search);
      let i = queryParams.get("index");
      setData(allPeople[i]);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={0} />
      </View>
      <SafeAreaView style={styles.body}>
        <View style={styles.contentBody}>
          {data && (
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
                {data.firstName + " " + data.lastName}
              </Text>
              <Text style={styles.subtitle}>{data.description}</Text>

              <TimeLine data={data.timeLine} />

              <View style={styles.linksContainer}>
                {data.links.map((linkInfo, index) => (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(linkInfo.link)}
                    key={index}
                  >
                    <Text style={styles.link}>{linkInfo.type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ViewOtherProfile;

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
