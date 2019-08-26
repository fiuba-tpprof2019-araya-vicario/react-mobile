import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
// import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { AsyncStorage } from "react-native"

export default class LoginScreen extends React.Component {


  componentWillMount () {
  // AccessToken.getCurrentAccessToken().then((data) => {
  //       if(data) {
  //         console.log(data.accessToken);
  //         this.goToHomePage(data.accessToken);
  //       }
  //   })
  }

  goToHomePage(token){
    this.storeItem(token);
    this.props.navigation.replace('Tabs');
  }

  async storeItem(token) {
    try {
        var jsonOfItem = await AsyncStorage.setItem('accessToken', token);
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }


  render() {

    const mainTitle = '@TuGobiernas2019';
    const secondTitle = 'Votar es un acto inteligente';
    const urlTitle = 'www.tugobiernas.com';

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, height: 300}}>
         <Image
          resizeMode="cover"
          style={{
            flex: 1,
            height: undefined, width: undefined
          }}
          source={require('../assets/information-intro.png')}
            />
        </View>
        <View style={{ flex: 1, marginTop: 20, alignItems: 'center' }}>
          <Text style={[styles.textStyle, styles.bold]}>TuGobiernas2019</Text>
           
       

           {/*<Button
           style={{}}
           fontWeight={'800'}
           borderRadius={40}
           backgroundColor={'#e8be58'}
           icon={{name: 'lock-open'}}
           title="Login"
           onPress={() => this.props.navigation.push('Tabs')}
          />*/}
        </View>
        <View style={{ marginTop: 20, alignItems: 'center' }}>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 ralewayFont: {
  fontFamily: 'Raleway',
  color: 'white',
  padding: 10,
 },
 bold: {
  fontWeight: '800',
 },
  textStyle: {
  fontSize: 25,
  color: '#787878',
  fontWeight: '500',
  textAlign: 'center',
  marginBottom: 15,
 },
  secondaryTextStyle: {
  marginTop: 20,
  fontSize: 20,
  color: '#ee275d',
  fontWeight: '500',
  textAlign: 'center',
 }
});