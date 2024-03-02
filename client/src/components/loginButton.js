import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Buttons, Typography } from "../styles";
import PropTypes from "prop-types";


const LoginButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={props.style}>
        <View style={Buttons.buttonContent}>
          <View style={styles.logoContainer}>
            <Image source={props.logo} style={styles.googleLogo} />
          </View>
          <Text style={styles.buttonTextArea}>{props.title}</Text>
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
};

LoginButton.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.any,
  onPress: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
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
  buttonTextArea: {
    ...Buttons.buttonTextArea,
    ...Typography.buttonText,
  },
});

export default LoginButton;
