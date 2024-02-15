import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { useEffect } from "react";

const Home = (navigation) => {

  return (
    <View style={styles.container}>
        <ImageBackground source={require("../assets/images/cross_bg.png")} resizeMode="cover" style={styles.image}>
            <Text style={styles.header1}>Home Page</Text>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    // alignItems: "center",
    // justifyContent: "center",
    fontFamily: "Roboto",
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  header1: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    fontFamily: "Roboto",
  },
});

export default Home;