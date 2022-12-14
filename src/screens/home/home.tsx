import React, { useRef, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { Reminder } from "../../component/reminder";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";

export const HomeScreen: React.FC<RootTabScreenProps<"Home">> = ({}) => {
  const { styles } = useStyles();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [endTime, setEndTime] = useState("No Reminder");
  const [startTime, setStartTime] = useState("No Reminder");

  const closeModal = () => bottomSheetRef?.current?.close?.();
  const openModal = () => bottomSheetRef?.current?.present?.();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>

      <Button icon="camera" mode="contained" onPress={openModal}>
        Open
      </Button>

      <Reminder
        reminder={endTime}
        ref={bottomSheetRef}
        onClose={closeModal}
        setReminder={setEndTime}
        title="Set start reminder"
      />
    </View>
  );
};

const useStyles = makeUseStyles(({ palette, fonts, edgeInsets }) => ({
  container: {
    flex: 1,
    paddingBottom: edgeInsets.bottom,
    backgroundColor: palette.background,
  },
  text: {
    color: palette.text,
    fontSize: fonts.size.xxlg,
    fontWeight: fonts.weight.bold,
  },
}));
