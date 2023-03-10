import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Todo from '../todo/Todo';
import { useAppSelector, useAppDispatch } from '../../store/hooks/index';
import { GoalType } from '../../types';
import { deleteGoalAsync, updateGoalAsync } from './goalSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Goal = (props: { goal: GoalType }) => {
  const [checked, setCheckBox] = useState(props.goal.done);
  const [open, toggleDropdown] = useState(false);
  const deleteStatus = useAppSelector(state => state.goal.deleteGoalStatus);
  const handleTodosDropdown = () => {
    toggleDropdown(state => !state);
  };

  const dispatch = useAppDispatch();
  const handleCheck = () => {
    setCheckBox(state => !state);
    dispatch(
      updateGoalAsync({
        id: props.goal.id ? props.goal.id : '',
        status: props.goal.done,
      }),
    );
  };
  const handleDelete = (id: string) => {
    dispatch(deleteGoalAsync(id))
      .then(() => {
        console.log('Deleted!');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const todos = useAppSelector(state => state.todo.todos)
    .filter(todo => todo.goalId === props.goal.id)
    .sort((a, b) => (b.id ? b.id.length - a.goalId.length : 0));
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.subContainer}>
          <View style={styles.checkBox}>
            <Pressable
              onPress={handleCheck}
              style={styles.CheckBoxBtn}
              android_ripple={{ color: '#b3b3b3' }}>
              {checked && <MCIcon name="check" color="green" size={18} />}
            </Pressable>
          </View>

          <Text style={styles.goalTitle}>{props.goal.title}</Text>
        </View>
        <View style={styles.caretContainer}>
          <Pressable
            onPress={handleTodosDropdown}
            style={styles.caretButton}
            android_ripple={{ color: '#b3b3b3', borderless: false }}>
            {open ? (
              <MCIcon name="chevron-up" size={20} />
            ) : (
              <MCIcon name="chevron-down" size={20} />
            )}
          </Pressable>
        </View>
      </View>
      {open && (
        <View style={styles.todos}>
          <Text style={styles.TodosHeaderText}>Sub Tasks</Text>
          <Pressable
            disabled={deleteStatus === 'loading'}
            onPress={() => {
              handleDelete(props.goal.id ? props.goal.id : '');
            }}>
            <Icon name="delete" size={30} />
            <Text>{deleteStatus}</Text>
          </Pressable>
          <View>
            {todos.map((todo, key) => (
              <Todo todo={todo} key={key} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Goal;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginVertical: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBox: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 10,
    borderColor: '#b3b3b3',
    aspectRatio: 1,
    height: 36,
  },
  CheckBoxBtn: {
    flex: 1,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalTitle: {
    fontWeight: '400',
    color: '#222222',
    fontSize: 16,
  },
  caretContainer: {
    borderRadius: 60,
    overflow: 'hidden',
  },
  caretButton: {
    flex: 1,
    width: '100%',
    padding: 8,
  },
  todos: {
    paddingVertical: 16,
    paddingLeft: 48,
    paddingRight: 8,
  },
  TodosHeaderText: {
    color: 'black',
    paddingVertical: 8,
  },
});
