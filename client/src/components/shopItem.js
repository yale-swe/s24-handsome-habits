import React from "react";
import { StyleSheet, Image, View } from "react-native";
import PropTypes from "prop-types";
import AssetButton from "./assetButton";
import { tops, bottoms, accessories } from "../constants/resources";

const ShopItem = (props) => {
  const assetImage = props.category == "tops" ? tops[props.assetImage] : props.category == "bottoms" ? bottoms[props.assetImage] : accessories[props.assetImage];

  const assetStyling = props.category == "tops" ? styles.topImage : props.category == "pants" ? styles.bottomImage : styles.accessoryImage;

  const [buttonState, setButtonState] = React.useState("purchase");
  function switchButton() {
    const newButtonState = buttonState == "purchase" ? "equip" : buttonState == "equip" ? "wearing" : "purchase";
    setButtonState(newButtonState);
  }

  return (
    <View style={styles.assetContainer} testID={"shop-item-testing"}>
      <Image
        source={assetImage}
        style={assetStyling}
        resizeMode="cover"
        testID={"shop-item-container"}></Image>
      <AssetButton
        coinAmount={props.coinAmount}
        state={buttonState}
        onPress={() => switchButton()}
        testID={"asset-button"}/>
    </View>
  );
};

ShopItem.propTypes = {
  assetImage: PropTypes.string,
  coinAmount: PropTypes.any,
  category: PropTypes.string,
};

const styles = StyleSheet.create({
  assetContainer: {
    width: 87,
    height: 104,
    backgroundColor: "#CBE7F3",
    borderRadius: 5,
    alignContent: "center",
    marginVertical: 3,
    zIndex: 0,
  },
  topImage: {
    position: "absolute",
    height: "150%",
    width: "150%",
    bottom: "-5%",
    left: "-25%",
    zIndex: 1,
  },
  bottomImage: {
    position: "absolute",
    height: "150%",
    width: "150%",
    bottom: "13%",
    left: "-25%",
    zIndex: 1,

  },
  accessoryImage: {
    position: "absolute",
    height: "150%",
    width: "150%",
    bottom: "-45%",
    left: "-25%",
    zIndex: 1,

  },
});

export default ShopItem;
