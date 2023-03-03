import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import goalSlice from '../features/goal/goalSlice';
import todoSlice from '../features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    goal: goalSlice,
    todo: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
