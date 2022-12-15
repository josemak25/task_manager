import React,{useState} from "react";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import {Ionicons} from '@expo/vector-icons'

import { makeUseStyles } from "../../helpers/makeUseStyles";
import { generateRandomColor } from "../../helpers/generateRandomColor";
import { ITask } from "../../providers/StoreProvider/reducers/task/interfaces";

const tags = [...Array(5)].map(generateRandomColor);

export const Task: React.FC<ITask> = ({ title, description, completed }) => {
  const { styles } = useStyles();
  const [checked, setChecked]=useState()

  return (
    <View style={styles.container}>
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

        <IconButton
          size={30}
          onPress={() => {}}
          icon=''
          style={styles.checkbox}
        />
      </View>

      <View style={styles.hr} />

      <View style={styles.timeContainer}>
        <View style={styles.time}>
          <Text style={styles.day}>Today</Text>
          <Text style={styles.timer}>10:00 PM - 11:45 PM</Text>
        </View>

        <View style={styles.tagsContainer}>
          {tags.slice(0, 2).map((backgroundColor, index) => (
            <View
              key={index}
              style={[
                styles.tag,
                { right: ++index * 20, backgroundColor, zIndex: -index },
              ]}
            />
          ))}
          <View style={[styles.tag, { right: 0 * 20 }]}>
            <Text style={styles.badge}>{`+${tags.length - 2}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const useStyles = makeUseStyles(({ fonts, isDarkMode, layout, palette }) => ({
  container: {
    borderRadius: layout.gutter,
    padding: layout.gutter * 2,
    marginBottom: layout.gutter * 2,
    backgroundColor: palette.taskBackground,
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
  checkbox:{
    color: palette.white,
    backgroundColor: palette.checked
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
  tagsContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  tag: {
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
