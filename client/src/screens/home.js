import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Buttons} from "../styles";
import HabitButton from "../components/habitButton";
import SettingsButton from "../components/settingsButton";
import CoinsButton from "../components/coinsButton";
import WellnessBar from "../components/wellnessBar";
import DansWords from "../components/dansWords";
import EmotionVisualizer from "../components/emotionVisualizer";
import { getPointInfo } from "../services/PointsService";
import { useFocusEffect } from "@react-navigation/native";
import { Buttons, Typography, Colors } from "../styles";
import BottomBar from "../components/BottomBar";

const Home = (props) => {
  Home.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  const [pointsInfo, setPointsInfo] = useState(null);

  const fetchPoints = async () => {
    try {
      const rawPoints = await getPointInfo();
      setPointsInfo(rawPoints);
    } catch (error) {
      console.log("Failed to retrieve user points to home.");
    }
  };

  useEffect(() => {
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
    <View style={styles.container}>
     <View style={styles.topButtonsContainer}>
        <SettingsButton
          logo={require("../assets/images/bulldoghead.png")}
          style={Buttons.settingsButton}
          onPress={() => props.navigation.navigate("Exercise")}
        />
        <CoinsButton
          coinAmount={(pointsInfo != null) ? pointsInfo.coins : 0}
          logo={require("../assets/images/coin.png")}
          style={Buttons.coinsButton}
          onPress={() => props.navigation.navigate("Exercise")}
        />
      </View>
      <WellnessBar wellnessPoints={(pointsInfo != null) ? pointsInfo.wellness_points : 0}/>
      <DansWords danMessage={"Woof! Welcome to Handsome Habits!"}/>
      <EmotionVisualizer/>
      <View style={styles.habitButtonContainer}>
        <HabitButton
          logo={require("../assets/images/eating_icon.png")}
          style={Buttons.habitButton}
          onPress={() => props.navigation.navigate("Exercise")}
        />
        <HabitButton
          logo={require("../assets/images/exercising_icon.png")}
          style={Buttons.habitButton}
          onPress={() => props.navigation.navigate("Exercise")}
        />
        <HabitButton
          logo={require("../assets/images/sleeping_icon.png")}
          style={Buttons.habitButton}
          onPress={() => props.navigation.navigate("Exercise")}
        />
        <HabitButton
          logo={require("../assets/images/studying_icon.png")}
          style={Buttons.habitButton}
          onPress={() => props.navigation.navigate("Exercise")}
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
