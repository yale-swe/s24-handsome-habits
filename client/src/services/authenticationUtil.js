import { AuthApi } from "./apiUtil";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusCodes } from "http-status-codes";

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
    const user = await AuthApi.post("/google/login", { token: token });
    await AsyncStorage.setItem("user", JSON.stringify(user.data));
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
  console.log("Logging out and deleting user cookies");
}

export async function CASLogout() {
  logout();
  await AuthApi.get("/cas/logout");
}

/**
 * @returns {} - The user data if found; otherwise, null.
 */
export async function LoginWithActiveSession() {
  let response = null;
  await AsyncStorage.removeItem("cookies");


  try {
    response = await AuthApi.get("/login", { withCredentials: true });
  } catch (err) {
    // Clear session if session is invalid / unauthorized user
    console.error(
      "Error logging in with stored cookies. Logging out",
      err.response.status
    );
    if (err.response.status == StatusCodes.UNAUTHORIZED) {
      logout();
    }
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return response?.status === 200 ? response : null;
  }
}


