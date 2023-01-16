import React, { PropsWithChildren } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { PaperProvider } from "./PaperProvider";
import { ToastProvider } from "./ToastProvider";
import { StoreProvider } from "./StoreProvider";
import { SafeAreaProvider } from "./SafeAreaProvider";
import { StatusBarProvider } from "./StatusBarProvider";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <PaperProvider>
      <StoreProvider>
        <SafeAreaProvider>
          <StatusBarProvider>
            <ToastProvider>
              <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
            </ToastProvider>
          </StatusBarProvider>
        </SafeAreaProvider>
      </StoreProvider>
    </PaperProvider>
  );
};
