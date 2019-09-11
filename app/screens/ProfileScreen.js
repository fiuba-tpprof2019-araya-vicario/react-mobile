import React from 'react';
import { Text, View , Button} from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mi Perfil</Text>
      </View>
      );
  }
}