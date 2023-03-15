import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/Styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppDispatch } from '../store/hooks';
import { TodoType } from '../types';
import { addTodosToGoal } from '../features/goal/goalSlice';

const TodoForm = () => {
  const [todoText, setTodoText] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [visible, setModalVisibility] = useState(false);
  const formattedDate = date.toLocaleDateString();

  const dispatch = useAppDispatch();
  const handleSave = () => {
    const todo: TodoType = {
      text: todoText,
      dueDate: date.toString(),
      dateCreated: Date(),
      done: false,
      goalId: '',
    };
    dispatch(addTodosToGoal(todo));
    setModalVisibility(false);
  };

  function handleOnchange(currentDate: Date): void {
    setDate(currentDate);
    toggleDatePicker();
  }

  const toggleDatePicker = () => {
    setShow(!show);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setModalVisibility(false);
      }}
      animationType="slide"
      transparent={true}>
      <View style={_styles.modalContainer}>
        <View style={_styles.formContainer}>
          <Text style={_styles.formHeader}>Add a todo</Text>
          <TextInput
            style={{ ...styles.inputText }}
            value={todoText}
            onChangeText={text => setTodoText(text)}
            placeholder={'Enter sub-task here'}
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
                onChange={(event, pickedDate) =>
                  handleOnchange(pickedDate ? pickedDate : new Date())
                }
              />
            )}
          </View>
          <View style={_styles.btnGroup}>
            <Pressable
              style={{ ..._styles.button, ..._styles.cancelBtn }}
              onPress={() => {
                setModalVisibility(false);
              }}>
              <Text style={styles.buttonTextStyle}>CANCEL</Text>
            </Pressable>
            <Pressable
              style={{ ..._styles.button, ..._styles.saveBtn }}
              onPress={handleSave}>
              <Text style={styles.buttonTextStyle}>SAVE</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TodoForm;

const _styles = StyleSheet.create({
  input: {
    marginVertical: 16,
    width: '100%',
  },
  formContainer: {
    minHeight: '50%',
    backgroundColor: 'white',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 64,
  },
  modalContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formHeader: {
    fontSize: 24,
    marginBottom: 16,
    color: '#2c6fdb',
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    ...styles.buttonStyle,
  },
  cancelBtn: {
    marginRight: 4,
  },
  saveBtn: {
    marginLeft: 4,
  },
});
