import Api from "./apiUtil";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function Authentication(response) {
  var user_data = null;
  const user = await AsyncStorage.getItem("@user");
  if (user) {
    logout();
    user_data = JSON.parse(user);
  }
  if (response?.type === "success") {
    user_data = await getUserInfoWithGoogle(
      response.authentication.accessToken
    );

    console.log("User signed in:", user_data);
    return user_data ? user_data : null;
  }
  console.log("User login in failed");
  return null;
}

async function getUserInfoWithGoogle(token) {
  try {
    const user = await Api.post("/auth/google/login", { token: token });
    await AsyncStorage.setItem("@user", JSON.stringify(user.data));
    return JSON.stringify(user.data);
  } catch (e) {
    console.error("Error getting user info with Google", e);
  }
}

export async function logout() {
  await AsyncStorage.removeItem("cookies");
  await AsyncStorage.removeItem("user");
  // remove the cookie header from axios
  axios.defaults.headers.Cookie = "";
}

export async function CASLogout() {
  logout();
  await Api.get("/auth/cas/logout");
}

/**
 * @returns {} - The user data if found; otherwise, null.
 */
export async function LoginWithActiveSession() {
  const response = await Api.get("/auth/login", { withCredentials: true });
  return response.status === 200 ? response : null;
}
