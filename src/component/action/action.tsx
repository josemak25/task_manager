import React from "react";
import { Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { makeUseStyles } from "../../helpers/makeUseStyles";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

interface ActionProps {
  x: number;
  color: string;
  onPress: VoidFunction;
  progress: Animated.AnimatedInterpolation<number>;
  icon: React.ComponentProps<typeof AnimatedIcon>["name"];
}

export const Action: React.FC<ActionProps> = ({
  x,
  icon,
  color,
  onPress,
  progress,
}) => {
  const { styles, palette } = useStyles();

  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <RectButton
        onPress={onPress}
        style={[styles.action, { backgroundColor: color }]}
      >
        <AnimatedIcon size={30} name={icon} color={palette.white} />
      </RectButton>
    </Animated.View>
  );
};

const useStyles = makeUseStyles(() => ({
  action: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
