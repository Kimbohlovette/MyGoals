import React from 'react';
import { FlatList, View } from 'react-native';
import Goal from '../features/goal/Goal';
import { useAppSelector } from '../store/hooks/index';
import styles from '../styles/Styles';

const Goals = () => {
  const goals = useAppSelector(state => state.goal.goals);
  return (
    // <View>
    //   {goals.map((goal, key) => (
    //     <Goal goal={goal} key={key} />
    //   ))}
    // </View>
    <View style={styles.page}>
      <FlatList data={goals} renderItem={({ item }) => <Goal goal={item} />} />
    </View>
  );
};

export default Goals;
