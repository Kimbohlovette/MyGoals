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
  text: string;
  done: boolean;
  goalId: number;
  id?: string;
  dateCreated?: string;
  dueDate?: string;
}

export interface GoalType {
  title: string;
  desc: string;
  done: boolean;
  id?: string;
  dateAdded?: string;
}
