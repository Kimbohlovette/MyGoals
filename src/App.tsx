/**
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from './pages/Home';
import Goals from './components/Goals';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import AddGoal from './pages/AddGoal';

// const Stack = createNativeStackNavigator();
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
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: props => (
              <View {...props}>
                <Icon name="home-sharp" size={props.size} color={props.color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="AddGoal"
          component={AddGoal}
          options={{
            tabBarIcon: props => (
              <View {...props}>
                <Icon name="add" size={props.size} color={props.color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Goals"
          component={Goals}
          options={{
            tabBarIcon: props => (
              <View {...props}>
                <Icon name="list" size={props.size} color={props.color} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
