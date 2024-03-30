import CookieManager from "@react-native-cookies/cookies";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function saveLoginCookies(url) {
    console.log("The url is: ", url);
    const cookies = await CookieManager.get(url, true);
    console.log("The cookies are: ", cookies);
    AsyncStorage.setItem("cookies", JSON.stringify(cookies));
    axios.defaults.headers.Cookie = cookies["connect.sid"];
}