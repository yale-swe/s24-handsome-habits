import Api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function Authentication(response) {
  const user = await AsyncStorage.getItem("@user");
  console.log("WHATTTT");
  if (user) {
    console.log("aaaaa");
    return JSON.parse(user);
  } else if (response?.type === "success") {
    console.log("bbbbb");
    return await getUserInfo(response.authentication.accessToken);
  } else {
    console.log("cccc");
    console.log("Failed to retrieve user info");
    return null;
  }

  async function getUserInfo(token) {
    console.log("dddd");

    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      console.log("user", user);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      return user;
    } catch (e) {
      console.error(e);
    }
  }
}
