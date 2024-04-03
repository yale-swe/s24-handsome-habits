import { StyleSheet, Text, View } from "react-native";
import { Typography, Colors } from "../styles";
import { useState } from "react";
import PropTypes from "prop-types";
import BackButton from "../components/backButton";
import { addHabit } from "../services/habitService";
import AddHabitButton from "../components/AddHabitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DescriptionInput from "../components/DescriptionInput";
import ThreeOptionBar from "../components/ThreeOptionBar";
import HorizontalSelect from "../components/HorizontalSelect";
import TitleInput from "../components/TitleInput";
import TimeSelect from "../components/TimeSelect";
import DurationSelect from "../components/DurationSelect";

// eslint-disable-next-line
const ExerciseLog = (props) => {

  // inputs
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("0");
  const [time, setTime] = useState(new Date());
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState("");
  const [open, setOpen] = useState(false);
  const [dateIsConfirmed, setIsConfirmed] = useState(false);



  const typeOptions = ["Run", "Weights", "Walk", "Yoga", "Swimming", "Stretching", "Cardio", "Other"];
  const intensityOptions = ["Low", "Medium", "High"];

  const logExercise = () => {

    const cookies = AsyncStorage.getItem("cookies");
    if (cookies) {
      axios.defaults.headers.Cookie = cookies;
    }

    // Same object that will be stored in db
    const newExercise = {
      title: title,
      category_name: "Exercising",
      description: description,
      details: {
        workout: {
          workout_tag: selectedType, workout_duration: duration, workout_intensity: selectedIntensity
      }},
      date_and_time: time,

    }

    addHabit(newExercise);
    console.log("Adding workout: ", newExercise);

    setTitle("");
    setDuration("0");
    setTime(new Date());
    setDescription("");
    setSelectedIntensity("");
    setSelectedType("");
    setIsConfirmed(false);
  };

    ExerciseLog.propTypes = {
        navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        }).isRequired,
    };
    return (
        <View style={styles.container}>
          <View style={styles.backButtonContainer}>
            <BackButton onPress={() => props.navigation.navigate("Exercise")}/>
          </View>
          <View style={styles.logContainer}>
            <View style={{marginBottom: 35}}>
              <TitleInput value={title} onChangeText={setTitle}/>
            </View>
            <View style={{flexDirection: "row", marginBottom: 15}}>
              <Text style={styles.subHeading}>Time</Text>
              <TimeSelect
                date={time}
                setDate={setTime}
                open={open}
                setOpen={setOpen}
                dateIsConfirmed={dateIsConfirmed}
                setIsConfirmed={setIsConfirmed}/>
            </View>
            <View style={{flexDirection: "row", marginBottom: 15}}>
              <Text style={styles.subHeading}>Duration</Text>
              <DurationSelect
                label="minutes"
                increment={5}
                min={0}
                max={240}
                duration={duration}
                setDuration={setDuration}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={[styles.subHeading, {textAlign: "left"}]}>Workout Type</Text>
              <HorizontalSelect options={typeOptions} selectedOption={selectedType} setSelectedOption={setSelectedType}/>

            </View>
            <View style={{marginBottom: 30}}>
              <Text style={[styles.subHeading, {textAlign: "left"}]}>Intensity</Text>
              <View style={styles.instensityContainer}>
                <ThreeOptionBar options={intensityOptions} selectedOption={selectedIntensity} setSelectedOption={setSelectedIntensity}/>
              </View>

            </View>
            <View style={styles.descriptionContainer}>
              <DescriptionInput value={description} onChangeText={setDescription}/>
            </View>
            <View style={styles.logButtonContainer}>
              <AddHabitButton text="Add Workout" onPress={logExercise}/>
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
  },

  backButtonContainer: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  logContainer: {
    backgroundColor: "white",
    height: "80%",
    width: "85%",
    borderRadius: 10,
    padding: 20,
    paddingBottom: 15,
    justifyContent: "center",
  },
  logButtonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  instensityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "80%",
  },

  titleInput: {
    backgroundColor: Colors.Colors.lightYellow,
    ...Typography.header4,
    textAlign: "left",
    height: 50,
    padding: 10,
    marginBottom: 25,
  },

  subHeading: {
    ...Typography.header5,
  },
  smallInput: {
    backgroundColor: Colors.Colors.columbiaBlue,
    borderRadius: 5,
    height: 25,
    marginStart: 10,
    textAlign: "center",
    paddingStart: 10,
    paddingEnd: 10,
    justifyContent: "center",
  },

  //
  // intensityLine: {
  //   // position: "absolute",
  //   // top: "50%",

  //   position: "absolute",
  //   marginLeft: 5,
  //   marginTop: 12,
  //   top: "50%",
  //   width: "90%",
  //   height: 10,
  //   zIndex: 0,
  //   borderColor: Colors.Colors.skyBlue,
  //   borderWidth: 1,
  //   backgroundColor: Colors.Colors.columbiaBlue,

  // },
  // intensityCircle : {
  //   width: 30,
  //   height: 30,
  //   marginTop: 5,
  //   backgroundColor: Colors.Colors.columbiaBlue,
  //   borderRadius: 20,
  //   borderWidth: 1,
  //   // position: "absolute",
  //   borderColor: Colors.Colors.skyBlue,
  //   zIndex: 1,
  // },
  // selectedIntensityCircle: {
  //   backgroundColor: Colors.Colors.skyBlue,
  // },
  intensityLabel: {
    // textAlign: "center",
    marginBottom: 3,
    marginTop: 10,
    width: "100%",

  },

});

export default ExerciseLog;