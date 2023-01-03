import React from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";

import { reminders } from "../../constants/reminders";
import { ReminderInterface } from "../../../types/types";
import { makeUseStyles } from "../../helpers/makeUseStyles";

type ReminderListProps = {
  reminder: ReminderInterface;
  setReminder: (reminder: ReminderInterface) => void;
};

export const ReminderList: React.FC<ReminderListProps> = ({
  reminder,
  setReminder,
}) => {
  const { styles } = useStyles();

  return (
    <ScrollView
      horizontal
      style={styles.containerStyle}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
    >
      {reminders.map((data) => (
        <Button
          key={data.id}
          mode="outlined"
          uppercase={false}
          onPress={() => setReminder(data)}
          contentStyle={styles.contentStyle}
          labelStyle={[
            styles.reminderItemText,
            data.id === reminder.id && styles.selectedReminderItemText,
          ]}
          style={[
            styles.reminderItem,
            data.id === reminder.id && styles.selectedReminderItem,
          ]}
        >
          {data.label}
        </Button>
      ))}
    </ScrollView>
  );
};

const useStyles = makeUseStyles(({ isDarkMode, layout, fonts, palette }) => ({
  containerStyle: {
    maxHeight: 45,
    marginTop: layout.gutter,
    marginBottom: layout.gutter * 2,
    paddingHorizontal: layout.gutter,
  },
  contentContainerStyle: {
    paddingRight: 20,
  },
  reminderItem: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    justifyContent: "center",
    borderRadius: layout.gutter,
    marginRight: layout.gutter / 1.5,
    borderColor: palette.transparent,
    backgroundColor: isDarkMode
      ? palette.hairlineColor
      : palette.listBackground,
  },
  selectedReminderItem: {
    backgroundColor: palette.transparent,
    borderColor: isDarkMode ? palette.lightText : palette.listBackground,
  },
  reminderItemText: {
    color: palette.text,
    fontSize: fonts.size.default,
    fontFamily: fonts.variants.medium,
  },
  selectedReminderItemText: {
    opacity: 0.5,
  },
  contentStyle: {
    height: "100%",
    paddingHorizontal: layout.gutter / 2.5,
  },
}));
