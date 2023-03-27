import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import Header from "../components/Header";
import { TextInput } from "react-native-gesture-handler";

const EditProfile = () => {
  const [isAddNewTermAvailable, setAddNewTermAvailable] = useState(false);
  const [isAddingCoopTerm, setAddingCoopTerm] = useState(false);
  const [count, setCount] = useState(0);

  const renderInput = (idx) => (
    <View style={styles.inputContainer} key={idx}>
      <Text style={styles.title}>Course Number {idx}:</Text>
      <TextInput style={styles.input} />
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={0} />
      </View>
      <SafeAreaView style={styles.body}>
        <View style={styles.contentBody}>
          <Text style={styles.header}>Edit your information</Text>
          <ScrollView
            contentContainerStyle={{
              height: "100%",
              width: "70%",
              alignItems: "center",
              paddingVertical: 20,
              marginBottom: 20,
              alignSelf: "center",
            }}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.title}>First Name:</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Last Name:</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>UW Email:</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Program:</Text>
              <TextInput style={styles.input} />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setAddNewTermAvailable(true)}
            >
              <Text style={styles.buttonText}> Add new term</Text>
            </TouchableOpacity>
            {isAddNewTermAvailable ? (
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Term:</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Semester:</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Year:</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Program:</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => setAddingCoopTerm(true)}
                  >
                    <Text style={styles.buttonText}> Coop term</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => setAddingCoopTerm(false)}
                  >
                    <Text style={styles.buttonText}> Study term</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {isAddingCoopTerm ? (
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Company name:</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Position:</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Location:</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Start date:</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>End date:</Text>
                  <TextInput style={styles.input} />
                </View>
              </View>
            ) : (
              <View style={styles.inputContainer}>
                {/* enter course names separated by commas */}
                <Text style={styles.title}>Enter courses:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setCount(text)}
                />
              </View>
            )}
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
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
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    alignSelf: "center",
    marginRight: 10,
    width: "50%",
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
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "arial",
  },
});
