import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Badge, AnimatedFAB } from "react-native-paper";
import {
  View,
  Text,
  FlatListProps,
  ListRenderItem,
  TouchableOpacity,
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
  const [isExtended, setIsExtended] = useState(false);
  const { data } = useSelector(({ task }: RootState) => task);
  const [isHeaderButtonVisible, setIsHeaderButtonVisible] = useState(false);

  const tabs = [
    { label: "all", badge: data.length },
    { label: "open", badge: data.filter(({ completed }) => !completed).length },
    {
      label: "closed",
      badge: data.filter(({ completed }) => completed).length,
    },
  ];

  const handleFAB = () => {
    if (!isExtended) {
      return setIsExtended(!isExtended);
    }

    navigation.navigate("Task");
  };

  const onScroll: FlatListProps<ITask>["onScroll"] = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent.contentOffset.y);

    if (!isHeaderButtonVisible && currentScrollPosition <= 10) {
      setIsHeaderButtonVisible(true);
      setIsExtended(false);
    }

    if (isHeaderButtonVisible && currentScrollPosition >= 150) {
      setIsHeaderButtonVisible(false);
    }
  };

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

  const renderItem: ListRenderItem<ITask> = ({ item }) => (
    <Task
      {...item}
      onPress={() => navigation.navigate("Task", { task: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.schedule}>
        <View>
          <Text style={styles.title}>Today's Task</Text>
          <Text style={styles.subtitle}>{dayjs().format("dddd, DD MMMM")}</Text>
        </View>

        {isHeaderButtonVisible && (
          <Button
            icon="plus"
            uppercase={false}
            mode="contained-tonal"
            style={styles.button}
            textColor={palette.primary}
            contentStyle={{ height: "100%" }}
            onPress={() => navigation.navigate("Task")}
          >
            New Task
          </Button>
        )}
      </View>

      <FlatList
        data={data}
        onScroll={onScroll}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />

      <AnimatedFAB
        icon="plus"
        color="white"
        label="New Task"
        uppercase={false}
        iconMode="dynamic"
        animateFrom="left"
        onPress={handleFAB}
        extended={isExtended}
        style={styles.fabStyle}
        visible={!isHeaderButtonVisible}
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
    fabStyle: {
      position: "absolute",
      right: layout.gutter,
      backgroundColor: palette.primary,
      bottom: edgeInsets.bottom + layout.gutter * 2,
    },
  })
);
