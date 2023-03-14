import React from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import styles from '../styles/Styles';
import { useAppSelector } from '../store/hooks/index';

export const TodoForm = () => {
  const currentGoal = useAppSelector(state => state.goal.formData.goal);

  return (
    <ScrollView style={{ ...styles.page }}>
      <View>
        <Text>{currentGoal?.title}</Text>
        <Text>{currentGoal?.desc}</Text>
        <Text>{currentGoal?.dueDate}</Text>
      </View>
      <View>
        <TextInput
          style={{ ...styles.inputText }}
          placeholder={'Enter sub-task here'}
        />
        <TextInput style={{ ...styles.inputText }} />
      </View>
    </ScrollView>
  );
};

export default TodoForm;
