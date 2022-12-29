import React, { useRef, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

import {
  ITask,
  ICategory,
} from "../../providers/StoreProvider/reducers/task/interfaces";
import { generateId } from "../../helpers/generateId";
import { setAlphaColor } from "../../helpers/setAlphaColor";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";
import { generateRandomColor } from "../../helpers/generateRandomColor";

const defaultTask = {
  title: "",
  categories: [],
  description: "",
  end_time: new Date(),
  start_time: new Date(),
};

export const NewTaskScreen: React.FC<RootTabScreenProps<"NewTask">> = ({}) => {
  const { styles, palette } = useStyles();
  const [category, setCategory] = useState("");
  const [task, setTask] = useState<Partial<ITask>>(defaultTask);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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

  const handleChange = (field: string) => (value: string) => {
    setTask({ ...task, [field]: value });
  };

  const handleCloseModal = () => setTask({ ...task, ...defaultTask });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <TextInput
        mode="outlined"
        value={task.title}
        textColor={palette.text}
        placeholder="Dinner with Family"
        placeholderTextColor={palette.text}
        outlineColor={palette.hairlineColor}
        activeOutlineColor={palette.primary}
        onChangeText={handleChange("title")}
        style={[styles.input, styles.inputBackground]}
        label={
          <Text style={[styles.startDateLabel, styles.inputBackground]}>
            Title
          </Text>
        }
      />

      <DateTimePicker
        // modal
        mode="date"
        value={new Date()}
        minimumDate={new Date()}
        // dateFormat="dayofweek day month"
        // open={isDatePickerOpen}
        onChange={(date) => {
          // setOpen(false)
          // setDate(date)
        }}
      />

      <TextInput
        // disabled
        mode="outlined"
        textColor={palette.text}
        placeholderTextColor={palette.text}
        outlineColor={palette.hairlineColor}
        activeOutlineColor={palette.primary}
        onPressIn={() => setIsDatePickerOpen(true)}
        value={dayjs().format("dddd, DD MMMM YYYY")}
        style={[styles.input, styles.inputBackground]}
        label={
          <Text style={[styles.startDateLabel, styles.inputBackground]}>
            Date
          </Text>
        }
      />

      <View style={styles.dateContainer}>
        <View>
          <Text style={styles.startDateLabel}>Start Time</Text>
          <View style={styles.startButtonWrapper}>
            <View style={styles.startButton}>
              <DateTimePicker
                is24Hour
                mode="time"
                onChange={(date) => {}}
                value={task.start_time!}
                minimumDate={new Date()}
              />
            </View>
            <Text style={styles.startHour}>PM</Text>
          </View>
        </View>

        <View>
          <Text style={styles.startDateLabel}>End Time</Text>
          <View style={styles.startButtonWrapper}>
            <View style={styles.startButton}>
              <DateTimePicker
                is24Hour
                mode="time"
                value={task.end_time!}
                onChange={(date) => {}}
                minimumDate={new Date()}
              />
            </View>
            <Text style={styles.startHour}>PM</Text>
          </View>
        </View>
      </View>

      <TextInput
        multiline
        mode="outlined"
        textColor={palette.text}
        value={task.description}
        style={styles.inputBackground}
        placeholderTextColor={palette.text}
        outlineColor={palette.hairlineColor}
        activeOutlineColor={palette.primary}
        onChangeText={handleChange("description")}
        placeholder="Build an E-Commerce Website about hand made furniture"
        label={
          <Text style={[styles.startDateLabel, styles.inputBackground]}>
            Description
          </Text>
        }
      />

      <View style={styles.addCategoryContainer}>
        <TextInput
          mode="outlined"
          maxLength={26}
          value={category}
          placeholder="Website"
          textColor={palette.text}
          onChangeText={setCategory}
          placeholderTextColor={palette.text}
          outlineColor={palette.hairlineColor}
          activeOutlineColor={palette.primary}
          style={[styles.input, styles.inputBackground]}
          label={
            <Text style={[styles.startDateLabel, styles.inputBackground]}>
              Add category
            </Text>
          }
        />

        <View style={styles.addCategoryButtonContainer}>
          <IconButton
            size={20}
            icon="plus"
            disabled={!category}
            iconColor={palette.background}
            style={styles.addCategoryButton}
            onPress={() => handleCategory(category)}
          />
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
        onPress={() => {}}
        style={styles.button}
        contentStyle={{ height: "100%" }}
      >
        Create a new task
      </Button>
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
    input: {
      height: 50,
      marginBottom: layout.gutter,
    },
    inputBackground: {
      backgroundColor: palette.input,
    },
    startDateLabel: {
      fontSize: fonts.size.default,
      fontFamily: fonts.variants.medium,
      color: isDarkMode ? palette.text : palette.hairlineColor,
    },
    startButtonWrapper: {
      alignItems: "center",
      flexDirection: "row",
      marginTop: layout.gutter / 2,
    },
    startButton: {
      borderRadius: layout.gutter / 3,
      backgroundColor: palette.input,
      marginRight: layout.gutter / 1.5,
    },
    startHour: {
      color: palette.text,
      fontSize: fonts.size.default,
      fontFamily: fonts.variants.medium,
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
