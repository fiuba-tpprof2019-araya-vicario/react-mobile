import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './app/screens/LoginScreen'
import Nav from './app/screens/Nav'


const NavStack = createStackNavigator({ Nav:
                { screen: Nav,     
                  navigationOptions: {
                  title: "Main",
                  headerMode: 'none',
                  header: null,
                  }
                } 

  });
const AuthStack = createStackNavigator({ SignIn: 
                { screen: LoginScreen,     
                  navigationOptions: {
                  title: "Login",
                  headerMode: 'none',
                  header: null,
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