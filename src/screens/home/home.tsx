import React, { Fragment, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Badge } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import dayjs from "dayjs";

import { Task } from "../../component/task";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";

export const HomeScreen: React.FC<RootTabScreenProps<"Home">> = ({}) => {
  const [tab, setTab] = useState("all");
  const { styles, palette } = useStyles();

  const tabs = [
    { label: "all", badge: 365 },
    { label: "open", badge: 35 },
    { label: "closed", badge: 19 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.schedule}>
        <View>
          <Text style={styles.title}>Today's Task</Text>
          <Text style={styles.subtitle}>{dayjs().format("dddd, DD MMMM")}</Text>
        </View>

        <Button
          icon="plus"
          uppercase={false}
          mode="contained-tonal"
          style={styles.button}
          textColor={palette.primary}
          contentStyle={{ height: "100%" }}
          onPress={() => console.log("Pressed")}
        >
          New Task
        </Button>
      </View>

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

      <Task
        id=""
        tags={[]}
        completed
        end_time={new Date()}
        start_time={new Date()}
        created_at={new Date()}
        updated_at={new Date()}
        title="Client Review & Feedback"
        description="Crypto Wallet Redesign"
      />
    </SafeAreaView>
  );
};

const useStyles = makeUseStyles(({ isDarkMode, palette, layout, fonts }) => ({
  container: {
    flex: 1,
    paddingTop: layout.gutter,
    paddingHorizontal: layout.gutter,
    backgroundColor: palette.homeBackground,
  },
  schedule: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: palette.text,
    fontSize: fonts.size.xlg,
    fontWeight: fonts.weight.bold,
  },
  subtitle: {
    marginTop: 3,
    color: palette.text,
    fontSize: fonts.size.md,
    opacity: isDarkMode ? 0.4 : 0.3,
  },
  button: {
    height: 40,
    borderRadius: layout.gutter / 1.5,
    backgroundColor: palette.primaryLight,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: layout.gutter * 2.5,
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
