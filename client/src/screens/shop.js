import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import BackButton from "../components/backButton";
import { Buttons, Typography } from "../styles";
import { getPointInfo } from "../services/PointsService";
import { getAssets } from "../services/AssetsService";
import { useFocusEffect } from "@react-navigation/native";
import ShopButton from "../components/shopButton";
import ShopItemList from "../components/shopItemList"

const Shop = (props) => {
  // set up the navigation for the Shop page
  Shop.propTypes = {
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
      console.log("Failed to retrieve user points to shop.");
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

  // variable and function for getting/setter user points
  const [assetInfo, setAssetInfo] = React.useState(null);

  // fetches user points from the database
  const fetchAssets = async () => {
    try {
      const rawAssets = await getAssets();
      setAssetInfo(rawAssets);
    } catch (error) {
      console.log("Failed to retrieve user assets to shop.");
    }
  };

  React.useEffect(() => {
    // Fetch user's points and coins when the component mounts
    fetchAssets();
  }, []); // The empty array ensures this effect runs only once when the component mounts

  useFocusEffect(
    // Fetch user's points and coins when the component mounts after a navigation action
    React.useCallback(() => {
      fetchAssets();
    }, [])
  );

  const [buttonOpacities, setButtonOpacities] = React.useState([1.0, 0.75, 0.75]);

  const [activeStorePage, setActiveStorePage] = React.useState("tops");

  const handleShopButtonPress = (index) => {
    const newOpacities = buttonOpacities.map((opacity, i) => (i === index ? 1.0 : 0.75));
    setButtonOpacities(newOpacities);
    const active_page = index == 0 ? "tops" : index == 1 ? "bottoms" : "accessories";
    setActiveStorePage(active_page);
  };

  return (
    <View style={styles.container} testID={"shop-page"}>
      <View style={styles.topButtonsContainer}>
        <View style={styles.backButtonContainer}>
          <BackButton onPress={() => props.navigation.navigate("Home")} testID="BackButton"/>
        </View>
        <View style={Buttons.coinsButton}>
          <View style={styles.coinsContainer} testID={"coins-info-container"}>
            <Text style={Typography.coins}> {pointsInfo != null ? pointsInfo.coins : 0} </Text>
          </View>
          <Image
            source={require("../assets/images/coin.png")}
            style={styles.coinsImage}
            resizeMode="contain"
            testID={"coins-button-image"}
          />
        </View>
      </View>
      <View style={styles.shopButtonsContainer} testID={"shop-buttons"}>
        <ShopButton style={Buttons.shopButton}
                    onPress={() => handleShopButtonPress(0)}
                    asset={"tops"}
                    testID={"tops-button"}
                    opacity={buttonOpacities[0]}>
        </ShopButton>
        <ShopButton style={Buttons.shopButton}
                    onPress={() => handleShopButtonPress(1)}
                    asset={"bottoms"}
                    testID={"bottoms-button"}
                    opacity={buttonOpacities[1]}>
        </ShopButton>
        <ShopButton style={Buttons.shopButton}
                    onPress={() => handleShopButtonPress(2)}
                    asset={"extras"}
                    testID={"accessories-button"}
                    opacity={buttonOpacities[2]}>
        </ShopButton>
      </View>
      <View style={styles.shopUIcontainer} testID={"shop-view"}>
        {activeStorePage == "tops" ? <ShopItemList category={activeStorePage} assetUpdater={() => fetchAssets()} assetInfo={assetInfo} coinUpdater={() => fetchPoints()} testID={"tops-list"}></ShopItemList> :
         activeStorePage == "bottoms" ? <ShopItemList category={activeStorePage} assetUpdater={() => fetchAssets()} assetInfo={assetInfo} coinUpdater={() => fetchPoints()} testID={"bottoms-list"}></ShopItemList> :
         <ShopItemList category={activeStorePage} assetUpdater={() => fetchAssets()} assetInfo={assetInfo} coinUpdater={() => fetchPoints()} testID={"accessories-list"}></ShopItemList>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBCD5A",
  },
  backButtonContainer: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 45,
    alignItems: "center",
    width: "95%",
  },
  coinsImage: {
    flex: 1,
    width: 27,
    height: 27,
  },
  coinsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  shopButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 140,
    width: "78%",
  },
  shopUIcontainer: {
    width: 349,
    height: 625,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    position: "absolute",
    bottom: 40,
  },
});

export default Shop;
