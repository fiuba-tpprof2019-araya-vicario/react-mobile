import React from 'react';
import { Text, View , Button} from 'react-native';

export default class MyProyectScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Crear un nuevo Proyecto</Text>
      <Button
      title="Comenzar"
      onPress={() => this.props.navigation.navigate('StartProyect')}
      />
      </View>
      );
  }
}