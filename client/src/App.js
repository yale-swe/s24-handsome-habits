import Login from "./screens/login";
import Home from "./screens/home";
import Exercise from "./screens/exercise";
import ExerciseLog from "./screens/exerciseLog";
import EatLog from "./screens/eatLog";
import SleepLog from "./screens/sleepLog";
import StudyLog from "./screens/studyLog";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Exercise" component={Exercise} options={{ headerShown: false }} />
        <Stack.Screen name="ExerciseLog" component={ExerciseLog} options={{ headerShown: false }}/>
        <Stack.Screen name="EatLog" component={EatLog} options={{ headerShown: false }}/>
        <Stack.Screen name="SleepLog" component={SleepLog} options={{ headerShown: false }}/>
        <Stack.Screen name="StudyLog" component={StudyLog} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
