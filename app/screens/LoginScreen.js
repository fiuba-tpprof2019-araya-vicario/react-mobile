import React ,{ Component } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet,Text, View , Button, Image, Alert} from 'react-native';

import config from '../config/config'
import tokenProvider from '../providers/tokenProvider'
import apiProvider from '../providers/apiProvider'



export default class LoginScreen extends Component{

  state = {
    userInfo: null,
    error: null,
  };

  async componentDidMount() {
    GoogleSignin.configure(config.google);
    await this.getLoggedInUser();
  }


  async getLoggedInUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo, error: null });
      await this.loginToServer(userInfo);
      this.goToHomePage(userInfo);
    } 
    catch (error) {
      if(error.code != statusCodes.SIGN_IN_REQUIRED){
            this.setState({
        error: new Error( error.message),
      });
      }
    }
  }

  async loginToServer(userInfo) {
      let responseJson = await apiProvider.login(userInfo);
      console.log('response from Seba Server:',responseJson);
      this.goToHomePage(responseJson.token)
}

  goToHomePage(token){
    tokenProvider.storeToken(token);
    this.props.navigation.navigate('Nav', {name: 'Chelo'})
  }



  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo, error: null });
      this.loginToServer(userInfo);
      this.goToHomePage(userInfo);
    } 
    catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('cancelled');
      } 
      else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('in progress');
      } 
      else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } 
      else {
        Alert.alert('Something went wrong', error.toString());
        console.error('error',error.toString())
        this.setState({
          error,
        });
      }
    }
  };



  render() {
    const { userInfo } = this.state;

    const body = userInfo ? this.renderUserInfo(userInfo) : this.renderSignInButton();

    return (
      <View style={styles.splash}>
      <Image  style={styles.image} source={require('../assets/home2.png')} />


      {/*          onPress={this._signIn}
      disabled={this.state.isSigninInProgress} */}


     <View style={[styles.container, { flex: 1 }]}>
        {/*{this.renderIsSignedIn()}*/}
        {/*{this.renderGetCurrentUser()}*/}
        {/*{this.renderGetTokens()}*/}
        {body}
      </View>

      {/*  <Button
        title="Ingresar Test" style={styles.button}
        onPress={ () => this.loginToServer(userInfo)}
        />*/}

        {/*    () => navigate('Nav', {name: 'Chelo'})*/}

      {/*  {this.renderError()}*/}

    </View>
    );
  }


  renderIsSignedIn() {
    return (
      <Button
        onPress={async () => {
          const isSignedIn = await GoogleSignin.isSignedIn();
          Alert.alert(String(isSignedIn));
        }}
        title="is user signed in?"
      />
    );
  }

  renderGetCurrentUser() {
    return (
      <Button
        onPress={async () => {
          const userInfo = await GoogleSignin.getCurrentUser();
          Alert.alert('current user', userInfo ? JSON.stringify(userInfo.user) : 'null');
        }}
        title="get current user"
      />
    );
  }


  renderSignInButton() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 212, height: 48,marginTop:100 }}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Auto}
          onPress={this.signIn}
        />
        {this.renderError()}
      </View>
    );
  }


  renderGetTokens() {
    return (
      <Button
        onPress={async () => {
          const isSignedIn = await GoogleSignin.getTokens();
          Alert.alert('tokens', JSON.stringify(isSignedIn));
        }}
        title="get tokens"
      />
    );
  }

  renderUserInfo(userInfo) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
          Welcome {userInfo.user.name}
        </Text>
        {/*<Text>Your user info: {JSON.stringify(userInfo.user)}</Text>*/}

        <Button onPress={this._signOut} title="Log out" />
        {this.renderError()}
      </View>
    );
  }




  renderError() {
    const { error } = this.state;
    if (!error) {
      return null;
    }
    const text = `${error.toString()} ${error.code ? error.code : ''}`;
    return <Text>{text}</Text>;
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
  },
  googleButton:{
    paddingTop:50
  }

});




