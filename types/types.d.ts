import type { FlatListProps } from "react-native";

interface BasicError {
  error: any;
  data?: any;
  message: string;
}

export type ReminderInterface = { id: string; label: string; value: Date };

export type ReminderTitleInterface = {
  id: string;
  value: "end_time" | "start_time" | "start_date";
  label: "set reminder" | "set start reminder" | "set end reminder";
};
