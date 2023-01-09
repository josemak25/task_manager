import React from "react";
import { IconButton } from "react-native-paper";
import Animated, {
  withSpring,
  withSequence,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from "react-native-reanimated";

import { makeUseStyles } from "../../helpers/makeUseStyles";

interface CheckboxProps {
  completed: boolean;
  onChange: VoidFunction;
}

export const Checkbox: React.FC<CheckboxProps> = ({ onChange, completed }) => {
  const scale = useSharedValue(1);
  const { styles, palette } = useStyles();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const startAnimation = () => {
    cancelAnimation(scale);
    onChange();
    scale.value = withSequence(
      withSpring(0.7),
      withSpring(1.05),
      withSpring(0.85),
      withSpring(1)
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <IconButton
        size={18}
        icon="check"
        onPress={startAnimation}
        style={[styles.checkbox, completed && styles.checkedBox]}
        iconColor={completed ? palette.white : palette.transparent}
      />
    </Animated.View>
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
