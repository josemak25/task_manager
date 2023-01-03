import "react-native-gesture-handler";

import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Navigation } from "./src/navigation";
import { Providers } from "./src/providers";

// Configure Reactotron in dev environment
if (__DEV__) {
  require("./src/config/reactotron");
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <Navigation />
      </Providers>
    </GestureHandlerRootView>
  );
}
