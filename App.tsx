import "react-native-gesture-handler";

import * as React from "react";
import { Navigation } from "./src/navigation";
import { Providers } from "./src/providers";

// Configure Reactotron in dev environment
if (__DEV__) {
  require("./src/config/reactotron");
}

export default function App() {
  return (
    <Providers>
      <Navigation />
    </Providers>
  );
}
