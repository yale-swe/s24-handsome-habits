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

// eslint-disable-next-line
const StudyLog = (props) => {
  // inputs
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("0");
  const [time, setTime] = useState(new Date());
  const [description, setDescription] = useState("");
  const [selectedProductivity, setSelectedProductivity] = useState("");
  const [open, setOpen] = useState(false);
  const [dateIsConfirmed, setIsConfirmed] = useState(false);


  // productivity options, can be renamed but must be len() = 3
  const productivityOptions = ["Low", "Medium", "High"];

  // function to log study through habitService
  const logStudy = async () => {
    const cookies = AsyncStorage.getItem("cookies");
    if (cookies) {
      axios.defaults.headers.Cookie = cookies;
    }

    // Same object that will be stored in db
    const newStudy = {
      title: title,
      category_name: "Studying",
      description: description,
      details: {
        study: {
          study_duration: duration,
          study_productivity: selectedProductivity,
        },
      },
      date_and_time: time,
    };

    // call service function
    await addHabit(newStudy);
    console.log("Adding study session: ", newStudy);

    props.navigation.navigate("Home");

    // reset inputs
    setTitle("");
    setDuration("0");
    setTime(new Date());
    setDescription("");
    setSelectedProductivity("");
    setIsConfirmed(false);
  };

  StudyLog.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={() => props.navigation.navigate("Home")} />
      </View>

      <View style={styles.logContainer}>
        <View style={styles.titleContainer}>
          <TitleInput value={title} onChangeText={setTitle} />
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
          />
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.subHeading}>Duration</Text>
          <DurationSelect
            label="minutes"
            increment={5}
            min={0}
            max={700}
            duration={duration}
            setDuration={setDuration}
          />
        </View>

        <View style={styles.productivityContainer}>
          <Text style={styles.subHeading}>Productivity</Text>
          <View style={styles.productivityOptionContainer}>
            <ThreeOptionBar
              options={productivityOptions}
              selectedOption={selectedProductivity}
              setSelectedOption={setSelectedProductivity}
            />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <DescriptionInput value={description} onChangeText={setDescription} />
        </View>

        <View style={styles.logButtonContainer}>
          <AddHabitButton text="Add Study Session" onPress={logStudy} />
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
  productivityContainer: {
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
  productivityOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeading: {
    ...Typography.header5,
    textAlign: "left",
  },
});

export default StudyLog;