import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/home";
import { NewTaskScreen } from "../screens/new_task";
import { useIsDarkMode } from "../hooks/useIsDarkMode";
import { usePrepareApp } from "../hooks/usePrepareApp";
import { StackParamList } from "../../types/navigation";
import { OnboardingScreen } from "../screens/onboarding";
import { makeUseStyles } from "../helpers/makeUseStyles";

const Stack = createNativeStackNavigator<StackParamList>();

export const Navigation = () => {
  const { palette } = useStyles();
  const isDarkMode = useIsDarkMode();
  const { appIsReady, onAppIsReady } = usePrepareApp();

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer
      onReady={onAppIsReady}
      theme={isDarkMode ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="NewTask"
          component={NewTaskScreen}
          options={{
            headerShown: true,
            title: "New Task",
            headerTitleAlign: "center",
            headerTintColor: palette.text,
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: palette.background },
          }}
        />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const useStyles = makeUseStyles(() => ({}));
