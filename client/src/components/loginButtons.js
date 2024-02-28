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
import { useNavigation } from '@react-navigation/native';

import { Typography, Colors, Spacing, Buttons } from '../styles';

// import LoginButton from "./screens/login";

const LoginButtons = () => {
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

// const navigation = useNavigation();
  

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
        var resp = null;
        resp = await findUser();
        if (resp) {
          navigation.navigate("Home");
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
      navigation.navigate("Home");
    }
  };

  const loginScreen = () => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleLoginWithCAS()}
        style={Buttons.YloginButton}
      >
        <View style={Buttons.buttonContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/googlelogo.png")}
              style={styles.googleLogo}
            />
          </View>
          <Text style={Buttons.buttonText}> Sign in with Yale CAS </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.space} />
      <TouchableOpacity
        onPress={() => promptAsync()}
        style={Buttons.GloginButton}
      >
        <View style={Buttons.buttonContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/googlelogo.png")}
              style={styles.googleLogo}
            />
          </View>
          <Text style={Buttons.buttonText}> Sign in with Google </Text>
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
    alignItems: "center",
    // justifyContent: "center",

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

export default LoginButtons;
