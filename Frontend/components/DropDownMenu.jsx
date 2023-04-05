import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import { getStudents } from "../app/api";

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

const DropDownMenu = ({ data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [program, setProgram] = useState("");
  const [term, setTerm] = useState("");
  const [companies, setCompanies] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const applyFilters = async () => {
    const result = await getStudents(
      firstName,
      lastName,
      program,
      term,
      companies,
      courses
    );

    setData(result);
    setIsOpen(false);
  };

  return (
    <View style={{ width: "100%", marginBottom: "20px" }}>
      <TouchableOpacity onPress={toggleMenu} style={styles.filterButton}>
        <Text style={styles.filterButtonText}>
          {isOpen ? "Hide Filters" : "Filter"}
        </Text>
        <Text style={styles.filterButtonArrow}>{isOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.filterFields}>
          <Field label="First Name" value={firstName} onChange={setFirstName} />
          <Field label="Last Name" value={lastName} onChange={setLastName} />
          <Field label="Program" value={program} onChange={setProgram} />
          <Field label="Term" value={term} onChange={setTerm} />
          <Field label="Companies" value={companies} onChange={setCompanies} />

          <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262c2c",
    padding: 10,
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
  filterFields: {
    backgroundColor: "#3c4141",
    padding: 10,
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
    width: "25%",
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
  applyButton: {
    backgroundColor: "#515656",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  applyButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DropDownMenu;
