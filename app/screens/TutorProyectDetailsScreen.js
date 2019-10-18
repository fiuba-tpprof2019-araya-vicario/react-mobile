import React from 'react';
import { Text, View , Button} from 'react-native';

export default class TutorProyectDetailsScreen extends React.Component {

  constructor(props) {
    super()
    this.state = {
      projectId:null,
    };
  }

  async componentDidMount() {
    const projectId = this.props.navigation.state.params.projectId
    this.setState({ projectId: projectId })
    console.log('this projectId:', this.projectId)

  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>TutorProyectDetailsScreen</Text>
       <Text>Detalles del proyecto: {this.state.projectId}</Text>
      </View>
      );
  }
}