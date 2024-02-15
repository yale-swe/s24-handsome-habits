import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect } from "react";

const Home = (navigation) => {

  return (
    <View style={styles.container}>
      <Text style={styles.header1}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto",
  },
});

export default Home;