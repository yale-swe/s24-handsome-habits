import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { Typography } from "../styles";

const CoinsButton = (props) => {
  return (
    <View style={styles.container} testID={"coins-button-container"}>
      <TouchableOpacity onPress={props.onPress} style={props.style} testID={props.testID}>
        <View style={styles.coinButtonContainer} testID={"coins-info-container"}>
          <Text style={Typography.coins}> {props.coinAmount} </Text>
        </View>
        <Image
          source={props.logo}
          style={styles.coinsButtonImage}
          resizeMode="contain"
          testID={"coins-button-image"}
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

CoinsButton.propTypes = {
  coinAmount: PropTypes.any,
  logo: PropTypes.any,
  style: PropTypes.any,
  onPress: PropTypes.any,
  testID: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  coinsButtonImage: {
    flex: 1,
    width: 27,
    height: 27,
  },
  coinButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CoinsButton;
