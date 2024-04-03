import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

/* Constants */
const barWidth = 344,
  barHeight = 29;

const WellnessBar = (props) => {
  const [wellnessValue, setWellnessValue] = useState(props.wellnessPoints);

  useEffect(() => {
    setWellnessValue(props.wellnessPoints);
  }, [props.wellnessPoints]);

  const barFullness = Math.floor((wellnessValue / 100) * barWidth);
  return (
    <View style={styles.wellnessBarBackground}>
      <View
        style={[styles.wellnessBarForeground, { width: barFullness }]}
      ></View>
    </View>
  );
};

WellnessBar.propTypes = {
  wellnessPoints: PropTypes.any,
};

const styles = StyleSheet.create({
  wellnessBarBackground: {
    width: barWidth,
    height: barHeight,
    backgroundColor: "#FFE29A",
    borderRadius: 10,
    bottom: 92,
  },
  wellnessBarForeground: {
    height: barHeight,
    backgroundColor: "#FFB706",
    borderRadius: 10,
    position: "absolute",
    left: 0,
  },
});

export default WellnessBar;
