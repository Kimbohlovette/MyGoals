import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import goalSlice from '../features/goal/goalSlice';

export const store = configureStore({
  reducer: {
    goal: goalSlice,
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
