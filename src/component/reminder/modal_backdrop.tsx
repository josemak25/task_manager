import React, { useMemo } from "react";
import {
  BottomSheetBackdropProps,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { makeUseStyles } from "../../helpers/makeUseStyles";

export const BottomSheetBackdrop: React.FC<
  BottomSheetBackdropProps & { onDismiss?: VoidFunction }
> = ({ style, animatedIndex, onDismiss }) => {
  const { styles } = useStyles();

  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-0.6, 0],
      [0, 0.6],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [style, styles.container, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  );

  return (
    <TouchableWithoutFeedback onPress={onDismiss}>
      <Animated.View style={containerStyle} />
    </TouchableWithoutFeedback>
  );
};

const useStyles = makeUseStyles(({ colors }) => ({
  container: {
    backgroundColor: colors.light.text,
  },
}));
