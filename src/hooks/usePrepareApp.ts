import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_700Bold,
  Roboto_300Light,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import fonts from "../constants/fonts";

export const usePrepareApp = () => {
  const [appIsReady] = useFonts({
    [fonts.variants.thin]: Roboto_100Thin,
    [fonts.variants.bold]: Roboto_700Bold,
    [fonts.variants.light]: Roboto_300Light,
    [fonts.variants.medium]: Roboto_500Medium,
    [fonts.variants.regular]: Roboto_400Regular,
  });

  const onAppIsReady = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return { appIsReady, onAppIsReady };
};
