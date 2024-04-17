import { FlatList, View, StyleSheet } from "react-native";
import { Colors } from "../styles";
import PropTypes from "prop-types";
import tops from "../assets/cosmetics/tops.json"
import bottoms from "../assets/cosmetics/bottoms.json"
import accessories from "../assets/cosmetics/accessories.json"
import ShopItem from "./shopItem";

const ShopItemList = ( props ) => {

  const displayed_asset = props.category == "tops" ? tops : props.category == "bottoms" ? bottoms : accessories;

  return (
    <View style={styles.shopListContainer} testID={props.testID}>
      <FlatList
        data={displayed_asset}
        renderItem={({item}) =>
          <View style={{padding: 12}}>
            <ShopItem name={item.name}
                      coinAmount={item.price}
                      category={props.category}
                      coinUpdater={props.coinUpdater}
                      assetInfo={props.assetInfo}
                      assetUpdater={props.assetUpdater}>
            </ShopItem>
          </View>
        }
        numColumns={3}
        style={{zIndex: 0}}
        alignItems={"center"}>
      </FlatList>
    </View>
  );
};

ShopItemList.propTypes = {
    category: PropTypes.string,
    testID: PropTypes.string,
    coinUpdater: PropTypes.any,
    assetInfo: PropTypes.any,
    assetUpdater: PropTypes.any,
  };

const styles = StyleSheet.create({
  shopListContainer: {
    width: 349,
    height: 600,
    borderRadius: 15,
    top: 8,
    position: "absolute",
    justifyContent: "center",
    zIndex: 0,
  },
  empty_container: {
    height: 90,
    width: 330,
    backgroundColor: Colors.Colors.lightBeige,
    borderRadius: 10,
    padding: 23,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 1,
  },
})
export default ShopItemList;
