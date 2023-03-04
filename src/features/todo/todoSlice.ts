import { createSlice } from '@reduxjs/toolkit';
import { TodoType } from '../../types';

export interface InitialState {
  todos: TodoType[];
}
const initialState: InitialState = {
  todos: [{ id: 2, text: 'Do pushups.', done: true, goalId: 1 }],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    toggleTodoState: (state, action) => {
      const id = action.payload;
      const todo = state.todos.filter(t => t.id === id)[0];
      if (todo) {
        todo.done = !todo.done;
        state.todos = [...state.todos.filter(t => t.id !== id), todo];
      }
    },
    dropTodo: (state, action) => {
      state.todos = [...state.todos.filter(todo => todo.id !== action.payload)];
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, toggleTodoState, dropTodo } = todoSlice.actions;
