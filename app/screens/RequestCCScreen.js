import React from 'react';
import { Button,StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import CardSection from '../components/CardSection'
import apiProvider from '../providers/apiProvider'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AcceptRequestModal from '../modals/AcceptRequestModal'
import RejectRequestModal from '../modals/RejectRequestModal'


import AcceptRequestProposalModal from '../modals/AcceptRequestProposalModal'

import COLORS from '../util/colors';

export default class RequestCCScreen extends React.Component {

  constructor(props) {
    super()
    this.viewProjectDetails = this.viewProjectDetails.bind(this)
    this.renderRequest= this.renderRequest.bind(this)



    this.state = {
      requests:[],
      project:null,
      user: null
    };
  }

  async componentDidMount() {
    // const userId = await storageProvider.getUser()
    await this.getCCRequests();
  };



  async getCCRequests() {
    let response = await apiProvider.getProjectsOfCC();
    // console.log('Response request ', response)
    this.setState({ requests: response.data })
  };



  renderHeader() {
    return (
      <View style={styles.header}>
      <Text style={styles.typeTitle}>Tipo</Text>
      <Text style={styles.projectTitle}>Proyecto</Text>
      <Text style={styles.typeTitle}>Ver</Text>
      </View> 
      );
  };

  viewProjectDetails (request){
    this.props.navigation.navigate('DetallesCC', { projectId: request.id })
  };



  renderRequest(request) {
    return (
      <View>
      <CardSection>
      <Text style={styles.type}>
      Pendiente Aprobacion CC
      </Text>
      <Text style={styles.project}>
      {request.item.name}
      </Text>
      <Button style={styles.type} onPress={() => this.viewProjectDetails(request.item)} title="Ver" />

      </CardSection>
      </View> 
      );

  }

  keyExtractor = (request) => request.id;

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Text>Mis Solicitudes de CC</Text>
      <FlatList
      data={this.state.requests}
      ListHeaderComponent={this.renderHeader}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderRequest}
      />
      </View>
      );
  }


}




const styles = StyleSheet.create({
  header: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  creatorTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 0,
    flex: 1
  },
  typeTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 0,
    flex: 1
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 0,
    flex: 2
  },

  statusTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 0,
    flex: 3
  },

  type: {
    fontSize: 12,
    paddingLeft: 0,
    flex: 1
  },

  project: {
    fontSize: 12,
    paddingLeft: 0,
    flex: 2
  },
  status: {
    fontSize: 12,
    paddingLeft: 0,
    flex:  3,

  }
})