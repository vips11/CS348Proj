import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import ProfilesListItem from "../components/ProfileListItem";
import { ScrollView } from "react-native-gesture-handler";
import allPeople from "./data";

const FindGroup = () => {
  const [data, setData] = useState([]);

  const [currentMentor, setCurrentMentor] = useState(-1);
  const [studyGroup, setStudyGroup] = useState([]);

  const handleFindMentor = () => {
    setCurrentMentor(Math.floor(Math.random() * allPeople.length));
  };

  const handleFindStudyGroup = () => {
    const n = Math.floor(Math.random() * 5) + 2;
    const randomIndices = [];

    for (var i = 0; i < n; i++) {
      const index = Math.floor(Math.random() * allPeople.length);

      if (randomIndices.includes(index)) {
        i -= 1;
      } else {
        randomIndices.push(index);
      }
    }

    setStudyGroup(randomIndices);
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

  const handleProfileClick = (index) => {
    router.push("ViewOtherProfile?index=" + index);
  };

  return (
    <ScrollView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {currentMentor !== -1 ? (
          <>
            <Text style={{ color: "white", marginVertical: 15, fontSize: 24 }}>
              Current Mentor:{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleProfileClick(currentMentor);
              }}
              style={{ width: "100%" }}
            >
              <ProfilesListItem
                FirstName={data[currentMentor].firstName}
                LastName={data[currentMentor].lastName}
                TermInfo={data[currentMentor].termInfo}
              />
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{ color: "white", marginVertical: 15, fontSize: 24 }}>
            Click to find a Mentor
          </Text>
        )}
        <TouchableOpacity
          onPress={() => handleFindMentor()}
          style={{
            width: "30%",
            backgroundColor: "#262c2c",
            borderRadius: 25,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white" }}>Find me a new Mentor</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10 }}></View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {currentMentor ? (
          <>
            <Text style={{ color: "white", marginVertical: 15, fontSize: 24 }}>
              Current Study Group:{" "}
            </Text>
            {studyGroup.map((index) => (
              <TouchableOpacity
                onPress={() => {
                  handleProfileClick(index);
                }}
                style={{ width: "100%" }}
              >
                <ProfilesListItem
                  FirstName={data[index].firstName}
                  LastName={data[index].lastName}
                  TermInfo={data[index].termInfo}
                  key={index}
                />
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <Text style={{ color: "white", marginVertical: 15, fontSize: 24 }}>
            Click to find a Study Group
          </Text>
        )}

        <TouchableOpacity
          onPress={() => handleFindStudyGroup()}
          style={{
            width: "30%",
            backgroundColor: "#262c2c",
            borderRadius: 25,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <Text style={{ color: "white" }}>Find me a new Study Group</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 40 }}></View>
    </ScrollView>
  );
};

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={1} />
      </View>

      <View style={styles.body}>
        <View style={styles.contentBody}>
          <FindGroup />
        </View>
      </View>
    </View>
  );
};

export default Home;

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
