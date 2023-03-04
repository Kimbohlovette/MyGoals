import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Goal from '../features/goal/Goal';
import { useAppSelector } from '../store/hooks/index';

const Goals = () => {
  const goals = useAppSelector(state => state.goal.goals);
  return (
    <View>
      <Text style={styles.headerText}>Your Goals</Text>
      {goals.map((goal, key) => (
        <Goal goal={goal} key={key} />
      ))}
    </View>
  );
};

export default Goals;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
    marginVertical: 20,
  },
});
