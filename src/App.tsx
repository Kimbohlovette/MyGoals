/**
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from './pages/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>

    // <SafeAreaView>
    //   <ScrollView style={styles.appContainer}>
    //     <Goals />
    //   </ScrollView>
    // </SafeAreaView>
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
