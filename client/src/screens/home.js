import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { Buttons, Typography, Colors } from "../styles";

// eslint-disable-next-line
const Home = (props) => {

  Home.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired, 
    }).isRequired,
  };

  return (
    // show the user's coins and wellness points
    <View style={styles.container}>
      <Text style={Typography.header3}>Home Page</Text>
      <Image
        source={require("../assets/images/bulldog.png")}
        style={styles.bulldog}
      />
      <TouchableOpacity onPress={() => props.navigation.navigate('Exercise')} style={Buttons.habitButton}>
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
