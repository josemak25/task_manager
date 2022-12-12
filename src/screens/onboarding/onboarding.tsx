import React from "react";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";
import { generateRandomColor } from "../../helpers/generateRandomColor";

const tags = [{}];

export const OnboardingScreen: React.FC<RootTabScreenProps<"Onboarding">> = ({
  navigation,
}) => {
  const { styles, palette } = useStyles();

  const handlePress = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.ovalContainer}>
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
          <Text style={styles.frontOvalTitle}>Develop</Text>
          <View style={styles.frontOvalTags}>
            {[...Array(4)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.frontOvalTag,
                  { left: index * 20, backgroundColor: generateRandomColor() },
                ]}
              />
            ))}
          </View>
          <Text style={styles.subtitle}>12 Task</Text>
        </View>
      </View>

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

const useStyles = makeUseStyles(({ palette, layout, fonts, edgeInsets }) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: edgeInsets.top,
    paddingBottom: edgeInsets.bottom,
    backgroundColor: palette.background,
  },
  ovalContainer: {
    bottom: layout.gutter * 1.5,
    marginBottom: layout.gutter * 5,
  },
  frontOval: {
    position: "absolute",
    backgroundColor: palette.text,
    transform: [{ rotate: "10deg" }],
  },
  backOval: {
    minHeight: 260,
    padding: layout.gutter * 2,
    paddingTop: layout.gutter * 3,
    backgroundColor: "#ed7477",
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
    color: palette.background,
    fontSize: fonts.size.xxlg,
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
    color: palette.hairlineColor,
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
}));
