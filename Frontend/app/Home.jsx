import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import ProfilesListItem from "../components/ProfileListItem";
import { ScrollView } from "react-native-gesture-handler";
import { getUserEmail } from "./asyncStore";
import { findMentor, findStudyGroup } from "./api";

const FindGroup = () => {
  const [key, setKey] = useState(null);

  const [currentMentor, setCurrentMentor] = useState(null);
  const [studyGroup, setStudyGroup] = useState([]);

  useEffect(() => {
    const res = getUserEmail();
    setKey(res);
  }, []);

  const handleFindMentor = async () => {
    await findMentor(key, (response) => {
      if (response.data.length > 0) {
        setCurrentMentor(
          response.data[Math.floor(Math.random() * response.data.length)]
        );
      } else {
        setCurrentMentor(null);
      }
    });
  };

  const handleFindStudyGroup = async () => {
    await findStudyGroup(key, (response) => {
      setStudyGroup(response.data.students);
    });
  };

  const handleCurrentMentorClick = () => {
    const params = new URLSearchParams({
      key: currentMentor.key,
    });

    router.push(`/ViewOtherProfile?${params.toString()}`);
  };

  const handleStudyGroupProfileClick = (index) => {
    const params = new URLSearchParams({
      key: data[index].key,
    });

    router.push(`/ViewOtherProfile?${params.toString()}`);
  };

  return (
    <ScrollView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {currentMentor ? (
          <>
            <Text style={{ color: "white", marginVertical: 15, fontSize: 24 }}>
              Current Mentor:{" "}
            </Text>
            <TouchableOpacity
              onPress={() => handleCurrentMentorClick()}
              style={{ width: "100%" }}
            >
              <ProfilesListItem
                FirstName={currentMentor.firstName}
                LastName={currentMentor.lastName}
                TermInfo={currentMentor.termInfo}
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
        {studyGroup.length > 0 ? (
          <>
            <Text style={{ color: "white", marginVertical: 15, fontSize: 24 }}>
              Current Study Group:{" "}
            </Text>
            {studyGroup &&
              studyGroup.map((person, index) => (
                <TouchableOpacity
                  onPress={() => {
                    handleProfileClick(index);
                  }}
                  style={{ width: "100%" }}
                >
                  <ProfilesListItem
                    FirstName={person.firstName}
                    LastName={person.lastName}
                    TermInfo={person.termInfo}
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
