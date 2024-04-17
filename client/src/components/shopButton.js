import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Typography } from "../styles";

const ShopButton = (props) => {
  return (
    <View style={styles.container} testID={"shop-button"}>
      <TouchableOpacity onPress={props.onPress} style={[props.style, {opacity: props.opacity}]} testID={props.testID}>
        <Text style={[Typography.shop, styles.buttonText]}> {props.asset} </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

ShopButton.propTypes = {
  style: PropTypes.any,
  onPress: PropTypes.any,
  asset: PropTypes.string,
  opacity: PropTypes.string,
  testID: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonText: {
    bottom: 3,
  },
});

export default ShopButton;
