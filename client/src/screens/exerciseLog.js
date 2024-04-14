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

    // workout options, can be easily added to or removed from
    const typeOptions = [
        "Run",
        "Weights",
        "Walk",
        "Yoga",
        "Swimming",
        "Stretching",
        "Cardio",
        "Other",
    ];

    // intensity options, can be renamed but must be len() = 3
    const intensityOptions = ["Low", "Medium", "High"];

    // function to log exercise through habitService
    const logExercise = async () => {
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
                    workout_tag: selectedType,
                    workout_duration: duration,
                    workout_intensity: selectedIntensity,
                },
            },
            date_and_time: time,
        };

        // call service function
        await addHabit(newExercise);
        console.log("Adding workout: ", newExercise);

        props.navigation.navigate("Exercise");

        // reset inputs
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
                <BackButton
                    onPress={() => props.navigation.navigate("Exercise")}
                    testID="BackButton"
                />
            </View>

            <View style={styles.logContainer}>
                <View style={styles.titleContainer}>
                    <TitleInput
                        value={title}
                        onChangeText={setTitle}
                        testID="TitleInput"
                    />
                </View>

                <View style={styles.timeContainer}>
                    <Text style={styles.subHeading}>Time</Text>
                    <TimeSelect
                        testID="TimeSelect"
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
                        max={240}
                        duration={duration}
                        setDuration={setDuration}
                        testID="DurationSelect"
                    />
                </View>

                <View style={styles.workoutContainer}>
                    <Text style={styles.subHeading}>Workout Type</Text>
                    <HorizontalSelect
                        options={typeOptions}
                        selectedOption={selectedType}
                        setSelectedOption={setSelectedType}
                        testID="HorizontalSelect"
                    />
                </View>

                <View style={styles.intensityContainer}>
                    <Text style={styles.subHeading}>Intensity</Text>
                    <View style={styles.intensityOptionContainer}>
                        <ThreeOptionBar
                            options={intensityOptions}
                            selectedOption={selectedIntensity}
                            setSelectedOption={setSelectedIntensity}
                            testID="ThreeOptionBar"
                        />
                    </View>
                </View>

                <View style={styles.descriptionContainer}>
                    <DescriptionInput
                        value={description}
                        onChangeText={setDescription}
                        testID="DescriptionInput"
                    />
                </View>

                <View style={styles.logButtonContainer}>
                    <AddHabitButton text="Add Workout" onPress={logExercise} testID="AddHabitButton"/>
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
        justifyContent: "space-between",
    },
    timeContainer: {
        flexDirection: "row",
    },
    durationContainer: {
        flexDirection: "row",
    },
    titleContainer: {
        marginBottom: 10,
    },
    logButtonContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    descriptionContainer: {
        marginTop: 10,
    },
    intensityOptionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    subHeading: {
        ...Typography.header5,
        textAlign: "left",
    },
});

export default ExerciseLog;
