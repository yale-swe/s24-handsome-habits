import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Buttons, Colors } from "../styles";
import PropTypes from "prop-types";


const backButton = (props) => {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} style={styles.backButton}>
        <Image source={require("../assets/images/backarrow.png")} style={styles.arrow} />
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
  },
  backButton : {
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
