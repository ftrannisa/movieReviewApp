import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyReviewScreen, HomeScreen, ProfileScreen} from '../screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements'
import {colors} from '../utils/color';

const Tab = createBottomTabNavigator();

export default TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.default,
        inactiveTintColor: '#4e4e4e',
        activeBackgroundColor:"black",
        inactiveBackgroundColor: 'black',
        style: {
          borderTopWidth: 0,
          borderTopColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
          paddingVertical: 6,
          backgroundColor: 'black'
}
      }}>
      <Tab.Screen
        name="My Review"
        component={MyReviewScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon type="material-community"
                  name="forum"
                  size={25}
                  color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon type="material-community"
                  name="home"
                  size={25}
                  color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon type="material-community"
                  name="account"
                  size={25}
                  color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
