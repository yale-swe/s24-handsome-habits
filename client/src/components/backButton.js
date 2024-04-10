import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Buttons, Colors } from "../styles";
import { View } from "react-native";
import PropTypes from "prop-types";

const backButton = (props) => {
  return (
    <View testID={props.testID}>
      <TouchableOpacity onPress={props.onPress} style={styles.backButton} testID="touchableBack">
        <Image
          source={require("../assets/images/backarrow.png")}
          style={styles.arrow}
        />
      </TouchableOpacity>
    </View>
  );
};

backButton.propTypes = {
  onPress: PropTypes.any,
  testID: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
    backgroundColor: Colors.Colors.navy,
  },
  backButton: {
    ...Buttons.backButton,
    backgroundColor: Colors.Colors.navy,
  },
  arrow: {
    width: 18,
    height: 18,
    margin: 3,
  },
});

export default backButton;
