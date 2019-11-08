import React from 'react';
import { Text, View , Button} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconWithBadge from '../components/IconWithBadge'
import MyProyectScreen from '../screens/MyProyectScreen'
import StartProyectScreen from '../screens/StartProyectScreen'
import RequestScreen from '../screens/RequestScreen'
import IdeasScreen from '../screens/IdeasScreen'



import TutorProyectDetailsScreen from '../screens/TutorProyectDetailsScreen'

import RequirementScreen from '../screens/RequirementScreen'
import RequestTutorScreen from '../screens/RequestTutorScreen'
import RequestCCScreen from '../screens/RequestCCScreen'

import ProfileScreen from '../screens/ProfileScreen'
import COLORS from '../util/colors'



const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={1} />;
};


const tabOptions ={
      activeTintColor: COLORS.primary,
      inactiveTintColor: 'gray',
    }

const defaultOptions= ({ navigation }) => ({
    

      // title: "Ovreride",
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Mi Proyecto') {
          iconName = `ios-document`;
          // IconComponent = HomeIconWithBadge;
        } 
        else if (routeName === 'Solicitudes') {
          iconName = `ios-archive`;
          IconComponent = HomeIconWithBadge;
        }

        else if (routeName === 'Tutorias') {
          iconName = `ios-school`;        
          IconComponent = HomeIconWithBadge;
        }

        else if (routeName === 'Ideas') {
          iconName = `ios-bulb`;
        }
        else if (routeName === 'Requer') {
          iconName = `ios-bookmarks`;
        }
        else if (routeName === 'Perfil') {
          iconName = `ios-contact`;
        }
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    })

const NavStudent = createAppContainer(
  createBottomTabNavigator(
  {
    'Mi Proyecto': MyProyectScreen,
    Solicitudes: RequestScreen,
    Ideas: IdeasScreen,
    Requer: RequirementScreen,
    Perfil: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultOptions,
    tabBarOptions: tabOptions,
  }
  )
);


const TutoriasStack = createStackNavigator({
  Tutorias: { screen: RequestTutorScreen},
  Detalles: { screen: TutorProyectDetailsScreen },

},
    //options
    {
      initialRouteName: 'Tutorias',
      headerMode: 'none',
      defaultNavigationOptions: ({ navigation }) => ({
        gesturesEnabled: true,
        headerMode: 'none'
      })
    }
);

const RequestCCStack = createStackNavigator({
  Tutorias: { screen: RequestCCScreen},
  Detalles: { screen: TutorProyectDetailsScreen },

},
    //options
    {
      initialRouteName: 'Tutorias',
      headerMode: 'none',
      defaultNavigationOptions: ({ navigation }) => ({
        gesturesEnabled: true,
        headerMode: 'none'
      })
    }
);




const NavTutor = createAppContainer(
  createBottomTabNavigator(
  {
    Tutorias: TutoriasStack,
    Ideas: IdeasScreen,
    Requer: RequirementScreen,
    Perfil: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultOptions,
    tabBarOptions: tabOptions,
  }
  )
);


const NavCC = createAppContainer(
  createBottomTabNavigator(
  {
    Tutorias: RequestCCScreen,
    Perfil: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultOptions,
    tabBarOptions: {
      activeTintColor: COLORS.primary,
    tabBarOptions: tabOptions,
    },
  }
  )
);



export {
  NavStudent,
  NavTutor,
  NavCC,
}


