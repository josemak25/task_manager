import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Button, IconButton, TextInput } from "react-native-paper";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import dayjs from "dayjs";

import {
  ITask,
  ICategory,
} from "../../providers/StoreProvider/reducers/task/interfaces";
import { Reminder } from "../../component/reminder";
import { generateId } from "../../helpers/generateId";
import { useKeyboard } from "../../hooks/useKeyboard";
import { validateTask } from "../../helpers/validateTask";
import { reminderTitles } from "../../constants/reminders";
import { setAlphaColor } from "../../helpers/setAlphaColor";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { ReminderTitleInterface } from "../../../types/types";
import { RootTabScreenProps } from "../../../types/navigation";
import { generateRandomColor } from "../../helpers/generateRandomColor";
import { taskActions } from "../../providers/StoreProvider/reducers/task/reducer";

const defaultTask: Partial<ITask> = {
  title: "",
  categories: [],
  description: "",
  start_time: dayjs().valueOf(),
  end_time: dayjs().add(30, "m").valueOf(),
};

export const NewTaskScreen: React.FC<RootTabScreenProps<"NewTask">> = ({
  route,
}) => {
  const keyboard = useKeyboard();
  const dispatch = useDispatch();
  const scrollRef = useRef<ScrollView>(null);
  const [category, setCategory] = useState("");
  const { styles, edgeInsets, palette } = useStyles();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [reminderTitle, setReminderTitle] = useState(reminderTitles[0]);
  const [task, setTask] = useState({ ...defaultTask, ...route.params?.task });
  const [errors, setErrors] = useState<Record<keyof ITask, string> | null>(
    null
  );

  const handleCategory = (name: string) => {
    const categoryName = name.trim();
    const previousCategories = [...(task?.categories || [])];
    const categoryExits = previousCategories.find(
      ({ name }) => name === categoryName
    );

    const category: ICategory = {
      id: generateId(),
      name: categoryName,
      color: generateRandomColor(),
    };

    const newCategories = categoryExits
      ? previousCategories.filter(({ name }) => name !== categoryName)
      : [...previousCategories, category];

    setTask({ ...task, categories: newCategories });
    category && setCategory("");
  };

  const handleModalDismiss = () => bottomSheetModalRef.current?.close();

  const handleChange = (field: keyof ITask) => (value: string | number) => {
    if (errors?.[field]) {
      setErrors({ ...errors, [field]: null });
    }
    setTask({ ...task, [field]: value });
  };

  const handleModalPresent = (title: ReminderTitleInterface["value"]) => () => {
    const reminderTitle = reminderTitles.find(({ value }) => value === title);
    setReminderTitle(reminderTitle!);
    bottomSheetModalRef.current?.present();
  };

  const onSubmit = () => {
    const { hasErrors, errors } = validateTask(task);

    if (hasErrors) {
      return setErrors(errors);
    }

    if (route.params?.task) {
      dispatch(taskActions.updateTask(task));
    } else {
      dispatch(taskActions.addTask(task));
    }

    setTask(defaultTask);
  };

  return (
    <ScrollView
      ref={scrollRef}
      bounces={false}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainerStyle,
        keyboard.keyboardShown && {
          paddingBottom: keyboard.keyboardHeight + edgeInsets.bottom,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.startDateLabel}>Title</Text>
        <TextInput
          mode="outlined"
          value={task.title}
          error={!!errors?.title}
          textColor={palette.text}
          placeholder="Dinner with Family"
          outlineColor={palette.hairlineColor}
          activeOutlineColor={palette.primary}
          onChangeText={handleChange("title")}
          placeholderTextColor={palette.lightText}
          style={[styles.input, styles.inputBackground, styles.inputOverride]}
        />
        {errors?.title && <Text style={styles.error}>{errors?.title}</Text>}
      </View>

      <Text style={styles.startDateLabel}>Date</Text>
      <Button
        uppercase={false}
        mode="contained-tonal"
        labelStyle={[
          styles.dateButtonLabel,
          !task?.start_date && { color: palette.lightText },
        ]}
        contentStyle={styles.dateButtonContent}
        onPress={handleModalPresent("start_date")}
        style={[
          styles.input,
          styles.button,
          styles.dateButton,
          styles.inputBackground,
        ]}
      >
        {dayjs(task?.start_date).format("dddd, DD MMMM YYYY")}
      </Button>

      <View style={styles.dateContainer}>
        <View>
          <Text style={styles.startDateLabel}>Start Time</Text>
          <TouchableOpacity
            style={styles.startButtonWrapper}
            onPress={handleModalPresent("start_time")}
          >
            <View style={styles.startButton}>
              <Text style={styles.startDateLabel}>
                {dayjs(task?.start_time).format("hh : mm")}
              </Text>
            </View>
            <Text style={styles.startHour}>
              {dayjs(task?.end_time).format("A")}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.startDateLabel}>End Time</Text>
          <TouchableOpacity
            style={styles.startButtonWrapper}
            onPress={handleModalPresent("end_time")}
          >
            <View style={styles.startButton}>
              <Text style={styles.startDateLabel}>
                {dayjs(task?.end_time).format("hh : mm")}
              </Text>
            </View>
            <Text style={styles.startHour}>
              {dayjs(task?.end_time).format("A")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.startDateLabel}>Description</Text>
      <TextInput
        multiline
        mode="outlined"
        textColor={palette.text}
        value={task.description}
        error={!!errors?.description}
        style={styles.inputBackground}
        outlineColor={palette.hairlineColor}
        activeOutlineColor={palette.primary}
        placeholderTextColor={palette.lightText}
        onChangeText={handleChange("description")}
        placeholder="Build an E-Commerce Website about hand made furniture"
      />
      {errors?.description && (
        <Text style={styles.error}>{errors?.description}</Text>
      )}

      <View style={styles.addCategoryWrapper}>
        <Text style={styles.startDateLabel}>Category</Text>
        <View style={styles.addCategoryContainer}>
          <TextInput
            mode="outlined"
            maxLength={26}
            value={category}
            placeholder="Website"
            textColor={palette.text}
            onChangeText={setCategory}
            outlineColor={palette.hairlineColor}
            activeOutlineColor={palette.primary}
            placeholderTextColor={palette.lightText}
            style={[styles.input, styles.inputBackground]}
          />

          <View style={styles.addCategoryButtonContainer}>
            <IconButton
              size={20}
              icon="plus"
              disabled={!category}
              iconColor={palette.white}
              style={styles.addCategoryButton}
              onPress={() => handleCategory(category)}
            />
          </View>
        </View>
      </View>

      {task?.categories?.length ? (
        <View style={styles.categoryContainer}>
          {task?.categories.map((category) => (
            <Button
              elevation={0}
              key={category.id}
              uppercase={false}
              onPress={() => handleCategory(category.name)}
              labelStyle={[
                styles.categoryButtonLabel,
                { color: category.color },
              ]}
              style={[
                styles.categoryButton,
                { backgroundColor: setAlphaColor(category.color, 0.1) },
              ]}
            >
              {category.name}
            </Button>
          ))}
        </View>
      ) : null}

      <Button
        mode="contained"
        uppercase={false}
        onPress={onSubmit}
        style={styles.button}
        contentStyle={{ height: "100%" }}
      >
        Create a new task
      </Button>

      <Reminder
        onDone={handleChange}
        ref={bottomSheetModalRef}
        reminderTitle={reminderTitle}
        onDismiss={handleModalDismiss}
      />
    </ScrollView>
  );
};

const useStyles = makeUseStyles(
  ({ isDarkMode, layout, palette, fonts, edgeInsets }) => ({
    container: {
      flex: 1,
      paddingHorizontal: layout.gutter * 2,
      backgroundColor: palette.homeBackground,
    },
    contentContainerStyle: {
      paddingTop: layout.gutter * 2,
      paddingBottom: edgeInsets.bottom,
    },
    dateContainer: {
      flexDirection: "row",
      marginVertical: layout.gutter,
      justifyContent: "space-between",
      marginBottom: layout.gutter * 2.5,
    },
    titleContainer: {
      marginBottom: layout.gutter,
    },
    input: {
      height: 50,
      marginBottom: layout.gutter,
    },
    inputOverride: {
      marginBottom: 0,
    },
    inputBackground: {
      backgroundColor: palette.input,
    },
    startDateLabel: {
      fontSize: fonts.size.default,
      fontFamily: fonts.variants.medium,
      color: isDarkMode ? palette.text : palette.hairlineColor,
    },
    error: {
      opacity: 0.7,
      marginVertical: 5,
      color: palette.red,
      fontSize: fonts.size.default,
      fontFamily: fonts.variants.medium,
    },
    startButtonWrapper: {
      alignItems: "center",
      flexDirection: "row",
      marginTop: layout.gutter / 2,
    },
    startButton: {
      borderRadius: layout.gutter / 3,
      paddingHorizontal: layout.gutter,
      marginRight: layout.gutter / 1.5,
      paddingVertical: layout.gutter / 1.5,
      backgroundColor: palette.dateBackground,
    },
    dateButton: {
      marginTop: 5,
      borderWidth: 1,
      borderColor: palette.hairlineColor,
    },
    dateButtonContent: {
      height: "100%",
      justifyContent: "flex-start",
    },
    dateButtonLabel: {
      color: palette.text,
      fontWeight: fonts.weight.normal,
      fontFamily: fonts.variants.regular,
    },
    startHour: {
      color: palette.text,
      fontSize: fonts.size.default,
      fontFamily: fonts.variants.medium,
    },
    dateMask: {
      right: 0,
      width: "42%",
      height: "100%",
      position: "absolute",
      borderRadius: layout.gutter / 3,
      backgroundColor: palette.dateBackground,
    },
    end: {
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
      color: palette.text,
      fontSize: fonts.size.md,
      fontWeight: fonts.weight.bold,
    },
    addCategoryContainer: {
      justifyContent: "center",
    },
    addCategoryWrapper: {
      marginTop: layout.gutter * 2,
    },
    addCategoryButtonContainer: {
      right: 0,
      height: 50,
      zIndex: 999,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    addCategoryButton: {
      width: 30,
      bottom: 3,
      height: 30,
      borderRadius: 25,
      marginHorizontal: layout.gutter,
      backgroundColor: palette.hairlineColor,
    },
    categoryContainer: {
      paddingTop: 0,
      flexWrap: "wrap",
      flexDirection: "row",
      paddingLeft: layout.gutter,
      paddingBottom: layout.gutter,
      marginVertical: layout.gutter,
      borderRadius: layout.gutter / 2,
      backgroundColor: palette.input,
    },
    categoryButton: {
      flexGrow: 0.33,
      marginTop: layout.gutter,
      marginRight: layout.gutter,
      borderRadius: layout.gutter / 2,
    },
    categoryButtonLabel: {
      fontSize: fonts.size.s,
    },
    cardContainer: {
      borderRadius: 10,
      paddingHorizontal: layout.gutter * 3,
      backgroundColor: palette.hairlineColor,
    },
    button: {
      height: 50,
      marginTop: layout.gutter,
      backgroundColor: palette.primary,
    },
  })
);
