import React, { PropsWithChildren } from "react";

import {
  initialWindowMetrics,
  SafeAreaProvider as BaseSafeAreaProvider,
} from "react-native-safe-area-context";

export const SafeAreaProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <BaseSafeAreaProvider initialMetrics={initialWindowMetrics}>
    {children}
  </BaseSafeAreaProvider>
);
