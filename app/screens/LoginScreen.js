import React from 'react';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet,Text, View , Button, Image} from 'react-native';
// Component for Splash Screen



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



export default class LoginScreen extends React.Component {
  render() {


    const {navigate} = this.props.navigation;

    return (
      <View style={styles.splash}>
      <Text style={styles.title}>Brain Search</Text>
      <Image  style={styles.image} source={require('../assets/home2.png')} />


      <View >

      <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}

      />
      </View>

{/*          onPress={this._signIn}
disabled={this.state.isSigninInProgress} */}


    <Button
    title="Ingresar Test" style={styles.button}
    onPress={() => navigate('Nav', {name: 'Jane'})}
    />


</View>
);
  }
}



