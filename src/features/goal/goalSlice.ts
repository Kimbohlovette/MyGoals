import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import db from '../../../fbConfig';
import { GoalType } from '../../types';
import { AppDispatch } from '../../store/store';

export interface InitialState {
  goals: GoalType[];
  addGoalStatus: 'idle' | 'loading' | 'fullfilled' | 'failed';
  fetchGoalsStatus: 'idle' | 'loading' | 'fullfilled' | 'failed';
}

const initialState: InitialState = {
  goals: [],
  addGoalStatus: 'idle',
  fetchGoalsStatus: 'idle',
};

// Asynchronous operations to store and firebase go here

export const addGoalAsync = createAsyncThunk(
  'goal/addAsync',
  async (goal: GoalType, dispatch) => {
    await addDoc(collection(db, 'goals'), goal)
      .then(res => {
        dispatch.dispatch(addGoal({ ...goal, id: res.id }));
      })
      .catch(error => {
        console.log(error);
      });
  },
);

export const deleteGoalAsync = createAsyncThunk(
  'goals/delete',
  async (goalId: string, dispatch) => {
    const docRef = doc(db, goalId);
    await deleteDoc(docRef)
      .then(() => {
        dispatch.dispatch(dropGoal(goalId));
        // @TODO delete all todos with goalId
        console.log('Delete goal success!');
      })
      .catch(error => {
        console.log(error);
      });
  },
);

export const updateGoalAsync = createAsyncThunk(
  'goals/update',
  async (goal: { id: string; status: boolean }, dispatch) => {
    const docRef = doc(db, goal.id);
    await updateDoc(docRef, {
      done: !goal.status,
    }).then(() => {
      dispatch.dispatch(toggleGoalState(goal.id));
    });
  },
);

export const fetchGoalsAsync = createAsyncThunk(
  'goals/fetchGoals',
  async (dispatch: AppDispatch) => {
    const docsRef = collection(db, 'goals');
    const docsSnapshot = await getDocs(docsRef);

    const goalsList: GoalType[] = [];

    docsSnapshot.forEach(document => {
      const data = document.data();

      const goal = {
        title: data.title,
        desc: data.desc,
        done: data.done,
        dateAdded: data.dateAdded,
        dueDate: data.dueDate,
        id: document.id,
      };
      goalsList.push(goal);
    });
    dispatch(updateGoals(goalsList));
  },
);
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
        state.goals = [...state.goals.filter(gl => gl.id !== id), goal];
      }
    },
    updateGoals: (state, action) => {
      state.goals = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addGoalAsync.pending, state => {
        state.addGoalStatus = 'loading';
      })
      .addCase(addGoalAsync.fulfilled, state => {
        state.addGoalStatus = 'idle';
      })
      .addCase(addGoalAsync.rejected, state => {
        state.addGoalStatus = 'failed';
      })
      .addCase(fetchGoalsAsync.pending, state => {
        state.fetchGoalsStatus = 'loading';
      })
      .addCase(fetchGoalsAsync.fulfilled, state => {
        state.fetchGoalsStatus = 'idle';
      })
      .addCase(fetchGoalsAsync.rejected, state => {
        state.fetchGoalsStatus = 'failed';
      });
  },
});

export default goalSlice.reducer;
export const { addGoal, toggleGoalState, dropGoal, updateGoals } =
  goalSlice.actions;
