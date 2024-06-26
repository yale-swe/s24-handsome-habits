import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const WellnessBar = (props) => {
  const [wellnessValue, setWellnessValue] = useState(props.wellnessPoints);

  useEffect(() => {
    setWellnessValue(props.wellnessPoints);
  }, [props.wellnessPoints]);

  const barFullness = Math.floor((wellnessValue / 100) * 344);
  return (
    <View style={styles.wellnessBarBackground} testID={"wellness-background"}>
      <View
        style={[styles.wellnessBarForeground, { width: barFullness }]}
        testID={"wellness-foreground"}
      ></View>
    </View>
  );
};

WellnessBar.propTypes = {
  wellnessPoints: PropTypes.any,
};

const styles = StyleSheet.create({
  wellnessBarBackground: {
    width: 344,
    height: 29,
    backgroundColor: "#FFE29A",
    borderRadius: 10,
    bottom: "8%",
  },
  wellnessBarForeground: {
    height: 29,
    backgroundColor: "#FFB706",
    borderRadius: 10,
    position: "absolute",
    left: 0,
  },
});

export default WellnessBar;
