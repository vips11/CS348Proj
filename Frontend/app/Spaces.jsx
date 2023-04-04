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

const data = [
  {
    space_ID: 1,
    name: "Musical Fridays",
    description: "Every friday, we gather together and do some karoke",
  },
  {
    space_ID: 2,
    name: "Cooking Classes",
    description:
      "Want to learn how to cook? We make everything from cookies to pasta to bread.",
  },
  {
    space_ID: 3,
    name: "Computer Science Students",
    description: "For anyone taking any computer science or related courses",
  },
  {
    space_ID: 4,
    name: "Residence first years",
    description:
      "A space for all first years living in a University of Waterloo residence",
  },
  {
    space_ID: 28,
    name: "Umemployed",
    description: "for students currently looking for a coop",
  },
  {
    space_ID: 29,
    name: "business enthusiasts",
    description: "we talk about various talks relating to business",
  },
  {
    space_ID: 30,
    name: "movie lovers",
    description:
      "get recommendations on the latest and old movies that are a must watch",
  },
];

const Spaces = () => {
  const router = useRouter();

  const handleClickOnSpace = () => {
    router.push("ViewSpace");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={2} />
      </View>

      <SafeAreaView style={styles.body}>
        <ScrollView style={styles.contentBody}>
          {data.map((space, index) => (
            <TouchableOpacity
              onPress={() => handleClickOnSpace()}
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
