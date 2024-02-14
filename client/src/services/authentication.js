import Api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function Authentication(response) {
  const [userInfo, setUserInfo] = useState(null);
  const user = await AsyncStorage.getItem("@user");
  if (user) {
    user_data = JSON.parse(user);
    setUserInfo(user_data);
    return user_data;
  } else if (response?.type === "success") {
    return await getUserInfoWithGoogle(response.authentication.accessToken);
  } else {
    return null;
  }

  async function getUserInfoWithGoogle(token) {
    try {
      const user = await Api.post("/auth/login", { token: token });
      await AsyncStorage.setItem("@user", JSON.stringify(user.data));
      return JSON.stringify(user.data);
    } catch (e) {
      console.error(e);
    }
  }
}
