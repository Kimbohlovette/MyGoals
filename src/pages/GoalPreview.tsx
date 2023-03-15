import React from 'react';
import { View, ScrollView, Text, Pressable, Button } from 'react-native';
import styles from '../styles/Styles';
import { useAppSelector } from '../store/hooks/index';
export const TodoForm = () => {
  const currentGoal = useAppSelector(state => state.goal.formData);

  const handleSubmit = () => {
    throw Error('Function not implemented!');
  };

  return (
    <ScrollView style={{ ...styles.page }}>
      <View>
        <Text>{currentGoal.goal?.title}</Text>
        <Text>{currentGoal.goal?.desc}</Text>
        <Text>{currentGoal.goal?.dueDate}</Text>
        <Text>Sub Tasks</Text>
        {currentGoal.todos.map((t, k) => (
          <Text key={k}>{t.text}</Text>
        ))}
        <Button title="ADD TODO" />
      </View>

      <Pressable onPress={handleSubmit} style={{ ...styles.buttonStyle }}>
        <Text style={styles.buttonTextStyle}>SUBMIT</Text>
      </Pressable>
    </ScrollView>
  );
};

export default TodoForm;
