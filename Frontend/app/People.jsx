import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import DropDownMenu from "../components/DropDownMenu";
import ProfilesListItem from "../components/ProfileListItem";
import { ScrollView } from "react-native-gesture-handler";

import { getStudents } from "./api";

const Page = () => {
  const router = useRouter();

  const [data, setData] = useState([
    {
      firstName: "fn1",
      lastName: "ln1",
      termInfo: "termInfo1",
      key: "__key1__",
    },
    {
      firstName: "fn2",
      lastName: "ln2",
      termInfo: "termInfo2",
      key: "__key2__",
    },
    {
      firstName: "fn3",
      lastName: "ln3",
      termInfo: "termInfo3",
      key: "__key3__",
    },
  ]);

  useEffect(async () => {
    const result = await getStudents("", "", "", "", "", "");
    setData(result);
  }, []);

  const handleProfileClick = (index) => {
    const params = new URLSearchParams({
      key: data[index].key,
    });

    router.push(`/ViewOtherProfile?${params.toString()}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={3} />
      </View>

      <ScrollView style={styles.body}>
        <View style={styles.contentBody}>
          <DropDownMenu data={data} setData={setData} />
          {data &&
            data.map((person, index) => (
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
      </ScrollView>
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
