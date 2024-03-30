import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Buttons, Typography, Colors } from "../styles";
import { useState } from "react";
import PropTypes from "prop-types";
import BackButton from "../components/backButton";
import { addHabit } from "../services/habitService";
import AddHabitButton from "../components/addHabitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// eslint-disable-next-line
const ExerciseLog = (props) => {

  // inputs
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedIntensity, setSelectedIntensity] = useState(null);

  const typeOptions = ["Run", "Weights", "Walk", "Yoga", "Swimming", "Stretching", "Cardio", "Other"];
  const intensityOptions = ["Low", "Medium", "High"];

  // Create a Date object for the entered time and current date
  const addDate = (formattedTime) => {

    // Get the current date
    const date = new Date();

    // Get the hours, minutes, and AM/PM from the formatted time
    const [time, AMPM] = formattedTime.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    // Adjust hours for 24 hour time
    if (AMPM === "pm" && hours != 12) {
      hours += 12;
    }
    else if (AMPM === "am" && hours == 12) {
      hours = 0;
    }

    // Set the hours, minutes, seconds, and milliseconds of the date object
    date.setHours(hours, minutes, 0, 0);

    // Return in local time
    return date;
  }

  // Get the formatted current time
  const getTime = () => {

    // Get the current time
    const date = new Date();

    // Format the time as such "12:00pm"
    let formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).toLowerCase();

    return formattedTime;
  }


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
      date_and_time: addDate(time),

    }

    addHabit(newExercise);
    console.log("Adding workout: ", newExercise);

    setTitle("");
    setDuration("");
    setTime("");
    setDescription("");
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
            <TextInput
              style={[styles.titleInput, {marginBottom: 20}]}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <View style={{flexDirection: "row", marginBottom: 15}}>
              <Text style={styles.subHeading}>Time</Text>
              <TextInput
                style={[styles.smallInput, {width: 80}]}
                placeholder={getTime()}
                value={time}
                onChangeText={setTime}
              />
            </View>
            <View style={{flexDirection: "row", marginBottom: 15}}>
              <Text style={styles.subHeading}>Duration</Text>
              <TextInput
                style={[styles.smallInput, {width: 110}]}
                placeholder="(minutes)"
                value={duration}
                onChangeText={setDuration}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={[styles.subHeading, {textAlign: "left"}]}>Workout Type</Text>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.typesContainer}
              >
                {typeOptions.map((type, index) => (
                  <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  style={[styles.typeButton, type === selectedType && styles.selectedTypeButton]}
                  onPress={() => setSelectedType(type)}>
                    <Text>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

            </View>
            <View style={{marginBottom: 30}}>
              <Text style={[styles.subHeading, {textAlign: "left"}]}>Intensity</Text>
              <View style={styles.instensityContainer}>
                <View style={styles.intensityLine}/>
                  {intensityOptions.map((intensity, index) => (
                    <View style={styles.intensityOptionContainer} key={index} >
                      <Text style={styles.intensityLabel}>{intensity}</Text>
                      <TouchableOpacity
                      activeOpacity={1}
                      style={[
                        styles.intensityCircle,
                        intensity === selectedIntensity && styles.selectedIntensityCircle,
                        index === 1 ? { left: "50%", marginLeft: -15 } : {}]}
                      onPress={() => setSelectedIntensity(intensity)}>

                      </TouchableOpacity>
                    </View>
                  ))}
              </View>

            </View>
            <View style={styles.descriptionContainer}>
              <TextInput
                  style={[styles.descriptionInput]}
                  multiline={true}
                  placeholder="Description"
                  value={description}
                  onChangeText={setDescription}
                />
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
  typesContainer: {
    flexDirection: "row",
    paddingRight: 10,
    paddingTop: 10,
    // width: "80%",
    paddingLeft: 0,
  },
  titleInput: {
    backgroundColor: Colors.Colors.lightYellow,
    ...Typography.header4,
    textAlign: "left",
    height: 50,
    padding: 10,
    marginBottom: 25,
  },
  logButton: {
    ...Buttons.logButton,
    backgroundColor: Colors.Colors.navy,
  },
  logButtonText : {
    color: "white",
    ...Typography.header4,
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
  },
  descriptionContainer: {
    // marginBottom: 10,
  },
  intensityOptionContainer: {
    // alignItems: "center",
    // justifyContent: "center",

    // width: "33%",
  },

  descriptionInput: {
    backgroundColor: Colors.Colors.lightYellow,
    borderRadius: 5,
    textAlign: "left",
    textAlignVertical: "top",
    height: 125,
    paddingTop: 10,
    paddingLeft: 10,
    // paddingBottom: 10,
    paddingRight: 10,
  },
  typeButton: {
    backgroundColor: Colors.Colors.columbiaBlue,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderStyle: "dashed",
    borderColor: Colors.Colors.skyBlue,
    borderWidth: 2,
    margin: 5,
  },
  selectedTypeButton: {
    backgroundColor: Colors.Colors.skyBlue,
    // padding: 5,
    // paddingHorizontal: 20,
    // borderRadius: 30,
    // borderStyle: "solid",
    // borderColor: "black",
    // borderWidth: 2,
    // margin: 5,
  },
  intensityLine: {
    // position: "absolute",
    // top: "50%",

    position: "absolute",
    marginLeft: 5,
    marginTop: 12,
    top: "50%",
    width: "90%",
    height: 10,
    zIndex: 0,
    borderColor: Colors.Colors.skyBlue,
    borderWidth: 1,
    backgroundColor: Colors.Colors.columbiaBlue,

  },
  intensityCircle : {
    width: 30,
    height: 30,
    marginTop: 5,
    backgroundColor: Colors.Colors.columbiaBlue,
    borderRadius: 20,
    borderWidth: 1,
    // position: "absolute",
    borderColor: Colors.Colors.skyBlue,
    zIndex: 1,
  },
  selectedIntensityCircle: {
    backgroundColor: Colors.Colors.skyBlue,
  },
  intensityLabel: {
    // textAlign: "center",
    marginBottom: 3,
    marginTop: 10,
    width: "100%",

  },

});

export default ExerciseLog;