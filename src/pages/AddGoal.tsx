import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from '../styles/Styles';
import { useAppDispatch, useAppSelector } from '../store/hooks/index';
import { addGoalAsync } from '../features/goal/goalSlice';

const AddGoal = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.goal.addGoalStatus);
  const handleSubmit = () => {
    dispatch(
      addGoalAsync({
        title: title,
        desc: desc,
        done: false,
        dateAdded: Date(),
        dueDate: 'April 01, 2023',
      }),
    );
  };
  return (
    <View style={{ ...styles.page, ..._styles.container }}>
      <Text>AddGoal</Text>
      <TextInput
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
        placeholder="Enter title"
        style={{ ...styles.inputText, ..._styles.input }}
      />
      <TextInput
        value={desc}
        onChangeText={text => {
          setDesc(text);
        }}
        placeholder="Describe your goal"
        style={{ ...styles.inputText, ..._styles.input }}
      />
      <Button
        title="Add goal"
        onPress={handleSubmit}
        disabled={status === 'loading'}
      />
      {status === 'loading' && <Text>Create goal in progress...</Text>}
      {status === 'failed' && <Text>Failed to create goal. Try again</Text>}
      {status === 'idle' && <Text>Ready</Text>}
    </View>
  );
};

export default AddGoal;

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 12,
  },
});
