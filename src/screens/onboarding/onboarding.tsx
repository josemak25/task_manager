import React from "react";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import { OnboardingOval } from "./onboarding_oval";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";

export const OnboardingScreen: React.FC<RootTabScreenProps<"Onboarding">> = ({
  navigation,
}) => {
  const { styles, palette } = useStyles();

  const handlePress = () => {
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <OnboardingOval />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Stay Creative</Text>
        <Text style={[styles.title, styles.exclamationMark]}>!</Text>
      </View>

      <Text style={styles.subtitle}>organize life, and do something</Text>
      <Text style={styles.subtitle}>creative everyday</Text>

      <IconButton
        size={20}
        icon="arrow-top-right"
        onPress={handlePress}
        iconColor={palette.background}
        style={styles.buttonContainer}
      />
    </View>
  );
};

const useStyles = makeUseStyles(
  ({ isDarkMode, palette, layout, fonts, edgeInsets }) => ({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: edgeInsets.top,
      paddingBottom: edgeInsets.bottom,
      backgroundColor: palette.background,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: layout.gutter,
    },
    title: {
      color: palette.text,
      fontSize: fonts.size.xxlg,
      fontFamily: fonts.variants.bold,
    },
    exclamationMark: {
      right: -layout.gutter / 1.5,
      transform: [{ rotate: "20deg" }],
    },
    subtitle: {
      color: palette.text,
      opacity: isDarkMode ? 0.4 : 0.3,
      fontFamily: fonts.variants.medium,
    },
    buttonContainer: {
      width: 80,
      height: 80,
      borderRadius: 80 / 2,
      marginTop: layout.gutter * 3,
      backgroundColor: palette.text,
      transform: [{ rotate: "45deg" }],
    },
  })
);
