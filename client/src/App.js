import Login from "./screens/login";
import Home from "./screens/home";
import Exercise from "./screens/exercise";
import ExerciseLog from "./screens/exerciseLog";
import Eat from "./screens/eat";
import EatLog from "./screens/eatLog";
import Sleep from "./screens/sleep";
import SleepLog from "./screens/sleepLog";
import Study from "./screens/study";
import StudyLog from "./screens/studyLog";
import Shop from "./screens/shop"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AuthProvider } from "./components/authContext";
import AudioPlayer from "./components/AudioPlayer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AudioPlayer/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Shop" component={Shop} options={{ headerShown: false }}/>
          <Stack.Screen name="Exercise" component={Exercise} options={{ headerShown: false }} />
          <Stack.Screen name="ExerciseLog" component={ExerciseLog} options={{ headerShown: false }}/>
          <Stack.Screen name="Eat" component={Eat} options={{ headerShown: false }}/>
          <Stack.Screen name="EatLog" component={EatLog} options={{ headerShown: false }}/>
          <Stack.Screen name="Sleep" component={Sleep} options={{ headerShown: false }}/>
          <Stack.Screen name="SleepLog" component={SleepLog} options={{ headerShown: false }}/>
          <Stack.Screen name="Study" component={Study} options={{ headerShown: false }}/>
          <Stack.Screen name="StudyLog" component={StudyLog} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
