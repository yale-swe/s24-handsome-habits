import { Colors } from "../styles";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";

const DurationSelect = (props) => {
  DurationSelect.propTypes = {
    label: PropTypes.string,
    increment: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    duration: PropTypes.string,
    setDuration: PropTypes.func,
  };

  // on input change, set the duration to the new value
  const handleInputChange = (text) => {
    let newDuration = parseInt(text) || 0;
    if (newDuration < props.min || newDuration > props.max) {
      newDuration = 0;
    }
    props.setDuration(newDuration.toString());
  };

  // on button click, decrement
  const decrement = () => {
    props.setDuration(
      Math.max(props.min, parseInt(props.duration) - props.increment).toString()
    );
  };

  // on button click, increment
  const increment = () => {
    props.setDuration(
      Math.min(props.max, parseInt(props.duration) + props.increment).toString()
    );
  };

  return (
    <View style={styles.durationContainer}>
      <View style={styles.durationButton}>
        <TouchableOpacity onPress={decrement} style={styles.button}>
          <Text>-</Text>
        </TouchableOpacity>
        <TextInput
          style={[
            styles.input,
            { color: props.duration == "0" ? "grey" : "black" },
          ]}
          onChangeText={handleInputChange}
          value={props.duration}
          keyboardType="numeric"
          activeOpacity={1}
          testID="durationInput"
        />
        <TouchableOpacity onPress={increment} style={styles.button}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  durationButton: {
    backgroundColor: Colors.Colors.columbiaBlue,
    borderRadius: 5,
    height: 25,
    marginStart: 10,
    textAlign: "center",
    paddingStart: 10,
    paddingEnd: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    backgroundColor: Colors.Colors.columbiaBlue,
  },
  input: {
    marginStart: 10,
    marginEnd: 10,
  },
});

export default DurationSelect;
