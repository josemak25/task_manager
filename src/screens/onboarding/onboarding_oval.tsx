import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import Animated, {
  withDelay,
  withRepeat,
  withSpring,
  withSequence,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import {
  TapGestureHandler,
  PanGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import { inRange } from "../../helpers/inRange";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { generateRandomColor } from "../../helpers/generateRandomColor";

const startingPosition = 0;
const tags = [...Array(4)].map(generateRandomColor);

export const OnboardingOval: React.FC = () => {
  const scale = useSharedValue(1);
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const { styles, palette } = useStyles();

  const startAnimation = (finished: boolean = true) => {
    "worklet";

    if (!finished) {
      cancelAnimation(scale);
    }

    // start animation here
    scale.value = withDelay(
      2000,
      withRepeat(
        withSequence(
          withDelay(500, withSpring(1.1)),
          withDelay(500, withSpring(1))
        ),
        Infinity,
        true
      )
    );
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      cancelAnimation(scale);
    },
    onActive: (event) => {
      const translationX = startingPosition + event.translationX;
      const translationY = startingPosition + event.translationY;

      // displacement of element shouldn't pass the given parameters
      const xIsWithRange = inRange(translationX, -50, 60);
      // displacement of element shouldn't pass the given parameters
      const yIsWithRange = inRange(translationY, -100, 50);

      x.value = xIsWithRange ? translationX : x.value;
      y.value = yIsWithRange ? translationY : y.value;
    },
    onEnd: (_) => {
      x.value = withSpring(0);
      y.value = withSpring(startingPosition);
      scale.value = withSpring(1, undefined, startAnimation);
    },
  });

  const eventHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: () => {
        cancelAnimation(scale);
        scale.value = withSpring(1.1);
      },
      onEnd: () => {
        scale.value = withSpring(1, undefined, startAnimation);
      },
    }
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: y.value },
        { translateX: x.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View>
        <TapGestureHandler onGestureEvent={eventHandler}>
          <Animated.View style={[styles.ovalContainer, animatedStyle]}>
            <View style={styles.backOval} />
            <View style={[styles.backOval, styles.frontOval]}>
              <View style={styles.frontOvalHeader}>
                <View style={styles.frontOvalHeaderUser}>
                  <Text style={styles.title}>👨‍💻</Text>
                </View>
                <IconButton
                  size={20}
                  icon="arrow-top-right"
                  iconColor={palette.background}
                  style={styles.frontOvalHeaderButton}
                />
              </View>
              <Text style={[styles.frontOvalTitle, styles.frontOvalSubtitle]}>
                Develop
              </Text>
              <View style={styles.frontOvalTags}>
                {tags.map((backgroundColor, index) => (
                  <View
                    key={index}
                    style={[
                      styles.frontOvalTag,
                      { left: index * 20, backgroundColor },
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.frontOvalSubtitle}>12 Task</Text>
            </View>
            <View style={[styles.backOval, styles.crossOval]} />
            <View
              style={[
                styles.backOval,
                styles.crossOval,
                styles.crossOvalBottom,
              ]}
            />
          </Animated.View>
        </TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const useStyles = makeUseStyles(({ isDarkMode, palette, layout, fonts }) => ({
  ovalContainer: {
    bottom: layout.gutter * 1.5,
    marginBottom: layout.gutter * 5,
  },
  crossOval: {
    top: 50,
    left: -40,
    zIndex: 1,
    minHeight: 200,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    position: "absolute",
    borderRadius: 200 / 2,
    borderColor: "#f29395",
    width: layout.screen.width / 1.5,
    backgroundColor: palette.transparent,
    transform: [{ rotateZ: "15deg" }, { rotateX: "301deg" }],
  },
  crossOvalBottom: {
    zIndex: 999,
    borderBottomWidth: 2,
    borderLeftColor: palette.transparent,
    borderRightColor: palette.transparent,
  },
  frontOval: {
    position: "absolute",
    backgroundColor: palette.text,
    transform: [{ rotate: "10deg" }],
  },
  backOval: {
    zIndex: 99,
    minHeight: 260,
    padding: layout.gutter * 2,
    backgroundColor: "#ed7477",
    paddingTop: layout.gutter * 3,
    width: layout.screen.width / 2,
    borderRadius: layout.gutter * 2,
    transform: [{ rotate: "-5deg" }],
  },
  frontOvalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: layout.gutter * 2,
    justifyContent: "space-between",
  },
  frontOvalHeaderUser: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.lightText,
  },
  frontOvalHeaderButton: {
    opacity: 0.5,
    left: layout.gutter,
    backgroundColor: palette.text,
    transform: [{ rotate: "45deg" }],
  },
  frontOvalTitle: {
    fontSize: fonts.size.xxlg,
    fontFamily: fonts.variants.medium,
  },
  frontOvalSubtitle: {
    color: palette.background,
    opacity: isDarkMode ? 0.4 : 0.3,
    fontFamily: fonts.variants.medium,
  },
  frontOvalTags: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: layout.gutter * 1.5,
  },
  frontOvalTag: {
    width: 30,
    height: 30,
    borderWidth: 2,
    position: "absolute",
    borderRadius: 30 / 2,
    borderColor: "#fff",
  },
  title: {
    color: palette.text,
    fontSize: fonts.size.xxlg,
    fontFamily: fonts.variants.bold,
  },
}));
