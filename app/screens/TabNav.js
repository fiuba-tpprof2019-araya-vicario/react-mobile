import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';

// import { StackNavigator } from 'react-navigation';

import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Button, Text, View } from 'react-native';

import HomeScreen from './HomeScreen'
import SettingsScreen from './SettingsScreen'
import CategoriesScreen from './CategoriesScreen'

export default TabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Inicio',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor} />
    },
  },
  NewProposal: {
    screen: CategoriesScreen,
    navigationOptions: {
      tabBarLabel: 'Propuesta',
      tabBarIcon: ({ tintColor }) => <Icon name="add-location" size={30} color={tintColor} />
    },
  },
  Info: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Info',
      tabBarIcon: ({ tintColor }) => <Icon name="info" size={30} color={tintColor} />
    },
  },
},
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    // tabBarOptions: {
    //   activeTintColor: '#f2f2f2',
    //   activeBackgroundColor: "#2EC4B6",
    //   inactiveTintColor: '#666',
    //   indicatorStyle: {
    //     backgroundColor: 'transparent'
    //   },
    //   labelStyle: {
    //     fontSize: 12,
    //     padding: 12
    //   }
    // }
    tabBarOptions: {
      tintColor: '#fff',
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey',
      showIcon: true,
      showLabel: true,
      lazyLoad: true,
      upperCaseLabel: false,
      indicatorStyle: {
        backgroundColor: 'transparent'
      },
      style: {
        backgroundColor: '#eee',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1
      }
    }
  }
);