import React from 'react';
import { Text, View , Button} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';


import config from '../config/config'

import storageProvider from '../providers/storageProvider'

export default class ProfileScreen extends React.Component {



  async componentDidMount() {
    this._configureGoogleSignIn();
  }


  _configureGoogleSignIn() {
  	console.log('config',config)
    GoogleSignin.configure(config.google);
  }


  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null, error: null });

      await storageProvider.clearStorage();
      this.props.navigation.navigate('Auth');
    } 
    catch (error) {
      this.setState({
        error,
      });
    }
  };


  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mi Perfil</Text>

      <Button onPress={this._signOut} title="Log out" />
      </View>
      );
  }




}