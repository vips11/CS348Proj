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

const Field = ({ label }) => {
  return (
    <View style={styles.filterField}>
      <Text style={[styles.filterLabel, styles.labelWidth]}>{label}:</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Ascending</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Descending</Text>
      </TouchableOpacity>
    </View>
  );
};

const CourseRatingInput = ({ label }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "center",
      }}
    >
      <Text style={styles.filterLabel}>{label}:</Text>
      <TextInput style={[styles.filterInput, styles.inputWidth]} />
    </View>
  );
};

const Courses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAddCourse = () => {
    setIsAddingCourse(true);
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
                <Field label="Course name" />
                <Field label="Liked rating" />
                <Field label="Used rating" />
              </View>
            ) : null}
          </View>
          <View style={styles.searchButtonContainer}>
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.buttonText}>Find most liked course</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.buttonText}>Find most useful course</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.buttonText}>
                Find most liked and useful course
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleAddCourse}
          >
            <Text style={styles.buttonText}>Add course rating</Text>
          </TouchableOpacity>
          {isAddingCourse ? (
            <View style={styles.addCourseContainer}>
              <CourseRatingInput label="Course name" />
              <CourseRatingInput label="Liked Rating" />
              <CourseRatingInput label="Useful Rating" />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setIsAddingCourse(false)}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>CS246</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.nameText}>Liked Rating: 4</Text>
              <Text style={styles.nameText}>Useful Rating: 5</Text>
            </View>
          </View>
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
