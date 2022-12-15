import React from "react";
import { Button } from "react-native-paper";
import { ScrollView } from "react-native";

import { makeUseStyles } from "../../helpers/makeUseStyles";

const reminders = [
  "No Reminder",
  "In an Hour",
  "In Two Hours",
  "In Three Hours",
  "In Four Hours",
  "In Five Hours",
];

type ReminderListProps = {
  reminder: string;
  setReminder: (reminder: string) => void;
};

export const ReminderList: React.FC<ReminderListProps> = ({
  reminder,
  setReminder,
}) => {
  const { styles } = useStyles();

  return (
    <ScrollView
      horizontal
      style={styles.contentContainerStyle}
      showsHorizontalScrollIndicator={false}
    >
      {reminders.map((text, index) => (
        <Button
          mode="outlined"
          uppercase={false}
          key={text + index}
          onPress={() => setReminder(text)}
          contentStyle={styles.contentStyle}
          labelStyle={[
            styles.reminderItemText,
            text === reminder && styles.selectedReminderItemText,
          ]}
          style={[
            styles.reminderItem,
            text === reminder && styles.selectedReminderItem,
          ]}
        >
          {text}
        </Button>
      ))}
    </ScrollView>
  );
};

const useStyles = makeUseStyles(({ layout, fonts, colors, palette }) => ({
  contentContainerStyle: {
    maxHeight: 45,
    marginTop: layout.gutter,
    paddingHorizontal: layout.gutter,
  },
  reminderItem: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    justifyContent: "center",
    borderRadius: layout.gutter,
    backgroundColor: "#f2f4f5",
    marginRight: layout.gutter / 1.5,
    borderColor: palette.transparent,
  },
  selectedReminderItem: {
    backgroundColor: palette.transparent,
    borderColor: colors.light.listBackground,
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
