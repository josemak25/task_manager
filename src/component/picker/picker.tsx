import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Platform,
  FlatList,
  FlatListProps,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { adaptiveColor, setAlphaColor } from "./util";
import type {
  ItemType,
  IViuPickerProps,
  IViuPickerState,
  RenderItemProps,
} from "../../../types/types";
import fonts from "../../constants/fonts";
import { makeUseStyles } from "../../helpers/makeUseStyles";

export const Picker: React.FC<IViuPickerProps> = ({
  onChange,
  items = [],
  width = 150,
  height = 150,
  flatListProps,
  haptics = false,
  initialSelectedIndex,
  backgroundColor = "#fff",
}) => {
  const { styles } = useStyles();
  const userTouch = useRef(false);
  const flatListRef = useRef<FlatList<ItemType>>();
  const [state, setState] = useState<IViuPickerState>({
    data: [],
    itemHeight: 40,
    listHeight: 200,
    selectedIndex: 0,
  });

  const alphaBackgroundColor = setAlphaColor(backgroundColor, 1);

  const setStateData = () => {
    let { itemHeight, listHeight } = state;

    if (items?.length) {
      const additionalItem = { label: "", value: null };
      const data = [
        additionalItem,
        additionalItem,
        ...items,
        additionalItem,
        additionalItem,
      ] as ItemType[];

      if (height) {
        listHeight = height;
        itemHeight = listHeight / 5;
      }

      setState({ ...state, data, itemHeight, listHeight });
    }
  };

  const { data, itemHeight, listHeight, selectedIndex } = state;

  const gradientColor = (): string => {
    return Platform.select({
      ios: setAlphaColor(alphaBackgroundColor, 0.2),
      android: setAlphaColor(alphaBackgroundColor, 0.4),
      web: setAlphaColor(alphaBackgroundColor, 0.4),
    }) as string;
  };

  const gradientContainerStyle = () => {
    return [
      {
        height: 2 * itemHeight,
        // borderColor: selectedStyle?.borderColor
      },
      styles.gradientContainer,
    ];
  };

  const handleOnPressItem = (index: number) => {
    if (index >= 0 && index <= items.length - 1) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: index,
      });
    }
  };

  const onScroll: FlatListProps<ItemType>["onScroll"] = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
    const selectedIndex = Math.abs(index);

    if (selectedIndex >= 0 && selectedIndex <= items.length - 1) {
      if (haptics && userTouch && state.selectedIndex !== selectedIndex) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      setState({ ...state, selectedIndex });
    }
  };

  const getItemLayout: FlatListProps<ItemType>["getItemLayout"] = (
    _,
    index
  ) => {
    return {
      length: itemHeight,
      offset: index * itemHeight,
      index,
    };
  };

  const renderItem: FlatListProps<ItemType>["renderItem"] = (options) => {
    return PickerItem(
      options,
      selectedIndex,
      {
        ...styles.listItem,
        backgroundColor: alphaBackgroundColor,
        fontSize: itemHeight,
        height: itemHeight,
      },
      handleOnPressItem
    );
  };

  useEffect(() => {
    setStateData();
  }, []);

  return (
    <View
      style={{
        width,
        backgroundColor,
        height: listHeight,
      }}
    >
      <FlatList
        data={data}
        //@ts-ignore
        ref={flatListRef}
        decelerationRate={0}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onTouchStart={(e) => {
          userTouch.current = true;
          flatListProps?.onTouchStart?.(e);
        }}
        onScroll={onScroll}
        snapToInterval={itemHeight}
        getItemLayout={getItemLayout}
        initialScrollIndex={initialSelectedIndex}
        onMomentumScrollEnd={() => {
          onChange?.({ index: selectedIndex, item: items[selectedIndex] });
        }}
        {...flatListProps}
      />
      <View
        style={[
          gradientContainerStyle(),
          styles.topGradient,
          // { borderBottomWidth: selectedStyle?.borderWidth },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          style={styles.linearGradient}
          colors={[alphaBackgroundColor, gradientColor()]}
        />
      </View>
      <View
        style={[
          gradientContainerStyle(),
          styles.bottomGradient,
          // { borderTopWidth: selectedStyle?.borderWidth },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          style={styles.linearGradient}
          colors={[gradientColor(), alphaBackgroundColor]}
        />
      </View>
    </View>
  );
};

const Item = React.memo(({ label, fontColor, ...rest }: RenderItemProps) => (
  <Text
    style={{ color: fontColor, ...rest, fontFamily: fonts.variants.regular }}
  >
    {label}
  </Text>
));

const PickerItem = (
  { item, index }: any,
  indexSelected: number,
  style: any,
  onPress: (index: number) => void
) => {
  const gap = Math.abs(index - (indexSelected + 2));
  const sizeText = [style.fontSize, style.fontSize / 1.5, style.fontSize / 2];

  const fontSize = gap > 1 ? sizeText[2] : sizeText[gap];
  const fontColor = adaptiveColor(style.backgroundColor);
  const textAlign = "center";

  return (
    <TouchableOpacity
      style={style}
      activeOpacity={1}
      onPress={() => onPress(index - 2)}
    >
      <Item
        label={item.label}
        fontSize={fontSize}
        fontColor={fontColor}
        textAlign={textAlign}
      />
    </TouchableOpacity>
  );
};

const useStyles = makeUseStyles(({ fonts }) => ({
  listItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  gradientContainer: {
    position: "absolute",
    width: "100%",
  },
  linearGradient: { flex: 1 },
  topGradient: { top: 0 },
  bottomGradient: { bottom: 0 },
  text: {
    fontFamily: fonts.variants.regular,
  },
}));
