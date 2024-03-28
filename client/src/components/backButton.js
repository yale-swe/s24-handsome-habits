import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Buttons, Typography, Colors } from "../styles";
import PropTypes from "prop-types";


const backButton = (props) => {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} style={styles.backButton}>
            <Text style={styles.buttonText}>{'<'}HELLO</Text>
        </TouchableOpacity>
    </>


  );
};

backButton.propTypes = {
  onPress: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
    backgroundColor: Colors.Colors.navy,
    // ...Typography.defaultFont,
  },
  backButton : {
    ...Buttons.backButton,
    backgroundColor: Colors.Colors.navy,
  },
  buttonText: {
    ...Typography.passion,
    color: "white",
  }
});

export default backButton;
