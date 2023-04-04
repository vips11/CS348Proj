import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const profile = {
  firstName: "Jane",
  lastName: "Doe",
  description:
    "Hi there, I'm John. I'm an international student originally from Argentina, and I'm from currently studying CS.",
  termInfo: [
    {
      type: "study",
      term: "1A",
      termDescription: "Math 135, Math 137, CS 135, Phys 121, SPCOM 100",
      courses: ["Math 135", "Math 137", "CS 135", "Phys 121", "SPCOM 100"],
      position: "",
      company: "",
      startDate: "Sept 2020",
      endDate: "Dec 2020",
    },
    {
      type: "study",
      term: "1B ",
      termDescription: "Math 136, Math 138, CS 136, AFM 101, Econ 101",
      courses: ["Math 136", "Math 138", "CS 165", "AFM 101", "ECON 101"],
      position: "",
      company: "",
      startDate: "Jan 2021",
      endDate: "Apr 2021",
    },
    {
      type: "work",
      term: "Coop 1",
      courses: [],
      termDescription: "Software Developer @ ABC Inc.",
      position: "Software Developer",
      company: "ABC Inc.",
      startDate: "May 2021",
      endDate: "Aug 2021",
    },
    {
      type: "study",
      term: "2A",
      termDescription: "CS 245, CS 246, Math 239, Stat 230, AFM 102",
      courses: ["CS 245 136", "CS 246", "Math 239", "Stat 230", "AFM 102"],
      position: "",
      company: "",
      startDate: "Sep 2021",
      endDate: "Dec 2021",
    },
    {
      type: "off",
      term: "Off-Term",
      termDescription: "I took a break!",
      courses: [],
      position: "",
      company: "",
      startDate: "Jan 2022",
      endDate: "April 2022",
    },
    {
      type: "work",
      term: "Coop 2",
      termDescription: "Software Developer @ DEF Inc.",
      courses: [],
      position: "Software Developer",
      company: "DEF Inc.",
      startDate: "May 2022",
      endDate: "Aug 2022",
    },
    {
      type: "study",
      term: "2B",
      termDescription: "CS 241, CS 251, CS 240, SPCOM 200, Stat 231 ",
      courses: ["CS 241", "CS 251", "CS 240", "SPCOM 200", "Stat 231"],
      position: "",
      company: "",
      startDate: "Sept 2022",
      endDate: "Dec 2022",
    },
  ],
  links: {
    linkedin: "https://www.linkedin.com",
    email: "mailto:email@gmail.com",
    github: "https://www.github.com",
    discord: "https://www.discord.com",
  },
};

const EditProfile = () => {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [program, setProgram] = useState(profile.program);

  const [terms, setTerms] = useState(profile.termInfo);

  const [newTermType, setNewTermType] = useState("");
  const [newTermName, setNewTermName] = useState("");
  const [newTermStartDate, setNewTermStartDate] = useState("");
  const [newTermEndDate, setNewTermEndDate] = useState("");
  const [newTermCompany, setNewTermCompany] = useState("");
  const [newTermPosition, setNewTermPosition] = useState("");
  const [newTermCourses, setNewTermCourses] = useState([]);

  const [links, setLinks] = useState(profile.links);

  const handleUpdateProfile = () => {
    const updatedProfile = {
      firstName,
      lastName,
      program,
      termInfo: terms,
      links,
    };
    onUpdateProfile(updatedProfile);
  };

  const handleAddTerm = (termType) => {
    const newTerm = {
      type: termType,
      term: newTermName,
      startDate: newTermStartDate,
      endDate: newTermEndDate,
    };

    if (termType === "study") {
      newTerm.courses = newTermCourses;
    } else if (termType === "work") {
      newTerm.company = newTermCompany;
      newTerm.position = newTermPosition;
    }

    setTerms([...terms, newTerm]);
    setNewTermType("");
    setNewTermName("");
    setNewTermStartDate("");
    setNewTermEndDate("");
    setNewTermCompany("");
    setNewTermPosition("");
    setNewTermCourses([]);
  };

  const handleRemoveTerm = (index) => {
    const newTerms = [...terms];
    newTerms.splice(index, 1);
    setTerms(newTerms);
  };
  return (
    <View>
      <ScrollView>
        <Text>First Name</Text>
        <TextInput
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />

        <Text>Last Name</Text>
        <TextInput
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />

        <Text>Program</Text>
        <TextInput onChangeText={(text) => setProgram(text)} value={program} />

        <Text>Terms</Text>
        {terms.map((term, index) => (
          <View key={index}>
            <Text>{term.type}</Text>
            <Text>{term.term}</Text>
            <Text>Start Date: {term.startDate}</Text>
            <Text>End Date: {term.endDate}</Text>

            {term.type === "study" && (
              <>
                <Text>Courses: {term.courses.join(", ")}</Text>
              </>
            )}

            {term.type === "work" && (
              <>
                <Text>Company: {term.company}</Text>
                <Text>Position: {term.position}</Text>
              </>
            )}

            <Button
              title="Remove Term"
              onPress={() => handleRemoveTerm(index)}
            />
          </View>
        ))}

        <Text>Add Term</Text>
        <View>
          <Text>Type:</Text>
          <TextInput
            onChangeText={(text) => setNewTermType(text)}
            value={newTermType}
          />
        </View>
        <View>
          <Text>Name:</Text>
          <TextInput
            onChangeText={(text) => setNewTermName(text)}
            value={newTermName}
          />
        </View>
        <View>
          <Text>Start Date:</Text>
          <TextInput
            onChangeText={(text) => setNewTermStartDate(text)}
            value={newTermStartDate}
          />
        </View>
        <View>
          <Text>End Date:</Text>
          <TextInput
            onChangeText={(text) => setNewTermEndDate(text)}
            value={newTermEndDate}
          />
        </View>
        {
          <View>
            <Text>Courses:</Text>
            <TextInput
              onChangeText={(text) => setNewTermCourses(text.split(","))}
              value={newTermCourses.join(",")}
            />
          </View>
        }
        {
          <>
            <View>
              <Text>Company:</Text>
              <TextInput
                onChangeText={(text) => setNewTermCompany(text)}
                value={newTermCompany}
              />
            </View>
            <View>
              <Text>Position:</Text>
              <TextInput
                onChangeText={(text) => setNewTermPosition(text)}
                value={newTermPosition}
              />
            </View>
          </>
        }
        <Button
          title="Add Term"
          onPress={() => handleAddTerm()}
          styles={[styles.button, styles.buttonText]}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  inputLabel: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
