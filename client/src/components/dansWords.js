import { StyleSheet, Text, View } from "react-native";
import { Typography } from "../styles";
import PropTypes from "prop-types";

const DansWords = (props) => {

  DansWords.propTypes = {
    danMessage: PropTypes.string,
  };

  return (
    <View style={styles.messageContainer} testID={"dans-words-testing"}>
      <Text style={Typography.message}> {props.danMessage} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    width: 295,
    height: 62,
    backgroundColor: "#F8EDDD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    bottom: "4%",
  },
});

export default DansWords;
