import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Advertisement from "./screens/Advertisement";
import CarDetails from "./screens/CarDetails";
import { StatusBar } from "react-native";

import SignUp from "./screens/SignUp";
import { COLORS } from "./constants";
const Stack = createStackNavigator();

const Navigation = (props) => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        StatusBarAnimation="fade"
        backgroundColor={COLORS.white}
        translucent={false}
      />
      <Stack.Navigator
        initialRouteName={"Advertisement"}
        screenOptions={{
          headerStyle: { elevation: 0 },
          cardStyle: { backgroundColor: COLORS.white },
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Advertisement"
          component={Advertisement}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={CarDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
