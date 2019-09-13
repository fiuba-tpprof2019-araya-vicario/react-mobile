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
import RequirementScreen from '../screens/RequirementScreen'
import ProfileScreen from '../screens/ProfileScreen'



const MyProyectStack = createStackNavigator({
  MyProyect: {
    screen:MyProyectScreen,
        navigationOptions: {
                  // title: "Main",
                  // headerMode: 'none',
                  header: null,
                  gesturesEnabled: true
                  },

  },
  StartProyect: StartProyectScreen,
});

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};



//'Mi Proyecto',Solicitudes ,Ideas,Requer,Perfil
export default createAppContainer(createBottomTabNavigator(
{
  'Mi Proyecto': MyProyectStack,
  Solicitudes: RequestScreen,
  Ideas: IdeasScreen,
  Requer: RequirementScreen,
  Perfil: ProfileScreen,
},

  //options
  {

                  // navigationOptions: {
                  // title: "Test",
                  // // headerMode: 'none',
                  // gesturesEnabled: true
                  // },

    defaultNavigationOptions: ({ navigation }) => ({
    

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
    }),

    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },

  }
  )
);



