import React from 'react';
import { Text, View , Button} from 'react-native';

export default class RequestScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mis Solicitudes</Text>
      </View>
      );
  }
}