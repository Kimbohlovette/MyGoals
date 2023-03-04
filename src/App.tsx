/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the Redux TypeScript template
 * https://github.com/rahsheen/react-native-template-redux-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Goals from './components/Goals';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView>
        <View style={styles.topNavbar}>
          <MIcon name="chevron-left" size={30} />
          <MCIcon name="dots-horizontal" size={30} />
        </View>
        <ScrollView style={styles.appContainer}>
          <Goals />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  topNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 24,
    width: '100%',
  },
  appContainer: {
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
});
