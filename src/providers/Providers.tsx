import React, { PropsWithChildren } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { PaperProvider } from "./PaperProvider";
import { StoreProvider } from "./StoreProvider";
import { SafeAreaProvider } from "./SafeAreaProvider";
import { StatusBarProvider } from "./StatusBarProvider";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <PaperProvider>
      <StoreProvider>
        <SafeAreaProvider>
          <StatusBarProvider>
            <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
          </StatusBarProvider>
        </SafeAreaProvider>
      </StoreProvider>
    </PaperProvider>
  );
};
