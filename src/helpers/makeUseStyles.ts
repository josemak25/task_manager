import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import colors from "../constants/colors";
import fonts from "../constants/fonts";
import layout from "../constants/layout";
import useColorScheme from "../hooks/useColorScheme";

type Palette = typeof colors["light"];

type GetStylesPayload = {
  palette: Palette;
  isDarkMode: boolean;
  fonts: typeof fonts;
  layout: typeof layout;
  colors: typeof colors;
  edgeInsets: EdgeInsets;
};

export function makeUseStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  getStyles: (payload: GetStylesPayload) => T | StyleSheet.NamedStyles<T>,
): () => GetStylesPayload & { styles: T } {
  return () => {
    const theme = useColorScheme();
    const edgeInsets = useSafeAreaInsets();
    const palette = colors[theme];
    const isDarkMode = theme !== "light";

    const styles = useMemo(
      () =>
        StyleSheet.create(
          getStyles({ isDarkMode, palette, layout, colors, fonts, edgeInsets }),
        ),
      [edgeInsets, isDarkMode, palette],
    );

    return { isDarkMode, styles, palette, layout, colors, edgeInsets, fonts };
  };
}
