import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

import Header from "../components/Header";
import Post from "../components/Post";

const data = {
  name: "Musical Friday",
  description: "Every friday, we gather together and do some karoke",
  posts: [
    {
      title: "Post Title 1",
      description: "This is a post description 1.",
    },
    {
      title: "Post Title 2",
      description: "This is a post description 2.",
    },
    {
      title: "Post Title 3",
      description: "This is a post description 3.",
    },
    {
      title: "Post Title 4",
      description: "This is a post description 4.",
    },
  ],
};
const ViewSpace = () => {
  const spaces = [
    {
      space_ID: 1,
      name: "Musical Fridays",
      description: "Every friday, we gather together and do some karoke",
      posts: [
        {
          title: "Hello!",
          description: "blah, blah, blash",
        },
        {
          title: "Hello!",
          description: "blah, blah, blash",
        },
        {
          title: "Hello!",
          description: "blah, blah, blash",
        },
        {
          title: "Hello!",
          description: "blah, blah, blash",
        },
      ],
    },
    {
      space_ID: 2,
      name: "Cooking Classes",
      description:
        "Want to learn how to cook? We make everything from cookies to pasta to bread.",
    },
    {
      space_ID: 3,
      name: "Computer Science Students",
      description: "For anyone taking any computer science or related courses",
    },
    {
      space_ID: 4,
      name: "Residence first years",
      description:
        "A space for all first years living in a University of Waterloo residence",
    },
    {
      space_ID: 5,
      name: "WIT",
      description: "A space for women in technology",
    },
    {
      space_ID: 6,
      name: "nature lovers",
      description: "for all nature enthusiasts",
    },
    {
      space_ID: 7,
      name: "soccer league",
      description:
        "you can find the results and shedule for the soccer league here",
    },
    {
      space_ID: 8,
      name: "data science club",
      description: "We meet weekly on Mondays, see the link for more info.",
    },
    {
      space_ID: 9,
      name: "engineering students",
      description: "A space for all engineering students",
    },
    {
      space_ID: 10,
      name: "graduating class",
      description:
        "About to graduate and have any questions? This is the space for you",
    },
    {
      space_ID: 11,
      name: "Students Association",
      description: "advocating for you student rights",
    },
    {
      space_ID: 12,
      name: "book exhange",
      description: "Exchange textbooks here",
    },
    {
      space_ID: 13,
      name: "Room Sublets",
      description: "Find a sublet in this space",
    },
    {
      space_ID: 14,
      name: "Coop Students",
      description:
        "A space for coop students to ask any questions about co-ops",
    },
    {
      space_ID: 15,
      name: "California Coops",
      description: "Have a coop in California? Join our space!",
    },
    {
      space_ID: 16,
      name: "Kinesiology Students",
      description: "space for kin students at  UWaterloo",
    },
    {
      space_ID: 17,
      name: "Med School",
      description:
        "Applying for med school? Ask any questions you may have here",
    },
    {
      space_ID: 18,
      name: "Cheese lovers",
      description: "Join this space for information about our cheese club",
    },
    {
      space_ID: 19,
      name: "Boba tea lovers",
      description: "Love Boba? Join!",
    },
    {
      space_ID: 20,
      name: "Study abroad",
      description: "A space for students studying or planning to study abroad",
    },
    {
      space_ID: 21,
      name: "grad students",
      description: "A space for grad students to meet one another",
    },
    {
      space_ID: 22,
      name: "book club",
      description: "get recommendations on which book to read next",
    },
    {
      space_ID: 23,
      name: "Arts Students",
      description: "A space for all sttudents in any arts related program",
    },
    {
      space_ID: 24,
      name: "Math Students",
      description: "A space for students in the faculty of mathematics",
    },
    {
      space_ID: 25,
      name: "TSA",
      description: "teaching student association",
    },
    {
      space_ID: 26,
      name: "Karate",
      description: "learn karate, join this space for more info.",
    },
    {
      space_ID: 27,
      name: "Roman Hist Club",
      description: "A space to learn more about roman history",
    },
    {
      space_ID: 28,
      name: "Umemployed",
      description: "for students currently looking for a coop",
    },
    {
      space_ID: 29,
      name: "business enthusiasts",
      description: "we talk about various talks relating to business",
    },
    {
      space_ID: 30,
      name: "movie lovers",
      description:
        "get recommendations on the latest and old movies that are a must watch",
    },
  ];

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header pageNum={2} />
      </View>
      <View style={styles.body}>
        <View style={styles.contentBody}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.subtitle}>{data.description}</Text>
          {data.posts.map((post, idx) => (
            <Post key={idx} title={post.title} description={post.description} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default ViewSpace;

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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  contentBody: {
    width: "55%",
    height: "100%",

    padding: "1%",

    backgroundColor: "#171a1a",
    alignSelf: "center",
  },
});
