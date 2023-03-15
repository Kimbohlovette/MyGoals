import React from 'react';
import { StyleSheet, View } from 'react-native';
import styles from '../styles/Styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodoForm } from './GoalPreview';
import { Success } from '../components/Success';
import GoalForm from '../components/GoalForm';

const Stack = createNativeStackNavigator();

const AddGoal = () => {
  return (
    <View style={{ ...styles.page, ...styles.screen, ..._styles.container }}>
      <Stack.Navigator>
        <Stack.Screen name="Add Goal Form" component={GoalForm} />
        <Stack.Screen name="Add Todo" component={TodoForm} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    </View>
  );
};

export default AddGoal;

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
});
