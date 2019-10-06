import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './app/screens/LoginScreen'
import {NavStudent,NavTutor,NavCC} from './app/screens/Nav'

console.disableYellowBox = true;

const navigationOptions=({ navigation }) => ({
                      // title: "Inside Nav",
                      // const { routeName } = navigation.state;
                      title: "Brain Search",
                })

const NavStudentStack = createStackNavigator({ NavStudent:
                { 
                screen: NavStudent,     
                navigationOptions: navigationOptions,
                }
    });


const NavTutorStack = createStackNavigator({ NavTutor:
                 { 
                screen: NavTutor,     
                navigationOptions: navigationOptions,
                } 
    });

const NavCCStack = createStackNavigator({ NavCC:
                 { 
                screen: NavCC,     
                navigationOptions: navigationOptions,
                } 
    });

const AuthStack = createStackNavigator({ SignIn: 
                { screen: LoginScreen,     
                  navigationOptions: {
                  title: "Brain Search",
                  }
                } 
    });



export default createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoading: AuthLoadingScreen,
      NavStudent: NavStudentStack,
      NavTutor:NavTutorStack,
      NavCC:NavCCStack,
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