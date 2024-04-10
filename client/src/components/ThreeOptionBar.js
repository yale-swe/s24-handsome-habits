import { Colors } from "../styles";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const ThreeOptionBar = (props) => {
  ThreeOptionBar.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    selectedOption: PropTypes.string,
    setSelectedOption: PropTypes.func,
    testID: PropTypes.string,
  };
  return (
    <>
      <View style={styles.intensityLine} testID={props.testID}/>
      {props.options.map((option, index) => (
        <View style={styles.intensityOptionContainer} key={index}>
          <Text style={styles.optionLabel}>{option}</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.intensityCircle,
              option === props.selectedOption && styles.selectedIntensityCircle,
              index === 1 ? { left: "50%", marginLeft: -15 } : {},
            ]}
            onPress={() => props.setSelectedOption(option)}
            testID="touchable"
          ></TouchableOpacity>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  intensityLine: {
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
  intensityCircle: {
    width: 30,
    height: 30,
    marginTop: 5,
    backgroundColor: Colors.Colors.columbiaBlue,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.Colors.skyBlue,
    zIndex: 1,
  },
  selectedIntensityCircle: {
    backgroundColor: Colors.Colors.skyBlue,
  },
  optionLabel: {
    marginBottom: 3,
    marginTop: 10,
    width: "100%",
  },
});

export default ThreeOptionBar;
