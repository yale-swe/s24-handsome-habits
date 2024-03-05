import {
  StyleSheet,
  Text,
  View,
  ImageBackground
} from "react-native";

// eslint-disable-next-line
const Home = (navigation) => {

  return (
    // show the user's coins and wellness points
    <View style={styles.container}>
        <ImageBackground testID="homeView" source={require("../assets/images/cross_bg.png")} resizeMode="cover" style={styles.image}>
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