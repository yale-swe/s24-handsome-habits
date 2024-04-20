import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { Buttons } from "../styles";
import HabitButton from "../components/habitButton";
import SettingsButton from "../components/settingsButton";
import CoinsButton from "../components/coinsButton";
import WellnessBar from "../components/wellnessBar";
import DansWords from "../components/dansWords";
import HandsomeDan from "../components/HandsomeDan";
import { getPointInfo } from "../services/PointsService";
import { useFocusEffect } from "@react-navigation/native";
import { getExpression } from "../services/DansWordsService";
import { setActiveAssets } from "../services/AssetsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getButtonToDisplay,
  updateshopButtonCount,
} from "../services/shopButtonService";

const Home = (props) => {
  // set up the navigation for the home page
  Home.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  // shop button logic for metrics
  const [shopButton, setShopButton] = React.useState("shop");

  const updateShopButton = async () => {
    const buttonState = await getButtonToDisplay();
    setShopButton(buttonState["type"]);
  };

  useEffect(
    // Fetch user's points and coins when the component mounts after a navigation action
    React.useCallback(() => {
      updateShopButton();
    }, []),
  );

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
    }, []),
  );

  const setNewAssets = async () => {
    // get the locally-stored assets and store them in the db
    // done in the home component to avoid spamming the database by quickly switching assets in the shop
    try {
      let assets = await AsyncStorage.getItem("assets");
      if(assets) {
        assets = JSON.parse(assets);
        setActiveAssets(assets);
      }
    } catch (err) {
      console.log("Error setting new user wearing-assets.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setNewAssets();
    }, []),
  );

  const [message, setMessage] = React.useState("");

  useEffect(() => {
    const fetchExpression = async () => {
      // fetches the message based on points
      const expression = await getExpression(); // on mount, get the message
      setMessage(expression);
    };
    fetchExpression();
  }, []);

  useFocusEffect(
    // fetches the message based on points
    React.useCallback(() => {
      const updateExpression = async () => {
        const expression = await getExpression(); // on navigation, get the message
        setMessage(expression);
      };
      updateExpression();
    }, []),
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
          state={shopButton.type}
          onPress={() => {
            updateshopButtonCount();
            props.navigation.navigate("Shop");
          }}
          testID={"coins-button"}
        />
      </View>
      <WellnessBar
        wellnessPoints={pointsInfo != null ? pointsInfo.wellness_points : 0}
      />
      {/* container for the message displayed above bulldog's head */}
      <DansWords danMessage={message} />
      {/* container for bulldog image and clothes, reactive emotions */}
      <HandsomeDan />
      <View style={styles.habitButtonContainer} testID={"habit-buttons"}>
        <HabitButton
          logo={require("../assets/images/eating_icon.png")}
          style={Buttons.habitButton}
          onPress={() => props.navigation.navigate("Eat")}
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
          testID={"sleeping-button"}
          onPress={() => props.navigation.navigate("Sleep")}
        />
        <HabitButton
          logo={require("../assets/images/studying_icon.png")}
          style={Buttons.habitButton}
          testID={"studying-button"}
          onPress={() => props.navigation.navigate("Study")}
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
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: "20%",
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
