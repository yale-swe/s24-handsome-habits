import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Buttons } from "../styles";
import PropTypes from "prop-types";

const LoginButton = (props) => {
  return (
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Buttons } from "../styles";
import PropTypes from "prop-types";

const LoginButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={props.style}>
        <View style={Buttons.buttonContent}>
          <View style={styles.logoContainer}>
            <Image source={props.logo} style={styles.googleLogo} />
            <Image source={props.logo} style={styles.googleLogo} />
          </View>
          <Text style={Buttons.buttonText}>{props.title}</Text>
          <Text style={Buttons.buttonText}>{props.title}</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

LoginButton.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.any,
  onPress: PropTypes.any,
  );
};

LoginButton.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.any,
  onPress: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  logoContainer: {
    backgroundColor: "white",
    padding: 5,
    marginEnd: 15,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
  },
  googleLogo: {
    width: 30,
    height: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingEnd: 10,
  },
  // space: {
  //   // height: 20,
  // },
});

export default LoginButton;
