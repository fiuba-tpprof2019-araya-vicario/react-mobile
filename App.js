import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './app/screens/LoginScreen'
import Nav from './app/screens/Nav'


const NavStack = createStackNavigator({ Nav:
                { screen: Nav,     

                navigationOptions: ({ navigation }) => ({
                      // title: "Inside Nav",
                      // const { routeName } = navigation.state;
                      title: "Brain Search",
                }),
                  // navigationOptions: {
                  // title: "Brain Search",
                  // // headerMode: 'none',
                  // // header: null,
                  // },

                   defaultNavigationOptions: ({ navigation }) => ({
                      // title: "Inside Nav",
                      // const { routeName } = navigation.state;
                      // title: "Brain Search:"+navigation.state.routeName,
                })
                } 

    });
const AuthStack = createStackNavigator({ SignIn: 
                { screen: LoginScreen,     
                  navigationOptions: {
                  title: "Brain Search",
                  // headerMode: 'none',
                  // header: null,
                  }
                } 

    });

export default createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoading: AuthLoadingScreen,
      Nav: NavStack,
      Auth: AuthStack,
    },

    //options
    {
      initialRouteName: 'Auth',
      headerMode: 'none',
      defaultNavigationOptions: ({ navigation }) => ({
        gesturesEnabled: true,
        headerMode: 'none'
      })
    }
  )
);