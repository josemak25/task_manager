import { NavigationProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ITask } from "../src/providers/StoreProvider/reducers/task/interfaces";

export type StackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Task: { task?: ITask | null } | undefined;
};

export type RootTabScreenProps<Screen extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, Screen>;

export type StackNavigationProps = NavigationProp<StackParamList>;
