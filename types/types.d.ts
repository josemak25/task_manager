import type { FlatListProps } from "react-native";

interface BasicError {
  error: any;
  data?: any;
  message: string;
}

export type ItemType = { id: string; label: string; value: any };

export type RenderItemProps = {
  label: string;
  fontSize: number;
  fontColor: string;
  textAlign: "center" | "auto" | "left" | "right" | "justify";
};

export interface IViuPickerProps {
  items: ItemType[];
  onChange: (item: { index: number; item: ItemType }) => void;
  initialSelectedIndex?: number;
  height?: number;
  width?: any;
  flatListProps?: Partial<FlatListProps<ItemType>>;
  backgroundColor?: string;
  renderItem?: (props: RenderItemProps) => JSX.Element;
  haptics?: boolean;
}

export interface IViuPickerState {
  selectedIndex: number;
  itemHeight: number;
  listHeight: number;
  data: ItemType[];
}
