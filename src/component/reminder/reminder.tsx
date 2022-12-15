import React, { useCallback } from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { setStatusBarStyle } from "expo-status-bar";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetProps,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { ReminderList } from "./reminder_list";
import { ReminderWheel } from "./reminder_wheel";
import { BottomSheetBackdrop } from "./modal_backdrop";
import { makeUseStyles } from "../../helpers/makeUseStyles";

type BaseReminderModalProps = Partial<BottomSheetProps> & {
  title?: string;
  reminder: string;
  snapPoints?: string[];
  ref: React.RefObject<BottomSheetModal>;
  setReminder: (reminder: string) => void;
};

const snapPoints = ["55%"];

export const Reminder = React.forwardRef<
  BottomSheetModal,
  BaseReminderModalProps
>(({ title = "set reminder", reminder, setReminder, ...props }, ref) => {
  const { isDarkMode, styles } = useStyles();

  const onChange = () => setStatusBarStyle(isDarkMode ? "light" : "dark");

  const BackdropComponent = useCallback(
    (p: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop onClose={props?.onClose} {...p} />
    ),
    []
  );

  return (
    <BottomSheetModal
      {...props}
      ref={ref}
      onChange={onChange}
      snapPoints={snapPoints}
      backdropComponent={BackdropComponent}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      backgroundStyle={styles.bottomSheetBackgroundStyle}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <ReminderList reminder={reminder} setReminder={setReminder} />
        <ReminderWheel setReminder={setReminder} />

        <BottomSheetView style={styles.buttonContainer}>
          <Button
            mode="outlined"
            uppercase={false}
            style={styles.button}
            onPress={props.onClose}
            labelStyle={styles.buttonText}
            contentStyle={styles.contentStyle}
          >
            Cancel
          </Button>
          <Button
            uppercase={false}
            onPress={() => {}}
            mode="contained-tonal"
            contentStyle={styles.contentStyle}
            labelStyle={[styles.buttonText, styles.doneButtonText]}
            style={[styles.button, styles.doneButton]}
          >
            Done
          </Button>
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const useStyles = makeUseStyles(
  ({ edgeInsets, layout, fonts, colors, palette }) => ({
    bottomSheetBackgroundStyle: {
      shadowColor: colors.light.text,
      backgroundColor: palette.white,
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
      backgroundColor: colors.light.text,
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
      borderColor: colors.light.listBackground,
    },
    doneButton: {
      flex: 1,
      marginRight: 0,
      backgroundColor: "#00cbff",
    },
    doneButtonText: {
      opacity: 1,
      color: palette.white,
    },
  })
);
