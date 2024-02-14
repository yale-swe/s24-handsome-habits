import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity,  Image } from "react-native";
import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import Authentication from "./src/services/authentication";

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    const user = Authentication(response);
    if (user) console.log(user);
  }, [response]);
  
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
    margin: 3,
  },
  buttonText : {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingEnd: 10,

  }
});