import React, { useState } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import styles from '../styles/Styles';
import { useAppSelector } from '../store/hooks/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

export const TodoForm = () => {
  const currentGoal = useAppSelector(state => state.goal.formData.goal);
  const [todoText, setTodoText] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [visible, setModalVisibility] = useState(false);

  const formattedDate = date.toLocaleDateString();

  function handleOnchange(currentDate: Date): void {
    setDate(currentDate);
    toggleDatePicker();
  }

  const toggleDatePicker = () => {
    setShow(!show);
  };

  const handleSubmit = () => {
    throw Error('Function not implemented!');
  };

  return (
    <ScrollView style={{ ...styles.page }}>
      <View>
        <Text>{currentGoal?.title}</Text>
        <Text>{currentGoal?.desc}</Text>
        <Text>{currentGoal?.dueDate}</Text>
        <Button title="ADD TODO" onPress={() => setModalVisibility(true)} />
      </View>
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
                style={_styles.button}
                onPress={() => {
                  setModalVisibility(false);
                }}>
                <Text style={styles.buttonTextStyle}>CANCEL</Text>
              </Pressable>
              <Pressable style={_styles.button}>
                <Text style={styles.buttonTextStyle}>SAVE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable onPress={handleSubmit} style={{ ...styles.buttonStyle }}>
        <Text style={styles.buttonTextStyle}>SUBMIT</Text>
      </Pressable>
    </ScrollView>
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
});
