import * as React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/home";
import { NewTaskScreen } from "../screens/new_task";
import { useIsDarkMode } from "../hooks/useIsDarkMode";
import { StackParamList } from "../../types/navigation";
import { OnboardingScreen } from "../screens/onboarding";

const Stack = createNativeStackNavigator<StackParamList>();

export const Navigation = () => {
  const isDarkMode = useIsDarkMode();

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewTask" component={NewTaskScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
