import React from "react";
import { View, Text } from "react-native";

import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";

export const OnboardingScreen: React.FC<
  RootTabScreenProps<"Onboarding">
> = ({}) => {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Onboarding Screen</Text>
    </View>
  );
};

const useStyles = makeUseStyles(({ palette, fonts, edgeInsets }) => ({
  container: {
    flex: 1,
    paddingBottom: edgeInsets.bottom,
    backgroundColor: palette.background,
  },
  text: {
    color: palette.text,
    fontSize: fonts.size.xxlg,
    fontWeight: fonts.weight.bold,
  },
}));
