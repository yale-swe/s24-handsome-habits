import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { Buttons, Typography } from "../styles";

const AssetButton = (props) => {
  return (
    props.state == "unowned" ? (
    <View style={styles.container} testID={"purchase-button-container"}>
      <TouchableOpacity onPress={props.onPress} style={Buttons.purchaseButton} testID={props.testID}>
        <View style={styles.assetButtonContainer} testID={"purchase"}>
          <Text style={Typography.asset}> {props.coinAmount} </Text>
        </View>
        <Image
          source={require("../assets/images/coin.png")}
          style={styles.assetButtonImage}
          resizeMode="contain"
          testID={"coins-button-image"}
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    ) : props.state == "owned" ? (
      <View style={styles.container} testID={"put-on-button-container"}>
        <TouchableOpacity onPress={props.onPress} style={Buttons.ownedButton} testID={props.testID}>
          <Text style={Typography.asset} testID={"put-on"}> Put On </Text>
          {/* update the user's active assets
              update the button state
              how to make sure other button updates? */}
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    ) : (
      <View style={styles.container} testID={props.testID}>
        <View style={[Buttons.ownedButton, {opacity: 0.6}]} testID={"wearing-container"}>
          <Text style={Typography.asset} testID={"wearing"}> Wearing! </Text>
          {/* make this not a touchable opacity tbh */}
        </View>
      <StatusBar style="auto" />
    </View>
    )
  );
};

AssetButton.propTypes = {
  coinAmount: PropTypes.any,
  state: PropTypes.string, // either unowned, owned, or wearing
  onPress: PropTypes.any,
  testID: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: "10%",
    left: "-4%",
    zIndex: 2,
  },
  assetButtonImage: {
    flex: 1,
    width: 16,
    height: 16,
  },
  assetButtonContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 5,
    left: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D3A4F",
  },
});

export default AssetButton;
