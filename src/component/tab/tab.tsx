import React, { Fragment, useState } from "react";
import { Badge } from "react-native-paper";
import { View, Text, TouchableOpacity } from "react-native";

import { makeUseStyles } from "../../helpers/makeUseStyles";
import { ITask } from "../../providers/StoreProvider/reducers/task/interfaces";

export const Tab: React.FC<{ tasks: ITask[] }> = ({ tasks }) => {
  const { styles } = useStyles();
  const [tab, setTab] = useState("all");

  const tabs = [
    { label: "all", badge: tasks.length },
    {
      label: "open",
      badge: tasks.filter(({ completed }) => !completed).length,
    },
    {
      label: "closed",
      badge: tasks.filter(({ completed }) => completed).length,
    },
  ];

  return (
    <View style={styles.listContainer}>
      {tabs.map(({ badge, label }, index) => (
        <Fragment key={label}>
          <TouchableOpacity style={styles.list} onPress={() => setTab(label)}>
            <Text
              style={[
                styles.listItem,
                tab === label && styles.selectedListItem,
              ]}
            >
              {label}
            </Text>
            <Badge
              style={[styles.badge, tab === label && styles.selectedBadge]}
            >
              {badge}
            </Badge>
          </TouchableOpacity>
          {!index && <View style={styles.vertical} />}
        </Fragment>
      ))}
    </View>
  );
};

const useStyles = makeUseStyles(({ isDarkMode, palette, layout, fonts }) => ({
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: layout.gutter,
    marginBottom: layout.gutter * 2.5,
  },
  list: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: layout.gutter * 2,
    paddingVertical: layout.gutter / 2,
  },
  listItem: {
    color: palette.text,
    fontSize: fonts.size.md,
    textTransform: "capitalize",
    fontWeight: fonts.weight.semi,
    opacity: isDarkMode ? 0.4 : 0.3,
  },
  selectedListItem: {
    opacity: 1,
    color: palette.primary,
    fontWeight: fonts.weight.bold,
  },
  badge: {
    color: palette.white,
    marginLeft: layout.gutter / 2,
    backgroundColor: palette.hairlineColor,
  },
  selectedBadge: {
    backgroundColor: palette.primary,
  },
  vertical: {
    width: 2,
    height: "50%",
    borderRadius: 2,
    marginRight: layout.gutter * 2,
    backgroundColor: palette.hairlineColor,
  },
}));
