import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/Styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveGoal } from '../features/goal/goalSlice';
import { GoalType } from '../types';
import { useAppDispatch } from '../store/hooks';

export const GoalForm = ({ navigation }: { navigation: any }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [titleInputBorderColorOnFocus, setTitleInputBorderOnFocus] =
    useState('lightgray');
  const [descInputBorderColorOnFocus, setDescInputBorderOnFocus] =
    useState('lightgray');

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const formattedDate = date.toLocaleDateString();
  const toggleDatePicker = () => setShow(!show);
  const handleSubmit = () => {
    // dispatch(
    //   addGoalAsync({
    //     title: title,
    //     desc: desc,
    //     done: false,
    //     dateAdded: Date(),
    //     dueDate: 'April 01, 2023',
    //   }),
    // );
    const goal: GoalType = {
      title: title,
      desc: desc,
      dateAdded: Date(),
      dueDate: date.toDateString(),
      done: false,
    };
    dispatch(saveGoal(goal));
    navigation.navigate('Add Todo');
  };
  const handleOnchange = (currentDate: Date) => {
    setDate(currentDate);
    toggleDatePicker();
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
    <View style={styles.page}>
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
      <View style={styles.datePickerContainer}>
        <TextInput
          style={{
            ...styles.inputText,
            ..._styles.input,
            ...styles.datePickerInput,
          }}
          value={formattedDate}
          editable={false}
        />
        <Pressable
          style={styles.datePickerBtn}
          android_ripple={{ color: 'lightgray' }}
          onPress={toggleDatePicker}>
          <Icon name="calendar" size={30} color={'#6ab6fc'} />
        </Pressable>
        {show && (
          <DateTimePicker
            mode={'date'}
            value={date}
            onChange={(e, d) => handleOnchange(d ? d : new Date())}
          />
        )}
      </View>
      <Pressable
        android_ripple={{ color: '#172852' }}
        android_disableSound={true}
        style={{ ...styles.buttonStyle }}
        onPress={handleSubmit}>
        <Text style={{ ...styles.buttonTextStyle }}>SAVE & CONTINUE</Text>
      </Pressable>
    </View>
  );
};

export default GoalForm;

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  input: {
    marginVertical: 16,
    width: '100%',
  },
});
