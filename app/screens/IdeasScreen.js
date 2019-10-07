import React from 'react';
import { Text, View , Button} from 'react-native';

import fileProvider from '../providers/fileProvider'
import apiProvider from '../providers/apiProvider'



export default class IdeasScreen extends React.Component {


 pickDocument = async () => {
 	let file = await fileProvider.pickDocument();
 	let response = await apiProvider.uploadDocument(file);
 	console.log(response);

 }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ideas</Text>
      <Button onPress={this.pickDocument} title="Elejir Documento" />
      </View>
      );
  }
}