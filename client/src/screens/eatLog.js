import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Typography, Colors, Spacing } from "../styles";
import { useState } from "react";
import PropTypes from "prop-types";
import BackButton from "../components/backButton";
import { addHabit } from "../services/habitService";
import AddHabitButton from "../components/AddHabitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DescriptionInput from "../components/DescriptionInput";
import HorizontalSelect from "../components/HorizontalSelect";
import TitleInput from "../components/TitleInput";
import TimeSelect from "../components/TimeSelect";
import ToggleSwitch from "../components/ToggleSwitch";

// eslint-disable-next-line
const EatLog = (props) => {
  // inputs
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(new Date());
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [open, setOpen] = useState(false);
  const [dateIsConfirmed, setIsConfirmed] = useState(false);
  const [isToggle, setToggle] = useState(false);

  // meal options, can be easily added to or removed from
  const typeOptions = ["Snack", "Breakfast", "Lunch", "Dinner", "Other"];

  // function to log meal through habitService
  const logMeal = async () => {
    const cookies = AsyncStorage.getItem("cookies");
    if (cookies) {
      axios.defaults.headers.Cookie = cookies;
    }

    // Same object that will be stored in db
    const newMeal = {
      title: title,
      category_name: "Eating",
      description: description,
      details: {
        eating: {
          eating_tag: selectedType,
          healthy_meal: isToggle,
        },
      },
      date_and_time: time,
    };

    // call service function
    await addHabit(newMeal);
    console.log("Adding meal: ", newMeal);

    props.navigation.navigate("Eat");

    // reset inputs
    setTitle("");
    setTime(new Date());
    setDescription("");
    setSelectedType("");
    setIsConfirmed(false);
    setToggle(false);
  };

  EatLog.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.backButtonContainer}>
          <BackButton onPress={() => props.navigation.navigate("Eat")} testID="BackButton"/>
        </View>

        <View style={styles.logContainer}>
          <View style={styles.titleContainer}>
            <TitleInput value={title} onChangeText={setTitle} testID="TitleInput"/>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.subHeading}>Time</Text>
            <TimeSelect
              date={time}
              setDate={setTime}
              open={open}
              setOpen={setOpen}
              dateIsConfirmed={dateIsConfirmed}
              setIsConfirmed={setIsConfirmed}
              testID="TimeSelect"
            />
          </View>

          <View style={styles.mealContainer}>
            <Text style={styles.subHeading}>Meal Type</Text>
            <HorizontalSelect
              options={typeOptions}
              selectedOption={selectedType}
              setSelectedOption={setSelectedType}
              testID="HorizontalSelect"
            />
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.subHeading}>Healthy?</Text>
            <ToggleSwitch isToggle={isToggle} setToggle={setToggle} />
          </View>

          <View style={styles.descriptionContainer}>
            <DescriptionInput value={description} onChangeText={setDescription} testID="DescriptionInput"/>
          </View>

          <View style={styles.logButtonContainer}>
            <AddHabitButton text="Add Meal" onPress={logMeal} testID="AddHabitButton"/>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Colors.yellow,
    alignItems: "center",
    paddingTop: 65,
  },
  backButtonContainer: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  logContainer: {
    backgroundColor: "white",
    height: "80%",
    width: "85%",
    borderRadius: 10,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  mealContainer: {
    marginBottom: Spacing.mediumMargin,
  },
  timeContainer: {
    flexDirection: "row",
    marginBottom: Spacing.mediumMargin,
  },
  titleContainer: {
    marginBottom: Spacing.mediumMargin,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: Spacing.mediumMargin,
  },
  logButtonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: Spacing.mediumMargin,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30, // change this based on the spacing of other elements
  },
  descriptionContainer: {
    marginBottom: 0,
  },
  subHeading: {
    ...Typography.header5,
    textAlign: "left",
  },
});

export default EatLog;
