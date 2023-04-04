import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";

import Header from "../components/Header";
import DropDownMenu from "../components/DropDownMenu";
import ProfilesListItem from "../components/ProfileListItem";
import allPeople from "./data";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const Page = () => {
  const [data, setData] = useState([]);

  const router = useRouter();
  const handleProfileClick = (index) => {
    router.push("ViewOtherProfile?index=" + index);
  };

  const getTermInfo = (index) => {
    if (allPeople[index].currentTerm.startsWith("Coop") === false) {
      return allPeople[index].currentTerm + " " + allPeople[index].program;
    }
    var temp = null;
    for (var i = 0; i < allPeople[index].timeLine.length; i++) {
      if (allPeople[index].timeLine[i].term === allPeople[index].currentTerm) {
        temp = allPeople[index].timeLine[i];
        break;
      }
    }
    if (temp == null) {
      temp = {
        type: "work",
        term: "Coop 1",
        termDescription: "Testing and QA @ XYZ Inc.",
        startDate: "May 2021",
        endDate: "Aug 2021",
      };
    }
    return temp.termDescription;
  };

  useEffect(() => {
    const t = [];
    console.log(allPeople);
    allPeople.map((person, index) =>
      t.push({
        key: person.email,
        firstName: person.firstName,
        lastName: person.lastName,
        termInfo: getTermInfo(index),
      })
    );
    console.log(data);
    setData(t);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={3} />
      </View>

      <ScrollView style={styles.body}>
        <View style={styles.contentBody}>
          <DropDownMenu />
          {data.map((person, index) => (
            <TouchableOpacity
              onPress={() => {
                handleProfileClick(index);
              }}
            >
              <ProfilesListItem
                FirstName={person.firstName}
                LastName={person.lastName}
                TermInfo={person.termInfo}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

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
});
