import { StyleSheet, View  } from "react-native";
import { Image } from "react-native";
// import PropTypes from "prop-types"; can add back once we actually do variable emotion

const EmotionVisualizer = () => {
  return (
    <View style={styles.bulldogContainer}>
        <Image source={require("../assets/images/bulldog.png")} style={styles.bulldog}/>
    </View>
  );
}

// WellnessBar.propTypes = {
//     emotion: PropTypes.any,
//   };

  const styles = StyleSheet.create({
    bulldog: {
      margin: 30,
      width: 200,
      height: 300,
    },
    bulldogContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      padding: 10,
      borderRadius: 20,
      width: 258,
      height: 394,
      bottom: 20,
    },
  });

  export default EmotionVisualizer;