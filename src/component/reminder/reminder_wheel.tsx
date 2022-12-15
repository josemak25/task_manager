import React from "react";
import { Text, View } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";

import { Picker } from "../picker";
import { addZero } from "../../helpers/addZero";
import { generateId } from "../../helpers/generateId";
import { makeUseStyles } from "../../helpers/makeUseStyles";

type ReminderWheelProps = {
  setReminder: (reminder: string) => void;
};

const parentMeter = [...Array(4)];
const childrenMeter = [...Array(7)];
const hours = [...Array(24)]
  .map((_, index) => addZero(++index))
  .map((hour) => ({ id: generateId(), value: hour, label: hour }));

const minutes = [...Array(60)]
  .map((_, index) => addZero(++index))
  .map((minute) => ({ id: generateId(), value: minute, label: minute }));

export const ReminderWheel: React.FC<ReminderWheelProps> = ({
  setReminder,
}) => {
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

      <Picker
        haptics
        height={225}
        items={hours}
        backgroundColor="#f2f4f5"
        initialSelectedIndex={new Date().getHours()}
        onChange={({ item }) => setReminder(item.value)}
      />

      <BottomSheetView style={styles.columnSeparator}>
        <Text style={[styles.text, styles.columnSeparatorText]}>:</Text>
      </BottomSheetView>

      <Picker
        haptics
        height={225}
        items={minutes}
        backgroundColor="#f2f4f5"
        initialSelectedIndex={new Date().getMinutes()}
        onChange={({ item }) => setReminder(item.value)}
      />
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
