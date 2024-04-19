import React from "react";
import { StyleSheet, Image, View } from "react-native";
import PropTypes from "prop-types";
import AssetButton from "./assetButton";
import { tops, bottoms, accessories } from "../constants/resources";
import { updatePoints, updatePointswithChange } from "../services/PointsService";
import { addAsset, setActiveAssets } from "../services/AssetsService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShopItem = (props) => {
  const assetImage = props.category == "tops" ? tops[props.name] : props.category == "bottoms" ? bottoms[props.name] : accessories[props.name];

  const assetStyling = props.category == "tops" ? styles.topImage : props.category == "bottoms" ? styles.bottomImage : styles.accessoryImage;

  const state = (props.assetInfo != null && props.assetInfo.active && props.assetInfo.owned[props.category] && props.assetInfo.owned[props.category].includes(props.name)) ? (props.assetInfo.active[props.category] == props.name) ? "wearing" : "owned" : "unowned";

  // onPress for the "Purchase" button, allowing users to buy assets
  const handle_purchase = async () => {
    const coins = null;
    let newPoints = null;
    try {
      let currentPoints = await AsyncStorage.getItem("points");
      // if user has as many coins as the asset costs (or more),
      // decrement their coins by the cost, give them the asset, and change asset button state
      currentPoints = JSON.parse(currentPoints);
      if (currentPoints.coins >= props.coinAmount) {
        currentPoints.coins -= props.coinAmount;
        newPoints = await updatePoints(currentPoints);
        await addAsset(props.category, props.name);
        await props.coinUpdater();
        await props.assetUpdater();
      }
      else {
        console.log("Not enough coins for purchase!");
      }
    } catch(err) {
      console.log("error purchasing asset");
      // if we succeeded in fetching coins and in decrementing them, need to give the user back their coins
      if (coins && newPoints) {
        updatePointswithChange("coins", props.coinAmount);
      }
    }
  }

  // onPress for the "Put On" button, allowing a user to switch their currently-wearing asset
  const handle_put_on = async () => {
    try {
      props.assetInfo.active[props.category] = props.name;
      await setActiveAssets(props.assetInfo.active);
      // AsyncStorage.setItem("assets", JSON.stringify(currentClothes));
      await props.assetUpdater();
    } catch(err) {
      console.log("error updating user's currently-worn assets");
    }
  }

  // focus effect for if the user changes what they're wearing to change other button from wearing to put on

  return (
    <View style={styles.assetContainer} testID={"shop-item-testing"}>
      <Image
        source={assetImage}
        style={assetStyling}
        resizeMode="cover"
        testID={"shop-item-container"}></Image>
      <AssetButton
        coinAmount={props.coinAmount}
        state={state}
        onPress={state == "unowned" ? () => handle_purchase() : () => handle_put_on()}
        testID={"asset-button"}/>
    </View>
  );
};

ShopItem.propTypes = {
  name: PropTypes.string,
  coinAmount: PropTypes.any,
  category: PropTypes.string,
  coinUpdater: PropTypes.any,
  assetInfo: PropTypes.any,
  assetUpdater: PropTypes.any,
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
    height: "130%",
    width: "130%",
    bottom: "11%",
    left: "-15%",
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
