import React, { useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { Button, AnimatedFAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatListProps, ListRenderItem } from "react-native";

import { Tab } from "../../component/tab";
import { Task } from "../../component/task";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";
import { RootState } from "../../providers/StoreProvider/store";
import { ITask } from "../../providers/StoreProvider/reducers/task/interfaces";

export const HomeScreen: React.FC<RootTabScreenProps<"Home">> = ({
  navigation,
}) => {
  const { styles, palette } = useStyles();
  const [isExtended, setIsExtended] = useState(false);
  const { data } = useSelector(({ task }: RootState) => task);
  const [isHeaderButtonVisible, setIsHeaderButtonVisible] = useState(true);

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

    if (
      !!data.length &&
      isHeaderButtonVisible &&
      currentScrollPosition >= 150
    ) {
      setIsHeaderButtonVisible(false);
    }

    if (!isExtended && currentScrollPosition >= 1000) {
      setIsExtended(true);
    } else if (isExtended && currentScrollPosition <= 1000) {
      setIsExtended(false);
    }
  };

  const ListHeaderComponent = <Tab tasks={data} />;

  const renderItem: ListRenderItem<ITask> = ({ item }) => <Task {...item} />;

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
        animateFrom="right"
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
