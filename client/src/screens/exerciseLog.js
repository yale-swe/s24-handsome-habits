import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Buttons, Typography, Colors } from "../styles";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BackButton from "../components/backButton";
import { addHabit } from "../services/habitService";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "mongoose";


// eslint-disable-next-line
const ExerciseLog = (props) => {

  
  // inputs
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');


  // Create a Date object for the entered time and current date
  addDate = (formattedTime) => {

    // Get the current date
    const date = new Date();

    // Get the hours, minutes, and AM/PM from the formatted time
    const [time, AMPM] = formattedTime.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    // Adjust hours for 24 hour time
    if (AMPM === 'pm' && hours != 12) {
      hours += 12;
    }
    else if (AMPM === 'am' && hours == 12) {
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
    let formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
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
    newExercise = {
      title: title,
      category_name: "Exercising",
      description: description,
      details: { 
        workout: {
          workout_tag: "yoga", workout_duration: duration, workout_intensity: "low"
      }},
      date_and_time: addDate(time),

    }

    addHabit(newExercise);
    console.log("Adding workout: ", newExercise);

    setTitle('');
    setDuration('');
    setTime('');
    setDescription('');


  };

    ExerciseLog.propTypes = {
        navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired, 
        }).isRequired,
    };
    return (
        <View style={styles.container}>
          <View style={styles.backButtonContainer}>
            <BackButton onPress={() => props.navigation.navigate('Exercise')}/>
          </View>
          <View style={styles.logContainer}>
            <TextInput
              style={[styles.titleInput, {marginBottom: 20}]}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <View style={{flexDirection: "row", marginBottom: 20}}>
              <Text style={styles.subHeading}>Time</Text>
              <TextInput
                style={[styles.smallInput, {width: 80}]}
                placeholder={getTime()}
                value={time}
                onChangeText={setTime}
              /> 
            </View>
            <View style={{flexDirection: "row", marginBottom: 20}}>
              <Text style={styles.subHeading}>Duration</Text>
              <TextInput
                style={[styles.smallInput, {width: 110}]}
                placeholder="30 minutes"
                value={duration}
                onChangeText={setDuration}
              />
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={[styles.subHeading, {textAlign: "left"}]}>Workout Type</Text>

            </View>
            <View style={{marginBottom: 20}}>
              <Text style={[styles.subHeading, {textAlign: "left"}]}>Intensity</Text>

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
              <TouchableOpacity style={styles.logButton} onPress={logExercise}>
                  <Text style={styles.logButtonText}>Add Workout</Text>
              </TouchableOpacity>
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
    marginBottom: 20,
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  logContainer: {
    backgroundColor: "white",
    height: "80%",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    paddingTop: 30,
    justifyContent: "center",
  },
  logButtonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 60,
  },
  titleInput: {
    backgroundColor: Colors.Colors.lightYellow,
    ...Typography.header4,
    textAlign: "left",
    height: 50,
    padding: 10,
    marginBottom: 15,
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
    backgroundColor: Colors.Colors.lightBlue,
    borderRadius: 5,
    height: 25,
    marginStart: 10,
    textAlign: "center",
  },
  descriptionContainer: {
    marginBottom: 20,
  },

  descriptionInput: {
    backgroundColor: Colors.Colors.lightYellow,
    borderRadius: 5,
    textAlign: "left",
    textAlignVertical: "top",
    height: 150,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
});

export default ExerciseLog;
