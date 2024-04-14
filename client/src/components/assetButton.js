import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { Buttons, Typography } from "../styles";

const AssetButton = (props) => {
  return (
    props.state == "purchase" ? (
    <View style={styles.container} testID={"purchase-button-container"}>
      <TouchableOpacity onPress={props.onPress} style={Buttons.purchaseButton} testID={"purchase"}>
        <View style={styles.assetButtonContainer}>
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
    ) : props.state == "equip" ? (
      <View style={styles.container} testID={"equip-button-container"}>
        <TouchableOpacity onPress={props.onPress} style={Buttons.ownedButton} testID={"equip"}>
          <Text style={Typography.asset}> Put On </Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    ) : (
      <View style={styles.container} testID={"wearing-button-container"}>
        <TouchableOpacity onPress={props.onPress} style={[Buttons.ownedButton, {opacity: 0.6}]} testID={"wearing"}>
          <Text style={Typography.asset}> Wearing! </Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    )
  );
};

AssetButton.propTypes = {
  coinAmount: PropTypes.any,
  state: PropTypes.string, // either purchase, equip, or wearing
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
