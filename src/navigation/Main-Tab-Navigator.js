import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import {TabBarIcon} from '../components';
import HomeScreen from '../screens/home';
import StudentScreen from '../screens/student'
import AccountScreen from '../screens/account';
import AddStudentScreen from '../screens/addStudent';
import StandardScreen from '../screens/standard';

import {defaultNavigationOptions} from '../constants/Styles';
import Colors from "../constants/Colors";

const HomeStack = createStackNavigator(
  {
    HomeScreen,
    StandardScreen
  },
  {defaultNavigationOptions}
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
  },
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  )
};

const StudentStack = createStackNavigator({StudentScreen}, {defaultNavigationOptions});

StudentStack.navigationOptions = {
  tabBarLabel: 'Student List',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
  },
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list`
          : 'md-list'
      }
    />
  )
};

const AddStudentStack = createStackNavigator({AddStudentScreen}, {defaultNavigationOptions});

AddStudentStack.navigationOptions = {
  tabBarLabel: 'Add Student',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
  },
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-add`
          : 'md-add'
      }
    />
  )
};

const AccountStack = createStackNavigator({AccountScreen}, {defaultNavigationOptions});

AccountStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
  },
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-contact`
          : 'md-contact'
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  StudentStack,
  AddStudentStack,
  AccountStack
});
