import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type StackParamList = {
  Home: undefined;
  NewTask: undefined;
  Onboarding: undefined;
};

export type RootTabScreenProps<Screen extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, Screen>;
