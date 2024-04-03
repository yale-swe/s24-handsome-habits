import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

const HabitButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={props.style}>
        <Image
          source={props.logo}
          style={styles.habitButtonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

HabitButton.propTypes = {
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
  habitButtonImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default HabitButton;
