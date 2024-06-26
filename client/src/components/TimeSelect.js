import { Colors } from "../styles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import DatePicker from "react-native-date-picker";

const TimeSelect = (props) => {
  // Get the formatted current time
  const getTime = () => {
    // Get the current time
    const date = new Date(props.date);

    // Format the time as such "12:00pm"
    const formattedTime = date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .toLowerCase().replace(/\s/g, "");

    return formattedTime;
  };

  TimeSelect.propTypes = {
    date: PropTypes.any,
    setDate: PropTypes.func,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    dateIsConfirmed: PropTypes.bool,
    setIsConfirmed: PropTypes.func,
    testID: PropTypes.string,
  };
  return (
    <View testID={props.testID}>
      <DatePicker
        mode="time"
        modal
        open={props.open}
        date={props.date}
        onConfirm={(date) => {
          props.setOpen(false);
          props.setDate(date);
          props.setIsConfirmed(true);
        }}
        onCancel={() => {
          props.setOpen(false);
          props.setIsConfirmed(false);
        }}
      />
      <TouchableOpacity
        style={styles.smallInput}
        onPress={() => props.setOpen(true)}
        testID="touchableTime"
      >
        <Text style={{ color: props.dateIsConfirmed ? "black" : "grey" }}>
          {getTime()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  smallInput: {
    backgroundColor: Colors.Colors.columbiaBlue,
    borderRadius: 5,
    height: 25,
    marginStart: 10,
    textAlign: "center",
    paddingStart: 10,
    paddingEnd: 10,
    justifyContent: "center",
  },
});

export default TimeSelect;
