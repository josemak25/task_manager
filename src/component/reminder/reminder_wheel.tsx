import React from "react";
import { ScrollView, Text, View } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";

import { makeUseStyles } from "../../helpers/makeUseStyles";

type ReminderWheelProps = {
  setReminder: (reminder: string) => void;
};

const hours = [...Array(12)];
const minutes = [...Array(60)];
const parentMeter = [...Array(4)];
const childrenMeter = [...Array(7)];

export const ReminderWheel: React.FC<ReminderWheelProps> = ({}) => {
  const { styles } = useStyles();

  return (
    <BottomSheetView style={styles.wheelContainer}>
      <BottomSheetView style={styles.wheelSideMeterContainer}>
        {parentMeter.map((_, index) => (
          <View
            key={`${index}_parent_key`}
            style={[
              styles.meterParentLine,
              // remove border from last view to get perfect meter lines
              index === parentMeter.length - 1 && styles.lastMeterParentLine,
            ]}
          >
            {childrenMeter.map((_, index) => (
              <View key={`${index}_child_key`} style={styles.meterChildLine} />
            ))}
          </View>
        ))}
      </BottomSheetView>

      <BottomSheetView
        style={[
          styles.wheelSideMeterContainer,
          styles.rightWheelSideMeterContainer,
        ]}
      >
        {parentMeter.map((_, index) => (
          <View
            key={`${index}_parent_key`}
            style={[
              styles.meterParentLine,
              styles.rightMeterParentLine,
              // remove border from last view to get perfect meter lines
              index === parentMeter.length - 1 && styles.lastMeterParentLine,
            ]}
          >
            {childrenMeter.map((_, index) => (
              <View key={`${index}_child_key`} style={styles.meterChildLine} />
            ))}
          </View>
        ))}
      </BottomSheetView>

      <ScrollView
        pagingEnabled
        bounces={false}
        decelerationRate={0}
        snapToAlignment="center"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {hours.map((_, index) => (
          <Text key={`${index}_hours_key`} style={styles.text}>
            {index < 9 ? `0${++index}` : ++index}
          </Text>
        ))}
      </ScrollView>

      <BottomSheetView style={styles.columnSeparator}>
        <Text style={[styles.text, styles.columnSeparatorText]}>:</Text>
      </BottomSheetView>

      <ScrollView
        pagingEnabled
        bounces={false}
        decelerationRate={0}
        snapToAlignment="center"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {minutes.map((_, index) => (
          <Text key={`${index}_minutes_key`} style={styles.text}>
            {index < 9 ? `0${++index}` : ++index}
          </Text>
        ))}
      </ScrollView>
    </BottomSheetView>
  );
};

const useStyles = makeUseStyles(({ fonts, colors, layout, palette }) => ({
  wheelContainer: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "row",
    borderRadius: layout.gutter,
    backgroundColor: "#f2f4f5",
    marginHorizontal: layout.gutter,
    marginVertical: layout.gutter * 2,
    paddingHorizontal: layout.gutter * 4,
  },
  wheelSideMeterContainer: {
    top: 0,
    flex: 1,
    bottom: 0,
    width: 40,
    alignItems: "center",
    position: "absolute",
    justifyContent: "space-evenly",
  },
  rightWheelSideMeterContainer: {
    right: 0,
  },
  rightMeterParentLine: {
    alignItems: "flex-end",
  },
  meterParentLine: {
    flex: 1,
    width: "100%",
    borderBottomWidth: 1,
    justifyContent: "space-evenly",
  },
  lastMeterParentLine: {
    borderColor: palette.transparent,
  },
  meterChildLine: {
    width: "25%",
    opacity: 0.1,
    borderBottomWidth: 1,
    borderColor: colors.light.text,
  },
  text: {
    color: palette.text,
    padding: layout.gutter,
    fontSize: fonts.size.xxlg * 1.8,
    fontFamily: fonts.variants.regular,
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
  },
  columnSeparator: {
    width: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  columnSeparatorText: {
    padding: 0,
  },
}));
