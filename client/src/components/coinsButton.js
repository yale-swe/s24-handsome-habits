import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { Typography } from "../styles";

const CoinsButton = (props) => {
  const coinImage = require("../assets/images/coin.png");
  const cartImage = require("../assets/images/cart.png");

  return (
    <View style={styles.container} testID={"coins-button-container"}>
      <TouchableOpacity onPress={props.onPress} style={props.style} testID={props.testID}>
        <View style={styles.coinButtonContainer} testID={"coins-info-container"}>
          {/* if it's coin or shopCoin, use the coint count, else if it's shop just show "Shop" */}
          <Text style={props.state == "coin" || props.state == "shopCoin" ? Typography.coins : Typography.cart}> {props.state == "coin" || props.state == "shopCoin" ? props.coinAmount : "Shop"} </Text>
        </View>
        {/* if it's shop or shopCoin, use cart image, else if it's coin use coin image */}
        <Image
          source={props.state == "shop" || props.state == "shopCoin" ? cartImage : coinImage}
          style={props.state == "shop" || props.state == "shopCoin" ? styles.cartButtonImage : styles.coinsButtonImage}
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
  cartButtonImage: {
    flex: 1,
    width: 22,
    height: 22,
  },
  coinButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CoinsButton;
