import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Buttons, Typography, Colors } from "../styles";
import PropTypes from "prop-types";


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
        <Text style={Typography.header3}>LOG AN EXERCISE</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Colors.beige,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ExerciseLog;
