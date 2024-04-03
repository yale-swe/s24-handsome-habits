import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

const SettingsButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={props.style}>
        <Image
          source={props.logo}
          style={styles.settingsButtonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>{" "}
      <StatusBar style="auto" />
    </View>
  );
};

SettingsButton.propTypes = {
  logo: PropTypes.any,
  style: PropTypes.any,
  onPress: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  settingsButtonImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default SettingsButton;
