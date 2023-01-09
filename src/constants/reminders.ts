import dayjs from "dayjs";

import { generateId } from "../helpers/generateId";
import { ReminderInterface, ReminderTitleInterface } from "../../types/types";

export const reminders: ReminderInterface[] = [
  {
    id: generateId(),
    label: "In 30 Minutes",
    value: dayjs().add(30, "m").valueOf(),
  },
  {
    id: generateId(),
    label: "In an Hour",
    value: dayjs().add(1, "h").valueOf(),
  },
  {
    id: generateId(),
    label: "In Two Hours",
    value: dayjs().add(2, "h").valueOf(),
  },
  {
    id: generateId(),
    label: "In Three Hours",
    value: dayjs().add(3, "h").valueOf(),
  },
  {
    id: generateId(),
    label: "In Four Hours",
    value: dayjs().add(4, "h").valueOf(),
  },
  {
    id: generateId(),
    label: "In Five Hours",
    value: dayjs().add(5, "h").valueOf(),
  },
];

export const reminderTitles: ReminderTitleInterface[] = [
  {
    id: generateId(),
    value: "start_date",
    label: "set reminder",
  },
  {
    id: generateId(),
    value: "start_time",
    label: "set start reminder",
  },
  {
    id: generateId(),
    value: "end_time",
    label: "set end reminder",
  },
];
