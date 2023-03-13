import db from '../../../fbConfig';
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { TodoType } from '../../types';

export const addTodoAsync = async (todo: TodoType) => {
  await addDoc(collection(db, 'todos'), todo);
};

export const deleteTodoAsync = async (todoId: string) => {
  const docRef = doc(db, 'todos/' + todoId);
  await deleteDoc(docRef);
};

export const updateTodoAsync = async ({
  id,
  status,
}: {
  id: string;
  status: boolean;
}) => {
  const docRef = doc(db, 'todos/' + id);
  await updateDoc(docRef, {
    done: !status,
  });
};

export const fetchTodosGoalIdAsync = async (goalId: string) => {
  const todosRef = collection(db, 'todos');

  const queryRes = query(todosRef, where('goalId', '==', goalId));
  const querySnapshot = await getDocs(queryRes);

  const todosList: TodoType[] = [];

  querySnapshot.forEach(document => {
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
  return todosList;
};
