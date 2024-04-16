import Api from "./apiUtil";
import { logout } from "./authenticationUtil";
import { StatusCodes } from "http-status-codes";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @returns the user's assets JSON if found
 */
export async function getAssets() {
  try {
    const response = await Api.get("/assets");
    let assets = response.data.assets;

    // return retrieved assets and save them in AsyncStorage if they exist
    // otherwise assets stored in local storage
    if (assets) {
      AsyncStorage.setItem("assets", JSON.stringify(assets));
    } else {
      console.log(
        "No assets found: Trying to use locally saved assets in Asyc Storage",
      );
      assets = await JSON.parse(AsyncStorage.getItem("assets"));
    }

    return assets;
  } catch (err) {
    if (err.response?.status == StatusCodes.UNAUTHORIZED) {
      console.log("Error: Session is expired/invalid, so logout");
      logout();
      return null;
    } else {
      console.log(
        "Error finding assets. Returning locally saved assets in AsyncStorage",
      );
      return await JSON.parse(await AsyncStorage.getItem("assets"));
    }
  }
}

/**
 * Adds an asset to the user's assets
 * Function DOES NOT check whether the user owns the item
 * @param {String} assetType - One of [tops, bottoms, accessories] - Yes, plural, not singular
 * @param {String} assetName - the name of the asset
 * @returns the updated assets JSON if successful, null otherwise
 */
export async function addAsset(assetType, assetName) {
  try {
    const response = await Api.post("/assets/add", {
      assets: {
        type: assetType,
        name: assetName,
      },
    });

    const updatedAssets = response.data.assets;
    AsyncStorage.setItem("assets", JSON.stringify(updatedAssets));
    return updatedAssets;
  } catch (err) {
    if (err.response?.status == StatusCodes.UNAUTHORIZED) {
      logout();
    } else if (err.response?.status == StatusCodes.INTERNAL_SERVER_ERROR) {
      console.log(
        "Error adding asset; Returning locally saved assets in AsyncStorage",
      );
      return JSON.parse(await AsyncStorage.getItem("assets"));
    }
    return null;
  }
}

/**
 * Sets the active assets for the user
 * @param {JSON} newActiveAssets - Eg. {tops: "yale_shirt", bottoms: "yale_pants", accessories: "yale_hat"} - Yes, plural, not singular
 * @returns the updated assets JSON if successful, null otherwise
 */
export async function setActiveAssets(newActiveAssets) {
  try {
    const response = await Api.post("/assets/setActive", {
      assets: newActiveAssets,
    });

    const updatedAssets = response.data.assets; // entire assets object
    AsyncStorage.setItem("assets", JSON.stringify(updatedAssets));
    return updatedAssets;
  } catch (err) {
    // return previous assets in locally saved assets in AsyncStorage if unable to set new active assets
    if (err.response.status == StatusCodes.INTERNAL_SERVER_ERROR) {
      console.log("Error setting active asset.");
      console.log(
        "Assets not updated, so returning locally saved assets in AsyncStorage",
      );
      return JSON.parse(AsyncStorage.getItem("assets"));
    }

    if (err.response.status == StatusCodes.UNAUTHORIZED) {
      logout();
    } // logout if session is invalid

    return null;
  }
}
