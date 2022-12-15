import React from "react";
import { IconButton } from "react-native-paper";

import { makeUseStyles } from "../../helpers/makeUseStyles";

interface CheckboxProps {
  completed: boolean;
  onChange: VoidFunction;
}

export const Checkbox: React.FC<CheckboxProps> = ({ onChange, completed }) => {
  const { styles } = useStyles();

  return (
    <IconButton
      size={18}
      icon="check"
      iconColor="white"
      onPress={onChange}
      style={[styles.checkbox, completed && styles.checkedBox]}
    />
  );
};

const useStyles = makeUseStyles(({ palette }) => ({
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: palette.hairlineColor,
    backgroundColor: palette.transparent,
  },
  checkedBox: {
    borderWidth: 0,
    borderColor: palette.transparent,
    backgroundColor: palette.primary,
  },
}));
