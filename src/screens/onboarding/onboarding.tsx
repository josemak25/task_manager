import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  withDelay,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from "react-native-reanimated";

import { OnboardingOval } from "./onboarding_oval";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";

export const OnboardingScreen: React.FC<RootTabScreenProps<"Onboarding">> = ({
  navigation,
}) => {
  const x = useSharedValue(0);
  const isFocused = useIsFocused();
  const { styles, palette } = useStyles();

  const handlePress = () => navigation.replace("Home");

  // start animation here
  const startAnimation = () => {
    x.value = withDelay(
      2000,
      withRepeat(
        withSequence(withSpring(10), withTiming(-10, { duration: 500 })),
        Infinity,
        true
      )
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  useEffect(() => {
    if (isFocused) {
      // only run animation when screen is mounted
      startAnimation();
    } else {
      // stop animation when screen is unmounted
      cancelAnimation(x);
    }
  }, [isFocused]);

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
        onPress={handlePress}
        iconColor={palette.background}
        style={styles.buttonContainer}
        icon={(props) => (
          <Animated.View style={animatedStyle}>
            <MaterialCommunityIcons
              {...props}
              name="arrow-top-right"
              style={styles.iconStyle}
            />
          </Animated.View>
        )}
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
    },
    iconStyle: {
      transform: [{ rotate: "45deg" }],
    },
  })
);
