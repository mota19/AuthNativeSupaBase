import Login from "./components/login";
import Register from "./components/register";
import DescriptionInfo from "./components/descriptioInfo";
import MobilePhone from "./components/mobilePhone";
import Profile from "./components/profile";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="SignUp" component={Register}></Stack.Screen>
        <Stack.Screen name="mobilePhone" component={MobilePhone}></Stack.Screen>
        <Stack.Screen
          name="description"
          component={DescriptionInfo}
        ></Stack.Screen>
        <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
