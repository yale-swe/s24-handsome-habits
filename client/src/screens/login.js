import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import  {
  LoginWithActiveSession,
} from "../services/authenticationUtil";
// import { dummyLogin } from "../services/authenticationUtil";
import LoginButton from "../components/loginButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Typography, Buttons, Colors } from "../styles";
import PropTypes from "prop-types";
import CookieManager from "@react-native-cookies/cookies";
import { serverURL } from "../services/apiUtil";
import { useAuth } from "../components/authContext";

const Login = (props) => {
  Login.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  const [showWebView, setShowWebView] = useState(false);

  function handleLoginWithCAS() {
    // Display the WebView for CAS login
    setShowWebView(true);
  }

  // const byPassLogin = async() => {

  //   AsyncStorage.clear();

  //   const dummyUser = await dummyLogin(); // Get dummy user data

  //   AsyncStorage.setItem("user", dummyUser);

  //   props.navigation.navigate("Home"); // Redirect to the main screen
  // }

  /**
   * On component mount, check if the user is already authenticated by looking for cookies.
   * If authenticated, navigate to the main screen; otherwise, display the login option.
   * This useEffect hook will run only once after the initial render, not on subsequent re-renders.
   */
  useEffect(() => {
    const actions = async () => {
      const cookies = await AsyncStorage.getItem("cookies");
      console.log("Checking for cookies");
      if (cookies) {
        // Set axios header. This would be included in all API requests.
        axios.defaults.headers.Cookie = JSON.parse(cookies);
        console.log("Cookies found");
        try {
          const user = await LoginWithActiveSession();
          if (user) {
            var userData = await user.data;
            userData = decodeURIComponent(JSON.stringify(userData.user));
            console.log("User data: ", userData);

            // Save user data on client side
            AsyncStorage.setItem("user", userData);

            handleLoginSuccess();

            // Redirect to the main screen
            props.navigation.navigate("Home");
          }
        } catch (error) {
          console.error("Error checking for cookies:", error);
        }
      }
    };
    actions();
  }, []);

  const { setIsAuthenticated } = useAuth();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);  // Set authenticated to true when login is successful
  };

  /**
   * Handle navigation state changes in the WebView.
   * Used to detect successful login and to extract user data from the URL.
   */
  const handleWebViewNavigationStateChange = async (newNavState) => {
    const { url } = newNavState;
    if (url.includes(`${serverURL}/userdata?data=`)) {
      const cookies = await CookieManager.get(url, true);
      AsyncStorage.setItem("cookies", JSON.stringify(cookies));
      axios.defaults.headers.Cookie = cookies["connect.sid"];
      console.log("Async cookies: ", await AsyncStorage.getItem("cookies"));
      // todo: Do better checks here to confirm the user information if cookies are used
      // const encodedUserData = url.split("data=")[1];
      // const userData = JSON.parse(decodeURIComponent(encodedUserData));
      // console.log("User data: ", userData);
      setShowWebView(false); // Hide the WebView
      props.navigation.navigate("Home");
      handleLoginSuccess();
    }
  };

  const loginScreen = () => (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bulldog.png")}
        style={styles.bulldog}
      />
      <View style={styles.lowerContainer}>
        <Text style={Typography.header4}> Welcome to </Text>
        <Text style={Typography.header3}> Handsome Habits </Text>
        <View style={styles.buttonContainer}>
          <LoginButton
            title="Sign in with Yale CAS"
            logo={require("../assets/images/ylogo.png")}
            style={styles.YloginButton}
            onPress={handleLoginWithCAS}
          />
          {/* COMMENT OUT TO REMOVE BYPASS */}
          {/* <LoginButton
          title="BYPASS LOGIN"
          logo={require("../assets/images/bulldoghead.png")}
          style={styles.GloginButton}
          onPress={byPassLogin}
          /> */}
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
        sharedCookiesEnabled={true}
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
  },
  lowerContainer: {
    paddingTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 200,
    backgroundColor: "white",
    width: "100%",
  },
  bulldog: {
    marginTop: 70,
    width: 350,
    height: 466,
  },
  GloginButton: {
    ...Buttons.loginButton,
    backgroundColor: Colors.Colors.yellow,
  },
  YloginButton: {
    ...Buttons.loginButton,
    backgroundColor: Colors.Colors.navy,
    top: "40%",
  },
});

export default Login;
