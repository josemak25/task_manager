import React, { useCallback, useRef, useState } from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { setStatusBarStyle } from "expo-status-bar";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetBackdropProps,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { ReminderList } from "./reminder_list";
import { BottomSheetBackdrop } from "./modal_backdrop";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { ReminderTitleInterface } from "../../../types/types";
import { reminders, reminderTitles } from "../../constants/reminders";

type BaseReminderModalProps = Partial<BottomSheetModalProps> & {
  ref: React.RefObject<BottomSheetModal>;
  reminderTitle?: ReminderTitleInterface;
  onDone: (field: string) => (value: Date) => void;
};

const defaultReminderTitle = reminderTitles[0];
const initialSnapPoints = ["CONTENT_HEIGHT"];

export const Reminder = React.forwardRef<
  BottomSheetModal,
  BaseReminderModalProps
>(
  (
    { reminderTitle = defaultReminderTitle, onDismiss, onDone, ...props },
    ref
  ) => {
    const { isDarkMode, styles } = useStyles();
    const dateRef = useRef<Date>(reminders[0].value);
    const [reminder, setReminder] = useState(reminders[0]);

    const {
      animatedSnapPoints,
      handleContentLayout,
      animatedHandleHeight,
      animatedContentHeight,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const onChange = () => setStatusBarStyle(isDarkMode ? "light" : "dark");

    const BackdropComponent = useCallback(
      (p: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop onDismiss={onDismiss} {...p} />
      ),
      []
    );

    const onDateChange = (_event: DateTimePickerEvent, date?: Date) => {
      if (date) {
        dateRef.current = date;
      }
    };

    const onModalDismiss = () => {
      setReminder(reminders[0]);
      dateRef.current = reminders[0].value;
    };

    return (
      <BottomSheetModal
        {...props}
        ref={ref}
        onChange={onChange}
        onDismiss={onModalDismiss}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={BackdropComponent}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        backgroundStyle={styles.bottomSheetBackgroundStyle}
      >
        <BottomSheetView
          onLayout={handleContentLayout}
          style={styles.contentContainer}
        >
          <Text style={styles.title}>{reminderTitle.label}</Text>

          {reminderTitle.id !== defaultReminderTitle.id && (
            <ReminderList
              reminder={reminder}
              setReminder={(reminder) => {
                dateRef.current = reminder.value;
                setReminder(reminder);
              }}
            />
          )}

          <BottomSheetView style={styles.wheelContainer}>
            <DateTimePicker
              display="spinner"
              value={reminder.value}
              onChange={onDateChange}
              mode={
                reminderTitle.id === defaultReminderTitle.id ? "date" : "time"
              }
            />
          </BottomSheetView>

          <BottomSheetView style={styles.buttonContainer}>
            <Button
              mode="outlined"
              uppercase={false}
              onPress={onDismiss}
              style={styles.button}
              labelStyle={styles.buttonText}
              contentStyle={styles.contentStyle}
            >
              Cancel
            </Button>
            <Button
              uppercase={false}
              mode="contained-tonal"
              contentStyle={styles.contentStyle}
              style={[styles.button, styles.doneButton]}
              labelStyle={[styles.buttonText, styles.doneButtonText]}
              onPress={() => {
                onDone(reminderTitle.value)(dateRef.current!);
                onDismiss?.();
              }}
            >
              Done
            </Button>
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const useStyles = makeUseStyles(
  ({ isDarkMode, edgeInsets, layout, fonts, colors, palette }) => ({
    bottomSheetBackgroundStyle: {
      shadowColor: colors.light.text,
      backgroundColor: isDarkMode ? palette.input : palette.white,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      elevation: 10,
      shadowRadius: 6.27,
      shadowOpacity: 0.34,
    },
    handleIndicatorStyle: {
      opacity: 0.2,
      backgroundColor: palette.text,
    },
    contentContainer: {
      flex: 1,
      paddingTop: layout.gutter,
      paddingBottom: edgeInsets.bottom,
    },
    title: {
      color: palette.text,
      padding: layout.gutter,
      fontSize: fonts.size.xlg,
      textTransform: "capitalize",
      fontFamily: fonts.variants.bold,
    },
    buttonText: {
      opacity: 0.5,
      color: palette.text,
      fontSize: fonts.size.default,
      fontFamily: fonts.variants.medium,
    },
    contentStyle: {
      height: "100%",
      paddingHorizontal: layout.gutter / 2.5,
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      paddingHorizontal: layout.gutter,
    },
    button: {
      flex: 0.5,
      height: 60,
      borderWidth: 1,
      justifyContent: "center",
      borderRadius: layout.gutter,
      marginRight: layout.gutter / 1.5,
      backgroundColor: palette.transparent,
      borderColor: isDarkMode ? palette.lightText : palette.listBackground,
    },
    doneButton: {
      flex: 1,
      marginRight: 0,
      backgroundColor: "#00cbff",
      borderColor: palette.transparent,
    },
    doneButtonText: {
      opacity: 1,
      color: palette.white,
    },
    wheelContainer: {
      flex: 1,
      borderRadius: layout.gutter,
      marginBottom: layout.gutter * 2,
      marginHorizontal: layout.gutter,
      paddingHorizontal: layout.gutter,
      backgroundColor: isDarkMode
        ? palette.hairlineColor
        : palette.listBackground,
    },
  })
);
