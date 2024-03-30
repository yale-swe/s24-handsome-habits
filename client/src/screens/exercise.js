import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Buttons, Typography, Colors } from "../styles";
import PropTypes from "prop-types";
import QuoteBox from "../components/quoteBox";


// eslint-disable-next-line
const Exercise = (props) => {

    Exercise.propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };


  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")} style={Buttons.habitButton}>
            <Text>Go Back to Home</Text>
        </TouchableOpacity>
        <QuoteBox quoteText="the grind doesn’t stop." image={require("../assets/images/bulldog_workout.png")}> </QuoteBox>
        <View style={styles.logButtonContainer}>

          <TouchableOpacity onPress={() => props.navigation.navigate('ExerciseLog')} style={styles.logButton}>
              <Text style={styles.logButtonText}>Log a Workout</Text>
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
    backgroundColor: Colors.Colors.yellow,
    ...Typography.defaultFont,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  logButtonContainer: {
    alignItems: "center",

  },
  logButton: {
    backgroundColor: Colors.Colors.navy,
    ...Buttons.logButton,
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
  logButtonText: {
    color: "white",
    ...Typography.header4,
  }
});

export default Exercise;
