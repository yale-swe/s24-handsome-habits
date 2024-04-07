import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Typography } from "../styles";
import PropTypes from "prop-types";

const QuoteBox = (props) => {
  return (
    <View style={styles.container}>

        <Text style={styles.quoteText}>{props.quoteText}</Text>
        <Image source={props.image} style={styles.image}/>
      <StatusBar style="auto" />
    </View>
  );
};

QuoteBox.propTypes = {
  quoteText: PropTypes.string,
  image: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
    backgroundColor: "white",
    ...Typography.defaultFont,
  },
  quoteText: {
    ...Typography.header2
  },
  image: {
    width: 100,
    height: 100,
  },

});

export default QuoteBox;
