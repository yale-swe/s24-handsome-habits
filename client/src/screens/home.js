import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";

import { Buttons, Typography, Colors } from "../styles";

// eslint-disable-next-line
const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={Typography.header1}>Home Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Exercise')} style={Buttons.habitButton}>
        <Text>Go to Exercise Page</Text>
      </TouchableOpacity>
  
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
