import db from '../../../fbConfig';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
} from 'firebase/firestore';
import { TodoType } from '../../types';
import { AppDispatch } from '../../store/store';

export interface InitialState {
  todos: TodoType[];
}
const initialState: InitialState = {
  todos: [],
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
    updateTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const addTodoAsync = createAsyncThunk(
  'todo/create',
  async (todo: TodoType, dispatch) => {
    await addDoc(collection(db, 'todos'), todo)
      .then(res => {
        dispatch.dispatch(addTodo({ ...todo, id: res.id }));
        console.log('Goal added!');
      })
      .catch(error => {
        console.log(error);
      });
  },
);

export const deleteTodoAsync = createAsyncThunk(
  'goals/delete',
  async (todoId: string, dispatch) => {
    const docRef = doc(db, 'todos/' + todoId);
    await deleteDoc(docRef)
      .then(() => {
        dispatch.dispatch(dropTodo(todoId));
        // @TODO delete all todos with goalId
        console.log('Delete todo success!');
      })
      .catch(error => {
        console.log(error);
      });
  },
);

export const updateTodoAsync = createAsyncThunk(
  'todo/update',
  async (todo: { id: string; status: boolean }, dispatch) => {
    const docRef = doc(db, 'todos/' + todo.id);
    await updateDoc(docRef, {
      done: !todo.status,
    }).then(() => {
      dispatch.dispatch(toggleTodoState(todo.id));
    });
  },
);

export const fetchTodosAsync = createAsyncThunk(
  'todos/fetch',
  async (dispatch: AppDispatch) => {
    const docsRef = collection(db, 'todos');
    const docsSnapshot = await getDocs(docsRef);

    const todosList: TodoType[] = [];

    docsSnapshot.forEach(document => {
      const data = document.data();

      const todo: TodoType = {
        text: data.text,
        done: data.done,
        dateCreated: data.dateAdded,
        dueDate: data.dueDate,
        id: document.id,
        goalId: data.goalId,
      };
      todosList.push(todo);
    });
    dispatch(updateTodos(todosList));
  },
);

export default todoSlice.reducer;
export const { addTodo, toggleTodoState, dropTodo, updateTodos } =
  todoSlice.actions;
