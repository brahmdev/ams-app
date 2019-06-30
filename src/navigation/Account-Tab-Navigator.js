import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import { TabBarIcon } from '../components';
import PersonalDetailScreen from '../screens/personalDetails';
import AccountOverviewScreen from '../screens/accountOverview';
import SettingScreen from '../screens/setting';

import { defaultNavigationOptions } from '../constants/Styles';

const withUserParams = (WrappedComponent) => {
    return class extends React.Component {
        static router = WrappedComponent.router;
        render() {
            const { navigation } = this.props;
            const { user, onGoBack } = navigation.state.params;
            const screenProps = { user, onGoBack };

            return <WrappedComponent navigation={navigation} screenProps={screenProps} />;
        }
    }
};

const AccountOverviewStack = createStackNavigator({ AccountOverviewScreen }, { defaultNavigationOptions });
const PersonalDetailStack = createStackNavigator({ PersonalDetailScreen }, { defaultNavigationOptions });
const ParentDetailStack = createStackNavigator({ SettingScreen }, { defaultNavigationOptions });

export default createBottomTabNavigator({
    AccountOverView: {
        screen: withUserParams(AccountOverviewStack),
        navigationOptions: () => ({
            tabBarLabel: 'Overview',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={
                        Platform.OS === 'ios'
                            ? `ios-apps${focused ? '' : '-outline'}`
                            : 'md-apps'
                    }
                />
            )
        })
    },
    PersonalDetails: {
        screen: withUserParams(PersonalDetailStack),
        navigationOptions: () => ({
            tabBarLabel: 'Personal Details',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={
                        Platform.OS === 'ios'
                            ? `ios-person${focused ? '' : '-outline'}`
                            : 'md-person'
                    }
                />
            )
        })
    },
    /*ParentDetails: {
        screen: withUserParams(ParentDetailStack),
        navigationOptions: () => ({
            tabBarLabel: 'Parent Details',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={
                        Platform.OS === 'ios'
                            ? `ios-contacts${focused ? '' : '-outline'}`
                            : 'md-contacts'
                    }
                />
            )
        })
    }*/
});
