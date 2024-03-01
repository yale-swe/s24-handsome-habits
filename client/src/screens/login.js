import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useEffect, useState } from "react";
import { Typography } from "../styles";
import { WebView } from "react-native-webview";
import { findUser } from "../services/userService";
import Authentication, { CASLogout } from "../services/authenticationUtil";
import * as Google from "expo-auth-session/providers/google";
import LoginButton from "../components/loginButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buttons, Colors } from "../styles";

const Login = ({ navigation }) => {
  const serverURL = process.env.EXPO_PUBLIC_SERVER_URL;
  const [, setLoading] = useState(true);
  const [showWebView, setShowWebView] = useState(false);
  const [, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  function handleLoginWithCAS() {
    // Display the WebView for CAS login
    setShowWebView(true);
  }


  // For handling response from Google Auth
  useEffect(() => {
    if (response?.type === "success") {
      Authentication(response).then(() => {
        navigation.navigation.navigate("Home");
      });
    }
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
          console.log("Navigating to Home");
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
      // todo: Do better checks here to confirm the user information if cookies are used
      // const encodedUserData = url.split("data=")[1];
      // const userData = JSON.parse(decodeURIComponent(encodedUserData));
      setShowWebView(false); // Hide the WebView
      navigation.navigate("Home");
    }
  };


  const loginScreen = () => (
    <View style={styles.container}>
  
      <Image
        source={require("../assets/images/bulldog.png")}
        style={styles.bulldog}
      />
      <View style={ styles.lowerContainer }>
        <Text style={Typography.header4}> Welcome to </Text>
        <Text style={Typography.header3}> Handsome Habits </Text>
        <View style={styles.buttonContainer}>

          <LoginButton
            title="Sign in with Yale CAS"
            logo={require("../assets/images/ylogo.png")}
            style={Buttons.YloginButton}
            onPress={handleLoginWithCAS}
          />
          <LoginButton
            title="Sign in with Google"
            logo={require("../assets/images/googlelogo.png")}
            style={Buttons.GloginButton}
            onPress={() => promptAsync()}
          />
        </View>
      </View>
    </View>
  );

  const renderWebView = () => {
    return (
      <WebView
        source={{ uri: `${serverURL}/auth/cas/login` }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        style={styles.webView}
      />
    );
  };

  return showWebView ? renderWebView() : loginScreen();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    ...Typography.mainFont,
  },
  lowerContainer: {
    paddingTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 100,
    backgroundColor: "white",
    width: "100%",
  },
  buttonContainer: {
    marginTop: 30,
  },
  bulldog: {
    margin: 30,
    width: 200,
    height: 300,
  },
});

export default Login;
