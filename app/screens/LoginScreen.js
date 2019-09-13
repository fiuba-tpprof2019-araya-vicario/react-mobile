import React from 'react';

// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet,Text, View , Button, Image, Alert} from 'react-native';
// Component for Splash Screen







export default class LoginScreen extends React.Component {



  state = {
    userInfo: null,
    error: null,
  };

  async componentDidMount() {
    this._configureGoogleSignIn();
    await this._getCurrentUser();
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: '942857236809-2qjq91t6661aqo83kfraeffcdb10dg42.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }

  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo, error: null });
    } catch (error) {
      const errorMessage =
      error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }

    _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo, error: null });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };



  render() {


    const {navigate} = this.props.navigation;

    return (
      <View style={styles.splash}>
    {/*<Text style={styles.title}>Brain Search</Text>*/}
    <Image  style={styles.image} source={require('../assets/home2.png')} />


    <View >

    <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}

    />
    </View>

{/*          onPress={this._signIn}
disabled={this.state.isSigninInProgress} */}


<Button
title="Ingresar Test" style={styles.button}
onPress={() => navigate('Nav', {name: 'Chelo'})}
/>


</View>
);
  }
}


const styles = StyleSheet.create({
  splash: {
    flex: 1,
    flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center'
      },
      title:{
    // alignSelf: 'flex-start'
  },
  image:{
    width:'100%',
    height:90
  },
  button:{
    height:10
  }

});




