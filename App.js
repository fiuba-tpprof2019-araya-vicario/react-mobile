import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';

import { StackNavigator } from 'react-navigation';

// import { TabNavigator, TabBarBottom, createStackNavigator } from 'react-navigation';
import { Button, Text, View } from 'react-native';

import HomeScreen from './app/screens/HomeScreen'
import TabNav from './app/screens/TabNav'
import SettingsScreen from './app/screens/SettingsScreen'
import LoginScreen from './app/screens/LoginScreen'
import CategoriesScreen from './app/screens/CategoriesScreen'
import ProposalScreen from './app/screens/ProposalScreen'

const RootStack = StackNavigator({
  Login: { screen: LoginScreen},
  Tabs: { screen: TabNav },
  Proposal: { screen: ProposalScreen }
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
    initialRouteName: 'Login',
  }
); 

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}

// export default TabNavigator({
//   HomeScreen: {
//     screen: HomeScreen,
//     navigationOptions: {
//       tabBarLabel: 'Inicio',
//       // tabBarIcon: ({ tintColor }) => <Icon name="view-headline" size={32} color={tintColor} />
//     },
//   },
//   NewProposal: {
//     screen: CategoriesScreen,
//     navigationOptions: {
//       tabBarLabel: 'Propuesta',
//       // tabBarIcon: ({ tintColor }) => <Icon name="add-box" size={32} color={tintColor} />
//     },
//   },
//   Info: {
//     screen: SettingsScreen,
//     navigationOptions: {
//       tabBarLabel: 'Settings',
//       // tabBarIcon: ({ tintColor }) => <Icon name="assignment" size={32} color={tintColor} />
//     },
//   },
// });