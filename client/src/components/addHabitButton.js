import { Buttons, Typography, Colors } from "../styles";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import PropTypes from "prop-types";

const AddHabitButton = (props) => {

    AddHabitButton.propTypes = {
        text: PropTypes.string,
        onPress: PropTypes.any,
      };
    return (
        <TouchableOpacity style={styles.logButton} onPress={props.onPress}>
            <Text style={styles.logButtonText}>{props.text}</Text>
        </TouchableOpacity>
    );
} 

const styles = StyleSheet.create({
    logButton: {
        ...Buttons.logButton,
        backgroundColor: Colors.Colors.navy,
      },
    logButtonText : {
        color: "white",
        ...Typography.header4,
    },
});

export default AddHabitButton;