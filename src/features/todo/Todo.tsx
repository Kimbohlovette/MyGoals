import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch } from '../../store/hooks/index';
import { toggleTodoState } from './todoSlice';
import { TodoType } from '../../types';

const Todo = (props: { todo: TodoType }) => {
  const dispatch = useAppDispatch();

  const [check, toggleCheck] = useState(props.todo.done);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.checkBox}>
          <Pressable
            android_ripple={{ color: 'lightgray' }}
            style={styles.checkBoxBtn}
            onPress={() => {
              toggleCheck(state => !state);
              dispatch(toggleTodoState(1));
            }}>
            {check && <MCIcon name="check" color={'green'} />}
          </Pressable>
        </View>
        <View>
          <Text>{props.todo.text}</Text>
        </View>
      </View>
      <Pressable android_ripple={{ color: 'lightgray' }} style={styles.menu}>
        <MCIcon name="dots-horizontal" size={20} />
      </Pressable>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    columnGap: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 28,
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 1,
    marginRight: 5,
    borderColor: '#b3b3b3',
  },
  checkBoxBtn: {
    flex: 1,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    padding: 2,
  },
});
