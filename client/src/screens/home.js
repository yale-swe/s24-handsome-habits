import { StyleSheet, Text, View, ImageBackground } from "react-native";

import { Typography } from "../styles";

// eslint-disable-next-line
const Home = (navigation) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        testID="homeView"
        source={require("../assets/images/cross_bg.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Text style={Typography.header1}>Home Page</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    ...Typography.mainFont,
  },

  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Home;
