import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const RenderStudyTerm = (year, term, courses) => {
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 20,
        marginVertical: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#262c2c",
      }}
    >
      <Text
        style={{
          color: "white",
          width: "15%",
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {year}
      </Text>
      <Text
        style={{
          color: "white",
          width: "15%",
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {term}
      </Text>
      <Text
        style={{
          color: "white",
          width: "70%",
          textAlign: "left",
          fontSize: 16,
        }}
      >
        {courses.join(", ")}
      </Text>
    </View>
  );
};

const RenderNewStudyTerm = (year, term, courses, index) => {
  return (
    <View>
      <View
        style={{
          paddingVertical: 20,
          marginVertical: 10,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#262c2c",
          alignItems: "center",
        }}
        key={index}
      >
        <Text
          style={{
            color: "white",
            // width: "15%",
            textAlign: "center",
            fontSize: 16,
            marginRight: 20,
          }}
        >
          Year:
        </Text>
        <TextInput style={[styles.filterInput, styles.inputWidth]} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              // width: "15%",
              textAlign: "center",
              fontSize: 16,
              marginRight: 20,
            }}
          >
            Term:
          </Text>
          <TextInput style={[styles.filterInput, styles.inputWidth]} />
          <Text
            style={{
              color: "white",
              // width: "15%",
              textAlign: "center",
              fontSize: 16,
              marginRight: 20,
            }}
          >
            Courses:
          </Text>
          <TextInput style={[styles.coursesInput, styles.inputWidth]} />
        </View>
      </View>
    </View>
  );
};

const RenderWorkTerm = (year, term, position, company) => {
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 20,
        marginVertical: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#262c2c",
      }}
    >
      <Text
        style={{
          color: "white",
          width: "15%",
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {year}
      </Text>
      <Text
        style={{
          color: "white",
          width: "15%",
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {term}
      </Text>
      <Text
        style={{
          color: "white",
          width: "70%",
          textAlign: "left",
          fontSize: 16,
        }}
      >
        {position + " @ " + company}
      </Text>
    </View>
  );
};
const RenderNewWorkTerm = (year, term, courses, index) => {
  return (
    <View>
      <View
        style={{
          paddingVertical: 20,
          marginVertical: 10,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#262c2c",
          alignItems: "center",
        }}
        key={index}
      >
        <Text
          style={{
            color: "white",
            // width: "15%",
            textAlign: "center",
            fontSize: 16,
            marginRight: 20,
            marginLeft: 10,
          }}
        >
          Year:
        </Text>
        <TextInput style={[styles.filterInput, styles.inputWidth]} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              // width: "15%",
              textAlign: "center",
              fontSize: 16,
              marginRight: 20,
            }}
          >
            Num:
          </Text>
          <TextInput style={[styles.filterInput, styles.inputWidth]} />
          <Text
            style={{
              color: "white",
              // width: "15%",
              textAlign: "center",
              fontSize: 16,
              marginRight: 20,
            }}
          >
            Company:
          </Text>
          <TextInput style={[styles.filterInput, styles.inputWidth]} />
        </View>
      </View>
    </View>
  );
};
const RenderOffTerm = (year, description) => {
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 20,
        marginVertical: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#262c2c",
      }}
    >
      <Text
        style={{
          color: "white",
          width: "15%",
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {year}
      </Text>
      <Text
        style={{
          color: "white",
          width: "85%",
          textAlign: "left",
          fontSize: 16,
        }}
      >
        {description}
      </Text>
    </View>
  );
};

const RenderNewOffTerm = (year, term, courses, index) => {
  return (
    <View>
      <View
        style={{
          paddingVertical: 20,
          marginVertical: 10,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#262c2c",
          alignItems: "center",
        }}
        key={index}
      >
        <Text
          style={{
            color: "white",
            // width: "15%",
            textAlign: "center",
            fontSize: 16,
            marginRight: 20,
            marginLeft: 10,
          }}
        >
          Year:
        </Text>
        <TextInput style={[styles.filterInput, styles.inputWidth]} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              // width: "15%",
              textAlign: "center",
              fontSize: 16,
              marginRight: 20,
            }}
          >
            Description:
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "white",
              padding: 8,
              color: "white",
            }}
          />
        </View>
      </View>
    </View>
  );
};

const prevStudyTerms = [
  {
    term: "1A",
    year: "F22",
    courses: ["Course 1", "Course 2", "Course 3"],
  },
  {
    term: "1B",
    year: "W23",
    courses: ["Course 1", "Course 2", "Course 3"],
  },
  {
    term: "2A",
    year: "F34",
    courses: ["Course 1", "Course 2", "Course 3"],
  },
];

const prevWorkTerms = [
  {
    term: "Coop1",
    year: "F22",
    company: "Company 1",
    position: "Position 1",
  },
  {
    term: "Coop2",
    year: "W23",
    company: "Company 2",
    position: "Position 2",
  },
  {
    term: "Coop3",
    year: "F34",
    company: "Company 3",
    position: "Position 3",
  },
];

const prevOffTerms = [{ year: "F22", description: "I took a break!" }];

const handleCancel = () => {};

const handleSave = () => {};

const EditTerms = () => {
  const [newStudyTerms, setNewStudyTerms] = useState([]);
  const [newWorkTerms, setNewWorkTerms] = useState([]);
  const [newOffTerms, setNewOffTerms] = useState([]);
  console.log(newStudyTerms);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Terms</Text>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Study Terms</Text>
        {prevStudyTerms.map((x) => RenderStudyTerm(x.year, x.term, x.courses))}
        {newStudyTerms.map((x, index) =>
          RenderNewStudyTerm(x.year, x.term, x.courses, index)
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            let temp = [];
            newStudyTerms.map((x) => temp.push(x));
            temp.push({
              year: "",
              term: "",
              courses: "",
            });
            setNewStudyTerms(temp);
          }}
        >
          <Text style={styles.buttonText}>Add New Study Term</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Work Terms</Text>
        {prevWorkTerms.map((x) =>
          RenderWorkTerm(x.year, x.term, x.position, x.company)
        )}
        {newWorkTerms.map((x, index) =>
          RenderNewWorkTerm(x.year, x.term, x.courses, index)
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            let temp = [];
            newWorkTerms.map((x) => temp.push(x));
            temp.push({
              year: "",
              term: "",
              courses: "",
            });
            setNewWorkTerms(temp);
          }}
        >
          <Text style={styles.buttonText}>Add New Work Term</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Off Terms</Text>
        {prevOffTerms.map((x) => RenderOffTerm(x.year, x.description))}
        {newOffTerms.map((x, index) =>
          RenderNewOffTerm(x.year, x.term, x.courses, index)
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            let temp = [];
            newOffTerms.map((x) => temp.push(x));
            temp.push({
              year: "",
              term: "",
              courses: "",
            });
            setNewOffTerms(temp);
          }}
        >
          <Text style={styles.buttonText}>Add New Off Term</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#992222", width: 180 }]}
          onPress={handleCancel()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#229922", width: 180 }]}
          onPress={handleSave()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditTerms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1f1f",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
  },
  section: {
    width: "100%",
    paddingVertical: 20,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  inputView: {
    width: "25%",
    backgroundColor: "#262c2c",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#fff",
    outlineStyle: "none",
  },
  button: {
    backgroundColor: "#262c2c",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    width: "30%",
  },
  buttonText: {
    color: "#fff",
  },
  errorMsg: {
    color: "#ff0000",
    marginTop: 10,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: "white",
    padding: 8,
    width: "20%",
    color: "white",
    marginRight: 20,
  },
  coursesInput: {
    borderWidth: 1,
    borderColor: "white",
    padding: 8,
    color: "white",
    marginRight: 20,
  },
});

//                              EDIT YOUR TERMS
//
//    Study Terms:
//    [   ]   [   ]   [                                           ] - PreFilled, Uneditable
//    [   ]   [   ]   [                                           ] - PreFilled, Uneditable
//    [   ]   [   ]   [                                           ] - PreFilled, Uneditable
//    [   ]   [   ]   [                                           ] - Currently Adding, Editable
//      |       |               |
//      |       |               |--> Text Input. Enter all courses, each seperated by a since comma.
//      |       |--> Drop Down Menu to Select 1A, 1B, 2A, 2B etc.
//      |--> Drop Down Menu to select F22, W23, F34 etc.
//
//    [Add Another Term]
//      |--> Button that adds another Editable row above
//
//
//  Work Terms:
//    [   ]   [   ]   [                   ]   [                   ] - PreFilled, Uneditable
//    [   ]   [   ]   [                   ]   [                   ] - PreFilled, Uneditable
//    [   ]   [   ]   [                   ]   [                   ] - PreFilled, Uneditable
//    [   ]   [   ]   [                   ]   [                   ] - Currently Adding, Editable
//      |       |               |                       |--> Text Input. Enter Job Position/Title
//      |       |               |--> Text Input. Enter Company
//      |       |--> Drop Down Menu to Select Coop1, Coop2, Coop3 etc.
//      |--> Drop Down Menu to select F22, W23, F34 etc.
//
//    [Add Another Term]
//      |--> Button that adds another Editable row
//
//
//  Off Terms:
//    [   ]   [                                                   ] - Currently Adding, Editable
//      |                       | --> Text Input. Description of that you did that term.
//      |--> Drop Down Menu to select F22, W23, F34 etc.
//
//    [Add Another Term]
//      |--> Button that adds another Editable row
//
//
//
//    [Cancel]                                                [Save]
//
