import React, { Fragment, useState } from "react";
import { Button, Badge } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import dayjs from "dayjs";

import { Task } from "../../component/task";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";
import { RootState } from "../../providers/StoreProvider/store";
import { ITask } from "../../providers/StoreProvider/reducers/task/interfaces";

export const HomeScreen: React.FC<RootTabScreenProps<"Home">> = ({
  navigation,
}) => {
  const [tab, setTab] = useState("all");
  const { styles, palette } = useStyles();
  const { data } = useSelector(({ task }: RootState) => task);

  const tabs = [
    { label: "all", badge: data.length },
    { label: "open", badge: data.filter(({ completed }) => !completed).length },
    {
      label: "closed",
      badge: data.filter(({ completed }) => completed).length,
    },
  ];

  const ListHeaderComponent = (
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

  const renderItem: ListRenderItem<ITask> = ({ item }) => <Task {...item} />;

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
          onPress={() => navigation.navigate("NewTask")}
        >
          New Task
        </Button>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </SafeAreaView>
  );
};

const useStyles = makeUseStyles(
  ({ isDarkMode, palette, layout, edgeInsets, fonts }) => ({
    container: {
      flex: 1,
      paddingTop: layout.gutter,
      paddingHorizontal: layout.gutter,
      backgroundColor: palette.homeBackground,
    },
    contentContainerStyle: {
      flexGrow: 1,
      paddingBottom: edgeInsets.bottom + layout.gutter,
    },
    schedule: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: layout.gutter * 1.5,
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
  })
);
