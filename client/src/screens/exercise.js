import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Buttons, Typography, Colors } from "../styles";

// eslint-disable-next-line
const Exercise = ({navigation}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={Buttons.habitButton}>
            <Text>Go Back to Home</Text>
        </TouchableOpacity>
        <Text style={Typography.header3}>EXERCISE PAGE</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ExerciseLog')} style={Buttons.habitButton}>
            <Text>Go to Log an Exercise</Text>
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

export default Exercise;
