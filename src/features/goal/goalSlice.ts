import { createSlice } from '@reduxjs/toolkit';
import { GoalType } from '../../types';

export interface InitialState {
  goals: GoalType[];
}

const initialState: InitialState = {
  goals: [
    {
      id: 1,
      title: 'Daily Routine',
      desc: 'This is what to start each day with',
      done: true,
    },
  ],
};
export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
    dropGoal: (state, action) => {
      state.goals = state.goals.filter(goal => goal.id !== action.payload);
    },
    toggleGoalState: (state, action) => {
      const id = action.payload;
      const goal = state.goals.filter(gl => gl.id === id)[0];
      if (goal) {
        goal.done = true;
        state.goals = [...state.goals.filter(igoal => igoal.id !== id), goal];
      }
    },
  },
});

export default goalSlice.reducer;
export const { addGoal, toggleGoalState, dropGoal } = goalSlice.actions;
