import React from "react";
import { View, ViewProps } from "react-native";

import { makeUseStyles } from "../../helpers/makeUseStyles";

export const Hr: React.FC<ViewProps> = (props) => {
  const { styles } = useStyles();

  return <View style={styles.separatorStyle} {...props} />;
};

const useStyles = makeUseStyles(({ palette, isDarkMode }) => ({
  separatorStyle: {
    borderWidth: 0.5,
    opacity: isDarkMode ? 1 : 0.1,
    backgroundColor: palette.hairlineColor,
  },
}));
