import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from "react-native";

import { Buttons, Typography, Colors } from "../styles";

// eslint-disable-next-line
const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={Typography.header3}>Home Page</Text>
      <Image
        source={require("../assets/images/bulldog.png")}
        style={styles.bulldog}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Exercise')} style={Buttons.habitButton}>
        <Text>Go to Exercise Page</Text>
      </TouchableOpacity>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Colors.beige,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  bulldog: {
    margin: 30,
    width: 200,
    height: 300,
  },
});

export default Home;
