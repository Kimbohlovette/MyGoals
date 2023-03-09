import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Home: undefined;
  Goals: { userId: string };
  AddGoal: undefined;
};

export type Props = BottomTabScreenProps<
  RootStackParamList,
  'Profile',
  'Goals',
  'AddGoal'
>;
export interface TodoType {
  id: number;
  text: string;
  done: boolean;
  goalId: number;
}

export interface GoalType {
  id: number;
  title: string;
  desc: string;
  done: boolean;
}
