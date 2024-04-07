import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { Buttons } from "../styles";
import HabitButton from "../components/habitButton";
import SettingsButton from "../components/settingsButton";
import CoinsButton from "../components/coinsButton";
import WellnessBar from "../components/wellnessBar";
import DansWords from "../components/dansWords";
import EmotionVisualizer from "../components/emotionVisualizer";
import { getPointInfo } from "../services/PointsService";
import { useFocusEffect } from "@react-navigation/native";

const Home = (props) => {
  // set up the navigation for the home page
  Home.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  // variable and function for getting/setter user points
  const [pointsInfo, setPointsInfo] = React.useState(null);

  // fetches user points from the database
  const fetchPoints = async () => {
    try {
      const rawPoints = await getPointInfo();
      setPointsInfo(rawPoints);
    } catch (error) {
      console.log("Failed to retrieve user points to home.");
    }
  };

  React.useEffect(() => {
    // Fetch user's points and coins when the component mounts
    fetchPoints();
  }, []); // The empty array ensures this effect runs only once when the component mounts

  useFocusEffect(
    // Fetch user's points and coins when the component mounts after a navigation action
    React.useCallback(() => {
      fetchPoints();
    }, [])
  );

  return (
    <View style={styles.container} testID={"home-page"}>
      {/* container for settings and coins buttons */}
      <View style={styles.topButtonsContainer} testID={"top-buttons"}>
        <SettingsButton
          logo={require("../assets/images/bulldoghead.png")}
          style={Buttons.settingsButton}
          onPress={() => props.navigation.navigate("Exercise")}
          testID={"settings-button"}
        />
        <CoinsButton
          coinAmount={pointsInfo != null ? pointsInfo.coins : 0}
          logo={require("../assets/images/coin.png")}
          style={Buttons.coinsButton}
          onPress={() => props.navigation.navigate("Exercise")}
          testID={"coins-button"}
        />
      </View>
      <WellnessBar
        wellnessPoints={pointsInfo != null ? pointsInfo.wellness_points : 0}
      />
      {/* container for the message displayed above bulldog's head */}
      <DansWords danMessage={"Woof! Welcome to Handsome Habits!"} />
      {/* container for bulldog image and clothes, reactive emotions */}
      <EmotionVisualizer/>
      <View style={styles.habitButtonContainer} testID={"habit-buttons"}>
        <HabitButton
          logo={require("../assets/images/eating_icon.png")}
          style={Buttons.habitButton}
          onPress={() => props.navigation.navigate("EatLog")}
          testID={"eating-button"}
        />
        <HabitButton
          logo={require("../assets/images/exercising_icon.png")}
          style={Buttons.habitButton}
          onPress={() => props.navigation.navigate("Exercise")}
          testID={"exercising-button"}
        />
        <HabitButton
          logo={require("../assets/images/sleeping_icon.png")}
          style={Buttons.habitButton}
          onPress={() => props.navigation.navigate("SleepLog")}
          testID={"sleeping-button"}
        />
        <HabitButton
          logo={require("../assets/images/studying_icon.png")}
          style={Buttons.habitButton}
          onPress={() => props.navigation.navigate("StudyLog")}
          testID={"studying-button"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D5E7EC",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 105,
    width: "100%",
  },
  habitButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#0D3A4F",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
    height: 125,
  },
});

export default Home;
