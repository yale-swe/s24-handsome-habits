import { StyleSheet, Text, View } from "react-native";
import { Typography, Spacing, Colors } from "../styles";
import { useState } from "react";
import PropTypes from "prop-types";
import BackButton from "../components/backButton";
import { addHabit } from "../services/habitService";
import AddHabitButton from "../components/AddHabitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DescriptionInput from "../components/DescriptionInput";
import ThreeOptionBar from "../components/ThreeOptionBar";
import TitleInput from "../components/TitleInput";
import TimeSelect from "../components/TimeSelect";
import DurationSelect from "../components/DurationSelect";
import ToggleSwitch from "../components/ToggleSwitch";

// eslint-disable-next-line
const SleepLog = (props) => {
  // inputs
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("0");
  const [time, setTime] = useState(new Date());
  const [description, setDescription] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("");
  const [open, setOpen] = useState(false);
  const [dateIsConfirmed, setIsConfirmed] = useState(false);
  const [isToggle, setToggle] = useState(false);

  // quality options, can be renamed but must be len() = 3
  const qualityOptions = ["Low", "Medium", "High"];

  // function to log exercise through habitService
  const logSleep = async () => {
    const cookies = AsyncStorage.getItem("cookies");
    if (cookies) {
      axios.defaults.headers.Cookie = cookies;
    }

    // Same object that will be stored in db
    const newSleep = {
      title: title,
      category_name: "Sleeping",
      description: description,
      details: {
        sleep: {
          sleep_duration: duration,
          quality_of_sleep: selectedQuality,
          is_nap: isToggle,
        },
      },
      date_and_time: time,
    };

    // call service function
    await addHabit(newSleep);
    console.log("Adding sleep: ", newSleep);

    props.navigation.navigate("Sleep");

    // reset inputs
    setTitle("");
    setDuration("0");
    setTime(new Date());
    setDescription("");
    setSelectedQuality("");
    setIsConfirmed(false);
    setToggle(false);
  };

  SleepLog.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={() => props.navigation.navigate("Sleep")} testID="BackButton"/>
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

        <View style={styles.toggleContainer}>
          <Text style={styles.subHeading}>Nap?</Text>
          <ToggleSwitch isToggle={isToggle} setToggle={setToggle} testID="ToggleSwitch"/>
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.subHeading}>Duration</Text>
          <DurationSelect
            label="hours"
            increment={1}
            min={0}
            max={240}
            duration={duration}
            setDuration={setDuration}
            testID="DurationSelect"
          />
        </View>

        <View style={styles.qualityContainer}>
          <Text style={styles.subHeading}>Quality</Text>
          <View style={styles.qualityOptionContainer}>
            <ThreeOptionBar
              options={qualityOptions}
              selectedOption={selectedQuality}
              setSelectedOption={setSelectedQuality}
              testID="ThreeOptionBar"
            />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <DescriptionInput value={description} onChangeText={setDescription} testID="DescriptionInput"/>
        </View>

        <View style={styles.logButtonContainer}>
          <AddHabitButton text="Add Sleep" onPress={logSleep} testID="AddHabitButton"/>
        </View>
      </View>
    </View>
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
  timeContainer: {
    flexDirection: "row",
    marginBottom: Spacing.mediumMargin,
  },
  durationContainer: {
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
  qualityContainer: {
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
    marginTop: 10,
  },
  qualityOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeading: {
    ...Typography.header5,
    textAlign: "left",
  },
});

export default SleepLog;
