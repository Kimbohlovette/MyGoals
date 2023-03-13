import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import styles from '../styles/Styles';
import { useAppDispatch, useAppSelector } from '../store/hooks/index';
import { addGoalAsync } from '../features/goal/goalSlice';

const AddGoal = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [titleInputBorderColorOnFocus, setTitleInputBorderOnFocus] =
    useState('lightgray');
  const [descInputBorderColorOnFocus, setDescInputBorderOnFocus] =
    useState('lightgray');
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
  const handleInputOnFocus = (
    dispatchFn: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    dispatchFn('#6ab6fc');
  };
  const handleInputOnBlur = (
    dispatchFn: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    dispatchFn('lightgray');
  };
  return (
    <View style={{ ...styles.page, ..._styles.container }}>
      <TextInput
        onBlur={() => {
          handleInputOnBlur(setTitleInputBorderOnFocus);
        }}
        onFocus={() => {
          handleInputOnFocus(setTitleInputBorderOnFocus);
        }}
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
        placeholder="Enter title"
        style={{
          ...styles.inputText,
          ..._styles.input,
          borderColor: titleInputBorderColorOnFocus,
        }}
        blurOnSubmit
      />
      <TextInput
        value={desc}
        onChangeText={text => {
          setDesc(text);
        }}
        placeholder="Describe your goal"
        style={{
          ...styles.inputText,
          ..._styles.input,
          borderColor: descInputBorderColorOnFocus,
        }}
        onBlur={() => {
          handleInputOnBlur(setDescInputBorderOnFocus);
        }}
        onFocus={() => {
          handleInputOnFocus(setDescInputBorderOnFocus);
        }}
      />
      <Pressable
        android_ripple={{ color: '#172852' }}
        android_disableSound={true}
        style={{ ...styles.buttonStyle }}
        onPress={handleSubmit}
        disabled={status === 'loading'}>
        <Text style={{ ...styles.buttonTextStyle }}>SAVE GOAL</Text>
      </Pressable>
    </View>
  );
};

export default AddGoal;

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  input: {
    marginVertical: 16,
  },
});
