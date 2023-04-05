import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import { getCourseList, saveCourseRating } from "./api";

const Field = ({ label, state, setState }) => {
  const click1 = () => (state === "asc" ? setState("") : setState("asc"));
  const click2 = () => (state === "des" ? setState("") : setState("des"));

  return (
    <View style={styles.filterField}>
      <Text style={[styles.filterLabel, styles.labelWidth]}>{label}:</Text>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { backgroundColor: state === "asc" ? "#2222aa" : null },
        ]}
        onPress={click1}
      >
        <Text style={styles.buttonText}>Ascending</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { backgroundColor: state === "des" ? "#2222aa" : null },
        ]}
        onPress={click2}
      >
        <Text style={styles.buttonText}>Descending</Text>
      </TouchableOpacity>
    </View>
  );
};

const CourseRatingInput = ({ label, state, setState }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "center",
      }}
    >
      <Text style={styles.filterLabel}>{label}:</Text>
      <TextInput
        value={state}
        onChangeText={setState}
        style={[styles.filterInput, styles.inputWidth]}
      />
    </View>
  );
};

const Courses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  const [data, setData] = useState([]);
  const [sortByName, setSortByName] = useState("");
  const [sortByLiked, setSortByLiked] = useState("");
  const [sortByUsed, setSortByUsed] = useState("");

  const [newName, setNewName] = useState("");
  const [newLiked, setNewLiked] = useState("");
  const [newUsed, setNewUsed] = useState("");

  const refrestCourseList = async () => {
    const res = await getCourseList(sortByName, sortByLiked, sortByUsed);
    setData(res);
  };

  useEffect(async () => {
    await refrestCourseList();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAddCourse = () => {
    setIsAddingCourse(true);
  };

  const handleSave = async () => {
    //console.log({ newName, newLiked, newUsed });
    const result = await saveCourseRating(newName, newLiked, newUsed);
    console.log("COURSE UPLOAD RESULT: " + result);
    setIsAddingCourse(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={4} />
      </View>

      <View style={styles.body}>
        <View style={styles.contentBody}>
          <View style={styles.sort}>
            <TouchableOpacity onPress={toggleMenu} style={styles.filterButton}>
              <Text style={styles.filterButtonText}>
                {isOpen ? "Close" : "Sort"}
              </Text>
              <Text style={styles.filterButtonArrow}>{isOpen ? "▲" : "▼"}</Text>
            </TouchableOpacity>
            {isOpen ? (
              <View>
                <Field
                  label="Course name"
                  state={sortByName}
                  setState={setSortByName}
                />
                <Field
                  label="Liked rating"
                  state={sortByLiked}
                  setState={setSortByLiked}
                />
                <Field
                  label="Used rating"
                  state={sortByUsed}
                  setState={setSortByUsed}
                />
                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    paddingVertical: 10,
                    marginBottom: 15,
                    paddingHorizontal: 40,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "white",
                  }}
                  onPress={async () => {
                    await refrestCourseList();
                  }}
                >
                  <Text style={{ color: "white" }}>APPLY FILTER</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleAddCourse}
          >
            <Text style={styles.buttonText}>Add course rating</Text>
          </TouchableOpacity>
          {isAddingCourse ? (
            <View style={styles.addCourseContainer}>
              <CourseRatingInput
                label="Course name"
                state={newName}
                setState={setNewName}
              />
              <CourseRatingInput
                label="Liked Rating"
                state={newLiked}
                setState={setNewLiked}
              />
              <CourseRatingInput
                label="Useful Rating"
                state={newUsed}
                setState={setNewUsed}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {data &&
            data.map((course) => {
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{course.name}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.nameText}>
                    {"Liked Rating: " + course.liked}
                  </Text>
                  <Text style={styles.nameText}>
                    {"Useful Rating: " + course.useful}
                  </Text>
                </View>
              </View>;
            })}
        </View>
      </View>
    </View>
  );
};

export default Courses;

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
  textContainer: {
    width: "60%",
    alignSelf: "center",
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#262c2c",
    flexDirection: "row",
  },
  nameText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  sort: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#262c2c",
    marginBottom: 20,
    alignContent: "center",
    marginLeft: 20,
  },
  filterButtonText: {
    color: "white",
    marginRight: "auto",
    fontWeight: "bold",
  },
  filterButtonArrow: {
    color: "white",
    textAlign: "right",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#262c2c",
    padding: 10,
  },
  filterLabel: {
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
    width: "18%",
  },
  filterInput: {
    borderWidth: 1,
    borderColor: "white",
    padding: 4,
    color: "white",
  },
  filterField: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    alignSelf: "center",
    height: 35,
    width: 100,
    backgroundColor: "#262c2c",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    marginVertical: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  searchButton: {
    alignSelf: "center",
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: "#262c2c",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    marginVertical: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  searchButtonContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  addCourseContainer: {
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#262c2c",
    marginBottom: 20,
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  saveButton: {
    alignSelf: "center",
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: "green",
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
});
