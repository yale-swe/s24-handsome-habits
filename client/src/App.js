import Login from "./screens/login";
import Home from "./screens/home";
import Exercise from "./screens/exercise";
import ExerciseLog from "./screens/ExerciseLog";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {


  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Exercise" component={Exercise} />
        <Stack.Screen name="ExerciseLog" component={ExerciseLog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
