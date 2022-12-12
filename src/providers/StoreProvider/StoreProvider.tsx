import React, { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </ReduxProvider>
);
