import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Authentication from "./src/services/authentication";

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  // async function promptAsync() {
  //   return Authentication();
  // }
  console.log("client Id", process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    Authentication(response);
  }, [response]);

  // async function googleSignin() {
  //   const user = await AsyncStorage.getItem("@user");
  //   if (user) {
  //     setUserInfo(JSON.parse(user));
  //   } else {
  //     if (response?.type === "success") {
  //       await getUserInfo(response.authentication.accessToken);
  //     }
  //   }
  // }

  // // make na api call to server to get user info
  // async function getUserInfo(token) {
  //   if (!token) return;

  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     const user = await response.json();
  //     await AsyncStorage.setItem("@user", JSON.stringify(user));
  //     setUserInfo(user);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  return (
    <View style={styles.container}>
      <Text> This is yims.Welcome.Beware. </Text>
      <Text> Yims is a dangerous place. </Text>
      {/* <Image
                    source={require("./src/images/aminata.png")}
                    style={{ width: 300, height: 400 }}
                  /> */}
      {/* <Text> {JSON.stringify(userInfo, null, 2)} </Text>{" "} */}
      {/* {console.log("userInfo", userInfo)}{" "} */}
      <Button title="Sign in with google" onPress={() => promptAsync()} />
      <Button title="Deleted saved users" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    alignItems: "center",
    justifyContent: "center",
  },
});
