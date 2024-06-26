import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Typography, Colors, Buttons } from "../styles";
import PropTypes from "prop-types";
import { retrieveHabitsByCategory } from "../services/habitService";
import BackButton from "../components/backButton";
import MealLogList from "../components/mealLogList.js";

// eslint-disable-next-line
const Eat = (props) => {
  Eat.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  const [mealLogs, setMealLogs] = useState([]);

  const fetchMealLogs = async () => {
    try {
      const habits = await retrieveHabitsByCategory("Eating");
      setMealLogs(habits); // Update the state with fetched logs
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  useEffect(() => {
    // Fetch meal logs when the component mounts
    fetchMealLogs();
  }, []); // The empty array ensures this effect runs only once when the component mounts

  useFocusEffect(
    // Fetch meal logs when the component mounts after a navigation action
    React.useCallback(() => {
      fetchMealLogs();
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
            source={require("../assets/images/Eating_Dan.png")}
            style={styles.bulldog}
          ></Image>
          <View style={styles.interludeContainer}></View>
          <View style={styles.messageContainer}>
            <Text style={Typography.boldItalic}> eat better, feel better.</Text>
          </View>
        </View>
      </View>
      <View style={styles.lowerBox}>
        <MealLogList meals={mealLogs} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate("EatLog")}
          style={styles.logButton}
        >
          <Text style={styles.logButtonText}>Log a Meal</Text>
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
    width: 100,
  },
  bulldog: {
    margin: 0,
    width: 135,
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

export default Eat;
