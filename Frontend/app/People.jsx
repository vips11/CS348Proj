import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import Header from "../components/Header";
import DropDownMenu from "../components/DropDownMenu";
import ProfilesListItem from "../components/ProfileListItem";

const Page = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={3} />
      </View>

      <View style={styles.body}>
        <View style={styles.contentBody}>
          <DropDownMenu />

          <TouchableOpacity>
            <ProfilesListItem
              FirstName="Jon"
              LastName="Doe"
              TermInfo="2B Computer Science"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <ProfilesListItem
              FirstName="Jane"
              LastName="Doe"
              TermInfo="2A Honors Mathematics"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <ProfilesListItem
              FirstName="Brian"
              LastName="Dong"
              TermInfo="SWE Intern @ TD Canada Trust"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <ProfilesListItem
              FirstName="Rahul"
              LastName="Gandhi"
              TermInfo="Data Scientist Intern @ Amazon"
            />
          </TouchableOpacity>
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
