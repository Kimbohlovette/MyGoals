import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Goal from '../features/goal/Goal';
import { useAppSelector } from '../store/hooks/index';
import styles from '../styles/Styles';

const Goals = () => {
  const goals = useAppSelector(state => state.goal.goals);
  const sortedGoals = goals.slice().sort((a, b) => {
    return +new Date(b.dateAdded) - +new Date(a.dateAdded);
  });
  const fetchStatus = useAppSelector(state => state.goal.fetchGoalsStatus);
  return (
    // <View>
    //   {goals.map((goal, key) => (
    //     <Goal goal={goal} key={key} />
    //   ))}
    // </View>
    <View style={styles.page}>
      <Text>{fetchStatus}</Text>
      <FlatList
        data={sortedGoals}
        renderItem={({ item }) => <Goal goal={item} />}
      />
    </View>
  );
};

export default Goals;
