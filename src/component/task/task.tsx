import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

import { Hr } from "../hr";
import { Checkbox } from "../checkbox";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { ITask } from "../../providers/StoreProvider/reducers/task/interfaces";
import { taskActions } from "../../providers/StoreProvider/reducers/task/reducer";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const Task: React.FC<ITask & { onPress: VoidFunction }> = ({
  id,
  title,
  onPress,
  end_time,
  completed,
  categories,
  start_time,
  created_at,
  description,
}) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const isToday = dayjs(created_at).isToday();
  const isYesterday = dayjs(created_at).isYesterday();
  const isLongerDate = !isToday && !isYesterday;

  const handleCheck = () => {
    dispatch(taskActions.updateTask({ id, completed: !completed }));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              completed && {
                textDecorationLine: "line-through",
              },
            ]}
          >
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {description}
          </Text>
        </View>

        <Checkbox completed={completed} onChange={handleCheck} />
      </View>

      <Hr style={styles.hr} />

      <View style={styles.timeContainer}>
        <View style={styles.time}>
          {isToday && <Text style={styles.day}>Today</Text>}
          {isYesterday && <Text style={styles.day}>Yesterday</Text>}
          {isLongerDate && (
            <Text style={styles.day}>{dayjs().format("DD MMM YYYY")}</Text>
          )}

          <Text style={styles.timer}>
            {dayjs(start_time).format("hh:mm A")}
            {dayjs(end_time).format(" - hh:mm A")}
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.slice(0, 2).map(({ color, id }, index) => (
            <View
              key={id}
              style={[
                styles.category,
                { right: ++index * 20, backgroundColor: color, zIndex: -index },
              ]}
            />
          ))}

          {categories.length > 2 && (
            <View style={[styles.category, { right: 0 * 20 }]}>
              <Text style={styles.badge}>{`+${categories.length - 2}`}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = makeUseStyles(({ fonts, isDarkMode, layout, palette }) => ({
  container: {
    borderRadius: layout.gutter,
    marginBottom: layout.gutter * 2,
    paddingVertical: layout.gutter * 2,
    paddingHorizontal: layout.gutter * 1.5,
    backgroundColor: isDarkMode ? palette.input : palette.background,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 8,
      height: 10,
    },
    elevation: 1,
    shadowRadius: 6.68,
    shadowOpacity: 0.04,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: palette.text,
    fontSize: fonts.size.lg,
    fontFamily: fonts.variants.medium,
  },
  subtitle: {
    marginTop: 5,
    color: palette.text,
    fontSize: fonts.size.default,
    opacity: isDarkMode ? 0.4 : 0.3,
    fontFamily: fonts.variants.medium,
  },
  hr: {
    borderBottomWidth: 1,
    opacity: isDarkMode ? 0.4 : 0.3,
    marginVertical: layout.gutter * 1.5,
    borderBottomColor: palette.hairlineColor,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
  },
  day: {
    color: palette.text,
    opacity: isDarkMode ? 0.4 : 0.3,
    fontFamily: fonts.variants.medium,
  },
  timer: {
    marginLeft: 10,
    color: palette.text,
    opacity: isDarkMode ? 0.4 : 0.3,
    fontFamily: fonts.variants.regular,
  },
  categoriesContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  category: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 30 / 2,
    borderColor: "#fff",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.primary,
  },
  badge: {
    color: palette.white,
    fontSize: fonts.size.default - 3,
  },
}));
