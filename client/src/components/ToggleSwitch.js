import { Colors } from "../styles";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

const ToggleSwitch = (props) => {
  ToggleSwitch.propTypes = {
    isToggle: PropTypes.bool,
    setToggle: PropTypes.func,
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.setToggle(!props.isToggle)}
      activeOpacity={1}
    >
      <View
        style={[
          styles.toggle,
          props.isToggle ? styles.toggleOn : styles.toggleOff,
        ]}
      >
        <View style={styles.circle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggle: {
    marginStart: 10,
    width: 50,
    height: 25,
    borderRadius: 25,
    justifyContent: "center",
  },
  toggleOn: {
    backgroundColor: Colors.Colors.skyBlue,
    alignItems: "flex-end",
  },
  toggleOff: {
    backgroundColor: Colors.Colors.lightGrey,
    alignItems: "flex-start",
  },
  circle: {
    backgroundColor: "white",
    width: 18,
    height: 18,
    borderRadius: 10,
    margin: 4,
  },
});

export default ToggleSwitch;
