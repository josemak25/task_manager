import React, { PropsWithChildren } from "react";
import { configureFonts, MD2LightTheme, Provider } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

import fonts from "../../constants/fonts";

const fontConfig = {
  ios: {
    regular: {
      fontFamily: [fonts.variants.regular],
    },
    medium: {
      fontFamily: [fonts.variants.medium],
    },
    light: {
      fontFamily: [fonts.variants.light],
    },
    thin: {
      fontFamily: [fonts.variants.thin],
    },
  },
  android: {
    regular: {
      fontFamily: [fonts.variants.regular],
    },
    medium: {
      fontFamily: [fonts.variants.medium],
    },
    light: {
      fontFamily: [fonts.variants.light],
    },
    thin: {
      fontFamily: [fonts.variants.thin],
    },
  },
};

const theme: ThemeProp = {
  ...MD2LightTheme,
  fonts: configureFonts({
    //@ts-ignore
    isV3: false,
    //@ts-ignore
    config: fontConfig,
  }),
};

export const PaperProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <Provider theme={theme}>{children}</Provider>
);
