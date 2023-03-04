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
