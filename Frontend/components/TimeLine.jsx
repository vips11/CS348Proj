import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

const TimeLine = ({ data }) => {
  return (
    <View style={styles.container}>
      {data
        .reverse()
        .map(({ type, term, termDescription, startDate, endDate }, index) => {
          return (
            <View key={index} style={styles.cardWrapper}>
              <View style={styles.card}>
                <View style={styles.cardIcon}>
                  {type === "study" ? (
                    <FontAwesome5 name="book-reader" size={24} color="white" />
                  ) : type === "work" ? (
                    <MaterialIcons
                      name="work-outline"
                      size={24}
                      color="white"
                    />
                  ) : (
                    <Ionicons name="home-outline" size={24} color="white" />
                  )}
                </View>

                <View style={styles.cardDelimiter}>
                  {index !== data.length - 1 && (
                    <View style={styles.cardDelimiterLine} />
                  )}

                  <View
                    style={[
                      styles.cardDelimiterInset,
                      index === 0 && {
                        backgroundColor: "#ffcb05",
                      },
                    ]}
                  />
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardBodyContent}>
                    <Text style={styles.cardTitle}>
                      {index === 0 ? term + " (Current)" : term}
                    </Text>

                    <Text style={styles.cardSubtitle}>{termDescription}</Text>

                    <Text style={styles.cardDates}>
                      {startDate} - {endDate}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default TimeLine;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
    alignSelf: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 48,
    height: 100,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardDelimiter: {
    position: "relative",
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  cardDelimiterInset: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderRadius: 9999,
    backgroundColor: "#fff",
    borderColor: "#ffcb05",
    zIndex: 9,
    position: "relative",
  },
  cardDelimiterLine: {
    position: "absolute",
    left: 30,
    top: "50%",
    borderLeftWidth: 1,
    borderColor: "#eee",
    height: "100%",
    zIndex: 1,
  },
  cardBody: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardBodyContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardBodyAction: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    maxWidth: 28,
    alignItems: "flex-end",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
    marginBottom: 3,
  },
  cardSubtitle: {
    maxWidth: "270px",
    fontSize: 14,
    fontWeight: "500",
    color: "#dddddd",
    marginBottom: 3,
  },
  cardDates: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ababab",
  },
});
