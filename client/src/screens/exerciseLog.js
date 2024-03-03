import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Buttons, Typography, Colors } from "../styles";
import PropTypes from "prop-types";
import BackButton from "../components/backButton";



// eslint-disable-next-line
const ExerciseLog = (props) => {

    ExerciseLog.propTypes = {
        navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired, 
        }).isRequired,
    };
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Exercise')} style={Buttons.habitButton}>
            <Text>Go Back to Excercise</Text>
        </TouchableOpacity>
        <BackButton onPress={() => props.navigation.navigate('Exercise')}/>
        <View style={styles.logContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
        />
        <View style={{flexDirection: "row"}}>
          <Text style={styles.subHeading}>Time</Text>
          {/* <TextInput
            style={styles.input}
            placeholder="Time"
          /> */}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Duration"
        />
        <TouchableOpacity style={styles.logButton}>
            <Text style={styles.logButtonText}>Add Workout</Text>
        </TouchableOpacity>

        </View>
        <Text style={Typography.header3}>LOG AN EXERCISE</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Colors.yellow,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  logContainer: {
    backgroundColor: "white",
    height: "70%",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    paddingTop: 30,
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
});

export default ExerciseLog;
