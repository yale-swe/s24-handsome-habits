import LoginButton from "../components/loginButton";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { Typography, Colors, Spacing, Buttons } from '../styles';
import { StatusBar } from "expo-status-bar";
import * as Google from "expo-auth-session/providers/google";
import Authentication, { CASLogout } from "../services/authenticationUtil";
import { WebView } from "react-native-webview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { findUser } from "../services/userService";
import { useNavigation } from '@react-navigation/native';

const Login = ({navigation}) => {

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
          console.log("Navigating to Home")
          navigation.navigate("Home");
        } else {
          console.log(resp)
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

  const renderWebView = () => {

    return (
      <WebView
          source={{ uri: `${serverURL}/auth/cas/login` }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          style={ styles.webView}
        />

    );
  };


  return (
    <View style={styles.container}>
        <Text style={Typography.header4}> Welcome to </Text>
        <Text style={Typography.header3}> Handsome Habits </Text>
        <Image
          source={require("../assets/images/bulldog.png")}
          style={styles.bulldog}
        />
        <LoginButton 
          title="Sign in with Google" 
          logo={require("../assets/images/googlelogo.png")} 
          onPress=""
        />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    ...Typography.mainFont,
  },
  bulldog: {
    margin: 30,
    width: 150,
    height: 250,
  },

});


export default Login;