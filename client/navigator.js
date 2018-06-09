import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import AuthLoadingScreen from './screens/auth_loading';
import HomeScreen from './screens/home';
import HeartScreen from './screens/heart';
import WriteScreen from './screens/write';
import SearchScreen from './screens/search';
import ProfileScreen from './screens/profile';
import SignInScreen from './screens/signin';
import SignUpScreen from './screens/signup';
import DetailScreen from './screens/components/postDetail';

import { Theme } from './config';

const noHeader = {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }};

const AuthStack = createStackNavigator({ SignIn: SignInScreen }, noHeader);
const AuthStack2 = createStackNavigator({ SignUp: SignUpScreen });
const HomeStack = createStackNavigator({ Home: HomeScreen });
const SearchStack = createStackNavigator({ Search: SearchScreen });
const WriteStack = createStackNavigator({ Write: WriteScreen });
const HeartStack = createStackNavigator({ Heart: HeartScreen });
const ProfileStack = createStackNavigator({ Profile: ProfileScreen, PostDetail: DetailScreen });

const RootStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Write: WriteStack,
    Heart: HeartStack,
    Profile: ProfileStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Profile':
            iconName = `ios-person${focused ? '' : '-outline'}`;
            break;
          case 'Home':
            iconName = `ios-home${focused ? '' : '-outline'}`;
            break;
          case 'Search':
            iconName = `ios-search${focused ? '' : '-outline'}`;
            break;
          case 'Write':
            iconName = `ios-add-circle${focused ? '' : '-outline'}`;
            break;
          case 'Heart':
            iconName = `ios-heart${focused ? '' : '-outline'}`;
            break;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Theme.tintColor,
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack,
    SignUp: AuthStack2,
    Profile: ProfileScreen,
    PostDetail: DetailScreen
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default AppNavigator;