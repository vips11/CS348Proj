import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import Header from "../components/Header";
import DropDownMenu from "../components/DropDownMenu";
import ProfilesListItem from "../components/ProfileListItem";

const data = [
  {
    key: "anthonyV@uwaterloo.ca",
    firstName: "Anthony",
    lastName: "Vasquez",
    termInfo: "2B Computer Science",
  },
  {
    key: "djon1234@uwaterloo.ca",
    firstName: "Jon",
    lastName: "Doe",
    termInfo: "2A Computer Science",
  },
  {
    key: "djane123@uwaterloo.ca",
    firstName: "Jane",
    lastName: "Doe",
    termInfo: "2A Computer Science",
  },
  {
    key: "mlkjr420@uwaterloo.ca",
    firstName: "Martin Luther",
    lastName: "King Jr",
    termInfo: "4A Legal Studies",
  },
  {
    key: "bwayne12@uwaterloo.ca",
    firstName: "Bruce",
    lastName: "Wayne",
    termInfo: "3A Math Business and Physics Joint",
  },
  {
    key: "ckent123@uwaterloo.ca",
    firstName: "Clark",
    lastName: "Kent",
    termInfo: "4A English",
  },
  {
    key: "ballen12@uwaterloo.ca",
    firstName: "Bary",
    lastName: "Allen",
    termInfo: "1A Criminology",
  },
  {
    key: "oqueen12@uwaterloo.ca",
    firstName: "Oliver",
    lastName: "Queen",
    termInfo: "4B Policial Science",
  },
];

const Page = () => {
  const handleProfileClick = (index) => {
    console.log(index);
    console.log(data[index]);
    console.log("Going to View Profile Screen");
    console.log("----------------------------");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={3} />
      </View>

      <View style={styles.body}>
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
      </View>
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
