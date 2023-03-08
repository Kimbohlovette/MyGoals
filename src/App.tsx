/**
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from './pages/Home';
import Goals from './components/Goals';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddGoal from './components/AddGoal';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        initialRouteName="Goals"
        screenOptions={{
          headerStyle: { backgroundColor: '#059669' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShown: false,
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name="Goals" component={Goals} />
      </Stack.Navigator> */}
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <Icon name="home-sharp" size={30} />,
          }}
        />
        <Tab.Screen
          name="AddGoal"
          component={AddGoal}
          options={{
            tabBarIcon: () => <Icon name="add" size={40} />,
          }}
        />
        <Tab.Screen
          name="Goals"
          component={Goals}
          options={{
            tabBarIcon: () => <Icon name="list" size={30} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
