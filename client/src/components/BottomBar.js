// import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Exercise from "../screens/exercise";

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Exercise" component={Exercise} />
    </Tab.Navigator>
  );
};

export default BottomBar;
