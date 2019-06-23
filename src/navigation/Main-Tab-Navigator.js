import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { TabBarIcon } from '../components';
import HomeScreen from '../screens/home';
import StudentScreen from '../screens/student'
import AccountScreen from '../screens/account';

import { defaultNavigationOptions } from '../constants/Styles';

const HomeStack = createStackNavigator({ HomeScreen }, { defaultNavigationOptions });

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home-circle${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  )
};

const StudentStack = createStackNavigator({ StudentScreen }, { defaultNavigationOptions });

StudentStack.navigationOptions = {
  tabBarLabel: 'Student List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list-${focused ? '' : '-outline'}`
          : 'md-list'
      }
    />
  )
};

const AccountStack = createStackNavigator({ AccountScreen }, { defaultNavigationOptions });

AccountStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-contact${focused ? '' : '-outline'}`
          : 'md-contact'
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  StudentStack,
  AccountStack
});
