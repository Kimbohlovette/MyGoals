import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import styles from '../styles/Styles';
import { useAppDispatch } from '../store/hooks/index';
import { addGoalAsync } from '../features/goal/goalSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const AddGoal = () => {
  return (
    <View style={{ ...styles.page, ..._styles.container }}>
      <Stack.Navigator>
        <Stack.Screen name="Add Goal Form" component={GoalForm} />
        <Stack.Screen name="Add Todo Form" component={TodoForm} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    </View>
  );
};

const GoalForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [titleInputBorderColorOnFocus, setTitleInputBorderOnFocus] =
    useState('lightgray');
  const [descInputBorderColorOnFocus, setDescInputBorderOnFocus] =
    useState('lightgray');

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = day + ' / ' + month + ' / ' + year;
  const toggleDatePicker = () => setShow(!show);
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
      <View style={_styles.datePickerContainer}>
        <TextInput
          style={{
            ...styles.inputText,
            ..._styles.input,
            ..._styles.datePickerInput,
          }}
          value={formattedDate}
        />
        <Pressable
          style={_styles.datePickerBtn}
          android_ripple={{ color: 'lightgray' }}
          onPress={toggleDatePicker}>
          <Icon name="calendar" size={30} color={'#6ab6fc'} />
        </Pressable>
        {show && <DateTimePicker mode={'date'} value={date} />}
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

const TodoForm = () => {
  return (
    <View>
      <Text>Todo Form</Text>
    </View>
  );
};

const Success = () => {
  return (
    <View>
      <Text>Success!</Text>
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
    width: '100%',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePickerInput: {
    width: '82%',
  },
  datePickerBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 8,
    padding: 8,
    width: '15%',
  },
});
