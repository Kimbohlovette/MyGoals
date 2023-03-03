import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Goal from '../features/goal/Goal';

const Goals = () => {
  return (
    <View>
      <Text style={styles.headerText}>Your Goals</Text>
      <Goal />
      <Goal />
      <Goal />
    </View>
  );
};

export default Goals;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
  },
});
