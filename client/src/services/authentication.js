import Api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function Authentication(response) {
  var user_data = null;
  const user = await AsyncStorage.getItem("@user");
  if (user) {
    console.log("Retrieved user from AsyncStorage");
    user_data = JSON.parse(user);
  } else if (response?.type === "success") {
    console;
    user_data = await getUserInfoWithGoogle(
      response.authentication.accessToken
    );
  }
  console.log("Info of signed in user:", user_data);
  return user_data;

  async function getUserInfoWithGoogle(token) {
    try {
      const user = await Api.post("/auth/login", { token: token });
      await AsyncStorage.setItem("@user", JSON.stringify(user.data));
      return JSON.stringify(user.data);
    } catch (e) {
      console.error("Error getting user info with Google", e);
    }
  }
}

export async function logout() {
  await AsyncStorage.removeItem("@user");
}
