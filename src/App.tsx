/**
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from './pages/Home';
import Goals from './components/Goals';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Goals">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Goals" component={Goals} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({
//   topNavbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 24,
//     width: '100%',
//   },
//   appContainer: {
//     paddingHorizontal: 8,
//     backgroundColor: 'white',
//   },
// });
