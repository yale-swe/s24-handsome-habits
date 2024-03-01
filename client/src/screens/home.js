import { StyleSheet, Text, View, ImageBackground } from "react-native";

import { Typography, Colors } from "../styles";

// eslint-disable-next-line
const Home = (navigation) => {
  return (
    <View style={styles.container}>
      <Text style={Typography.header1}>Home Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Colors.beige,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Home;
