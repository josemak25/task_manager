import { useRef } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";

type UseOnLayoutReturnType = [
  React.MutableRefObject<LayoutRectangle | undefined>,
  (event: LayoutChangeEvent) => void
];

export const useOnLayout = (): UseOnLayoutReturnType => {
  const ref = useRef<LayoutRectangle>();

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    ref.current = nativeEvent.layout;
  };

  return [ref, onLayout];
};
