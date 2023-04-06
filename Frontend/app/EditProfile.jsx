import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import Header from "../components/Header";

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

// const RenderNewStudyTerm = (year, setYear, term, courses, index) => {
//   console.log(year);
//   var newYear = "";
//   return (
//     <View>
//       <View
//         style={{
//           paddingVertical: 20,
//           marginVertical: 10,
//           display: "flex",
//           flexDirection: "row",
//           backgroundColor: "#262c2c",
//           alignItems: "center",
//         }}
//         key={index}
//       >
//         <Field
//           label="Year"
//           value={newYear}
//           onChange={(text) => (newYear = text)}
//         />
//         {/* <Text
//           style={{
//             color: "white",
//             // width: "15%",
//             textAlign: "center",
//             fontSize: 16,
//             marginRight: 20,
//           }}
//         >
//           Year:
//         </Text>
//         <TextInput style={[styles.filterInput, styles.inputWidth]} /> */}
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <Text
//             style={{
//               color: "white",
//               // width: "15%",
//               textAlign: "center",
//               fontSize: 16,
//               marginRight: 20,
//             }}
//           >
//             Term:
//           </Text>
//           <TextInput style={[styles.filterInput, styles.inputWidth]} />
//           <Text
//             style={{
//               color: "white",
//               // width: "15%",
//               textAlign: "center",
//               fontSize: 16,
//               marginRight: 20,
//             }}
//           >
//             Courses:
//           </Text>
//           <TextInput style={[styles.coursesInput, styles.inputWidth]} />
//         </View>
//       </View>
//     </View>
//   );
// };

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

const Field = ({ label, value, onChange }) => {
  return (
    <View style={styles.filterField}>
      <Text style={[styles.filterLabel, styles.labelWidth]}>{label}:</Text>
      <TextInput
        style={[styles.filterInput, styles.inputWidth]}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [program, setProgram] = useState("");
  const [newStudyTerms, setNewStudyTerms] = useState([]);
  const [newWorkTerms, setNewWorkTerms] = useState([]);
  const [newOffTerms, setNewOffTerms] = useState([]);
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [courses, setCourses] = useState([]);

  const RenderNewStudyTerm = () => {
    return (
      <View>
        <Field label="Year" value={year} onChange={setYear} />
        <Field label="Semester" value={term} onChange={setTerm} />
        <Field label="Courses" value={courses} onChange={setCourses} />
      </View>
    );
  };

  const handleCancel = () => {
    // add api call here
  };

  const handleSave = () => {
    // add api call here
    const courses = [];
    // console.log(newStudyTerms.length);
    console.log(newStudyTerms);
    if (newStudyTerms.length > 0) {
      var semester = "Winter";
      var year = "20";
      var c = [];
      newStudyTerms.forEach((studyTerm) => {
        if (studyTerm.year[0] == "F") {
          semester = "Fall";
        } else if (studyTerm[0] == "S") {
          semester = "Spring";
        }
        year += studyTerm.year.substring(0);
        console.log(studyTerm.year);
        // c = studyTerm.courses.split(",");
      });
      c.forEach((course) => {
        courses.push({
          semester: semester,
          year: year,
          term: studyTerm.term,
          course_ID: course,
          section_ID: 1,
        });
      });
    }
    // console.log(courses);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={0} />
      </View>
      <SafeAreaView style={styles.body}>
        <View style={styles.contentBody}>
          <Text style={styles.header}>Edit your profile</Text>
          <ScrollView
            contentContainerStyle={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              paddingVertical: 20,
              marginBottom: 20,
              alignSelf: "center",
            }}
          >
            <Field
              label="First Name"
              value={firstName}
              onChange={setFirstName}
            />
            <Field label="Last Name" value={lastName} onChange={setLastName} />
            <Field label="Program" value={program} onChange={setProgram} />
            <View style={{ width: "98%" }}>
              <View style={styles.section}>
                <Text style={styles.subTitle}>Study Terms</Text>
                {prevStudyTerms.map((x) =>
                  RenderStudyTerm(x.year, x.term, x.courses)
                )}
                {newStudyTerms.map((x, index) => RenderNewStudyTerm())}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    let temp = [];
                    newStudyTerms.map((x) => temp.push(x));
                    temp.push({
                      year: year,
                      term: term,
                      courses: courses,
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
                  style={[
                    styles.button,
                    { backgroundColor: "#992222", width: 180 },
                  ]}
                  onPress={handleCancel()}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: "#229922", width: 180 },
                  ]}
                  onPress={handleSave()}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1f1f",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    paddingVertical: 10,
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
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  input: {
    borderColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    width: 200,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    alignSelf: "center",
    height: 60,
    width: 150,
    backgroundColor: "#262c2c",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    marginVertical: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "arial",
  },
  filterField: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  filterLabel: {
    fontWeight: "bold",
    width: "25%",
    color: "white",
  },
  labelWidth: {
    width: "40%",
  },
  filterInput: {
    borderWidth: 1,
    borderColor: "white",
    padding: 8,
    flex: 1,
    color: "white",
  },
  inputWidth: {
    width: "75%",
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

const Course = () => {};
