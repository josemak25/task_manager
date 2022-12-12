import React, { PropsWithChildren } from "react";

import { PaperProvider } from "./PaperProvider";
import { StoreProvider } from "./StoreProvider";
import { SafeAreaProvider } from "./SafeAreaProvider";
import { StatusBarProvider } from "./StatusBarProvider";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <PaperProvider>
      <StoreProvider>
        <SafeAreaProvider>
          <StatusBarProvider>{children}</StatusBarProvider>
        </SafeAreaProvider>
      </StoreProvider>
    </PaperProvider>
  );
};
