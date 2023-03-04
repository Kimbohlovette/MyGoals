import { createSlice } from '@reduxjs/toolkit';
import { TodoType } from '../../types';

export interface InitialState {
  todos: TodoType[];
}
const initialState: InitialState = {
  todos: [{ id: 1, text: 'Do pushups.', done: false, goalId: 1 }],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
});

export default todoSlice.reducer;
export const {} = todoSlice.actions;
