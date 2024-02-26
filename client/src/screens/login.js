import LoginButtons from "../components/loginButtons";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { Typography, Colors, Spacing, Buttons } from '../styles';


const Login = ({navigation}) => {


  return (
    <View style={styles.container}>
        <Text style={Typography.header4}> Welcome to </Text>
        <Text style={Typography.header3}> Handsome Habits </Text>
        <Image
          source={require("../assets/images/bulldog.png")}
          style={styles.bulldog}
        />
        <LoginButtons navigation={navigation}/>
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