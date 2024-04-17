import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Typography, Colors, Buttons } from "../styles";
import PropTypes from "prop-types";
import { retrieveHabitsByCategory } from "../services/habitService";
import BackButton from "../components/backButton";
import StudyLogList from "../components/studyLogList.js";

// eslint-disable-next-line
const Study = (props) => {
  Study.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  const [studyLogs, setStudyLogs] = useState([]);

  const fetchStudyLogs = async () => {
    try {
      const habits = await retrieveHabitsByCategory("Studying");
      setStudyLogs(habits); // Update the state with fetched logs
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  useEffect(() => {
    // Fetch study logs when the component mounts
    fetchStudyLogs();
  }, []); // The empty array ensures this effect runs only once when the component mounts

  useFocusEffect(
    // Fetch study logs when the component mounts after a navigation ction
    React.useCallback(() => {
      fetchStudyLogs();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.upperBox}>
        <View style={styles.backButtonContainer}>
          <BackButton onPress={() => props.navigation.navigate("Home")} />
        </View>
        <View style={styles.imageAndTextcontainer}>
          <Image
            source={require("../assets/images/Studying_Dan.png")}
            style={styles.bulldog}
          ></Image>
          <View style={styles.interludeContainer}></View>
          <View style={styles.messageContainer}>
            <Text style={Typography.boldItalic}> study smart, not hard.</Text>
          </View>
        </View>
      </View>
      <View style={styles.lowerBox}>
        <StudyLogList study={studyLogs} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate("StudyLog")}
          style={styles.logButton}
        >
          <Text style={styles.logButtonText}>Log a Study Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Colors.yellow,
    ...Typography.defaultFont,
  },
  backButtonContainer: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  upperBox: {
    paddingTop: 65,
    width: "auto",
    height: "auto",
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 1,
  },
  lowerBox: {
    flex: 1,
    backgroundColor: Colors.Colors.yellow,
    borderRadius: 10,
    padding: 35,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    zIndex: 0,
  },
  imageAndTextcontainer: {
    width: 392,
    height: 210.36,
    backgroundColor: "#white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "left",
  },
  messageContainer: {
    flex: 1,
    paddingLeft: 10,
    textAlign: "right",
  },
  interludeContainer: {
    width: 80,
  },
  bulldog: {
    margin: 0,
    width: 140,
    height: 210,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  logButtonText: {
    color: "white",
    ...Typography.header4,
  },
  logButtonContainer: {
    alignItems: "center",
  },
  logButton: {
    backgroundColor: Colors.Colors.navy,
    ...Buttons.logButton,
  },
});

export default Study;
