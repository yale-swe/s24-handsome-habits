import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import Authentication, { CASLogout } from "../services/authenticationUtil";
import { WebView } from "react-native-webview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { findUser } from "../services/userService";

const Login = (navigation) => {
  const serverURL = process.env.EXPO_PUBLIC_SERVER_URL;
  const [, setLoading] = useState(true);
  const [, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  const [showWebView, setShowWebView] = useState(false);

  function handleLoginWithCAS() {
    // Display the WebView for CAS login
    setShowWebView(true);
  }

  useEffect(() => {
    (async () => {
      if (response?.type === "success") {
        try {
          if (await Authentication(response)) {
            navigation.navigation.navigate("Home");
          }
        } catch (error) {
          console.error("Error logging in with Google:", error);
        }
      }
    })();
  }, [response]);

  /**
   * On component mount, check if the user is already authenticated by looking for cookies.
   * If authenticated, navigate to the main screen; otherwise, display the login option.
   * This useEffect hook will run only once after the initial render, not on subsequent re-renders.
   */
  useEffect(() => {
    const actions = async () => {
      const cookies = await AsyncStorage.getItem("cookies");
      if (cookies) {
        axios.defaults.headers.Cookie = cookies;
      }

      try {
        if (await findUser()) {
          navigation.navigation.navigate("Home");
        } else {
          console.log("User not authenticated");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    actions();
  }, []);

  /**
   * Handle navigation state changes in the WebView.
   * Used to detect successful login and to extract user data from the URL.
   */
  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (url.includes(`${serverURL}/userdata?data=`)) {
      // Do better checks here to confirm the user information if cookies are used
      // const encodedUserData = url.split("data=")[1];
      // const userData = JSON.parse(decodeURIComponent(encodedUserData));

      setShowWebView(false); // Hide the WebView
      navigation.navigation.navigate("Home");
    }
  };

  const loginScreen = () => (
    <View style={styles.container}>
      <Text style={styles.header2}> Welcome to </Text>
      <Text style={styles.header1}> Handsome Habits </Text>
      <Image
        source={require("../assets/images/bulldog.png")}
        style={styles.bulldog}
      />
      <TouchableOpacity
        onPress={() => handleLoginWithCAS()}
        style={styles.loginButton}
      >
        <View style={styles.buttonContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/googlelogo.png")}
              style={styles.googleLogo}
            />
          </View>
          <Text style={styles.buttonText}> Sign in with Yale CAS </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.space} />
      <TouchableOpacity
        onPress={() => promptAsync()}
        style={styles.GloginButton}
      >
        <View style={styles.buttonContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/googlelogo.png")}
              style={styles.googleLogo}
            />
          </View>
          <Text style={styles.buttonText}> Sign in with Google </Text>
        </View>
      </TouchableOpacity>
      <Button title="Delete Saved Users" onPress={() => CASLogout()} />
      <StatusBar style="auto" />
    </View>
  );

  const renderWebView = () => (
    <WebView
      source={{ uri: `${serverURL}/auth/cas/login` }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
      style={{ flex: 1 }}
    />
  );

  return showWebView ? renderWebView() : loginScreen();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto",
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
    backgroundColor: "#294078",
    color: "white",
    fontSize: 20,
    borderRadius: 10,
    padding: 0,
  },
  GloginButton: {
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
  googleLogo: {
    width: 30,
    height: 30,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingEnd: 10,
  },
  space: {
    height: 20,
  },
});

export default Login;
