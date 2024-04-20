import Api from "./apiUtil";
import { logout } from "./authenticationUtil";
import { StatusCodes } from "http-status-codes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getButtonToDisplay() {
  try {
    const response = await Api.get("/shopButton");
    const buttonType = response.data.type;
    AsyncStorage.setItem("shopButton", buttonType);
    return response.data;
  } catch (err) {
    if (err.response.status == StatusCodes.UNAUTHORIZED) {
      logout();
    }
    return "shop";
  }
}

export async function updateshopButtonCount() {
  try {
    const buttonType = await AsyncStorage.getItem("shopButton");
    await Api.post("/shopButton/update", {
      type: buttonType,
    });
  } catch (err) {
    if (err.response.status == StatusCodes.UNAUTHORIZED) {
      logout();
    }
  }
}
