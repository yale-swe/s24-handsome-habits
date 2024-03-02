import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Buttons, Typography, Colors } from "../styles";

// eslint-disable-next-line
const ExerciseLog = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Exercise')} style={Buttons.habitButton}>
        <Text>Go Back to Excercise</Text>
      </TouchableOpacity>
      <Text style={Typography.header3}>LOG AN EXERCISE</Text>
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

export default ExerciseLog;
