import React from 'react';
import { View } from 'react-native';
import Goal from '../features/goal/Goal';
import { useAppSelector } from '../store/hooks/index';

const Goals = () => {
  const goals = useAppSelector(state => state.goal.goals);
  return (
    <View>
      {goals.map((goal, key) => (
        <Goal goal={goal} key={key} />
      ))}
    </View>
  );
};

export default Goals;
