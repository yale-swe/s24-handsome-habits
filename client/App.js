import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity,  Image } from "react-native";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  console.log("client Id", process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    googleSignin();
  }, [response]);

  async function googleSignin() {
    const user = await AsyncStorage.getItem("@user");
    if (user) {
      setUserInfo(JSON.parse(user));
    } else {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    }
  }

  // make na api call to server to get user info
  async function getUserInfo(token) {
    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header2}>Welcome to</Text>
      <Text style={styles.header1}>Handsome Habits</Text>
      <Image
        source={require("./src/images/bulldog.png")}
        style={styles.bulldog}
      />
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      {console.log("userInfo", userInfo)}
      <TouchableOpacity onPress={() => promptAsync()} style={styles.loginButton}>
        <View style={styles.buttonContent}>
          <View style={styles.logoContainer}>
            <Image 
              source={require("./src/images/googlelogo.png")} 
              style={styles.googleLogo}
            />
          </View>
    
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>
      {/* <Button style={styles.header1} title="Sign in with Google" onPress={() => promptAsync()} /> */}
      <Button
        title="Deleted saved users"
        onPress={() => AsyncStorage.removeItem("@user")}
      />
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
    fontFamily: "Roboto"
  },
  header2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header1: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFB706",
  },
  bulldog: {
    margin: 30,
    width: 150,
    height: 250,
  },
  loginButton: {
    backgroundColor: "#FFB706",
    color: "white",
    fontSize: 20,
    borderRadius: 10,
    padding: 0,
    // border: "3px solid black",
  },
  logoContainer: {
    backgroundColor: "white",
    padding: 5,
    marginEnd: 15,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
  },
  googleLogo:{
    width: 30,
    height: 30,

  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 20,
    margin: 3,
  },
  buttonText : {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingEnd: 10,

  }
});