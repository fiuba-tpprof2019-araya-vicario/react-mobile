import React from 'react';
import { Button,StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import CardSection from '../components/CardSection'
import apiProvider from '../providers/apiProvider'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AcceptRequestModal from '../modals/AcceptRequestModal'
import RejectRequestModal from '../modals/RejectRequestModal'


import AcceptRequestProposalModal from '../modals/AcceptRequestProposalModal'

import COLORS from '../util/colors';

export default class RequestTutorScreen extends React.Component {

  constructor(props) {
    super()
    this.acceptRequest = this.acceptRequest.bind(this)
    this.rejectRequest = this.rejectRequest.bind(this)
    this.renderRequest = this.renderRequest.bind(this)

    this.acceptRequestProposal = this.acceptRequestProposal.bind(this)
    // this.rejectRequestProposal = this.rejectRequestProposal.bind(this)
    // this.renderRequestProposal = this.renderRequestProposal.bind(this)

    this.state = {
      requests:[],
      project:null,
      user: null
    };
  }

  async componentDidMount() {
    // const userId = await storageProvider.getUser()

    await this.getTutorRequests();
  };

  async getTutorRequests() {
    let response = await apiProvider.getTutorRequests();
    console.log('Response request ', response)
    this.setState({ requests: response.data })
  }

  async acceptRequest(requestId){
    let acceptResponse = await apiProvider.acceptTutorRequest(requestId);
    // storageProvider.storeCurrentProject(createResponse.data)
    console.log('acceptResponse:',acceptResponse)
    await this.getTutorRequests();
    this.AcceptRequestModal.close()
  }

  async rejectRequest(requestId){
    let rejectResponse = await apiProvider.rejectTutorRequest(requestId);
    // storageProvider.storeCurrentProject(createResponse.data)
    console.log('rejectResponse:',rejectResponse)
    await this.getTutorRequests();
    this.RejectRequestModal.close()
  }

  async acceptRequestProposal(requestId){
    let acceptResponse = await apiProvider.acceptTutorRequestProposal(requestId);
    // storageProvider.storeCurrentProject(createResponse.data)
    console.log('acceptResponse:',acceptResponse)
    await this.getTutorRequests();
    this.AcceptRequestProposalModal.close()
  }

  async rejectTutorRequestProposal(requestId){
    let rejectResponse = await apiProvider.rejectTutorRequest(requestId);
    // storageProvider.storeCurrentProject(createResponse.data)
    console.log('rejectResponse:',rejectResponse)
    await this.getTutorRequests();
    this.RejectRequestModal.close()
  }


  requestAccepted(request){
    return request.status == 'accepted'
  }
  requestRejected(request){
    return request.status == 'rejected'
  }
  requestPending(request){
    return request.status == 'pending'
  }

  proposalUploaded(request){
    console.log('proposalUploaded request',request.item)
    return request.item.Project.proposal_url!=null;
  }

  requestProposalAccepted(request){
    return request.accepted_proposal == 'accepted'
  }
  requestProposalRejected(request){
    return request.accepted_proposal == 'rejected'
  }
  requestProposalPending(request){
    return request.accepted_proposal == 'pending'
  }

  viewProjectDetails(request){
    this.props.navigation.navigate('Detalles', { projectId: request.Project.id })
  }




  renderHeader() {
    return (
      <View style={styles.header}>
      <Text style={styles.typeTitle}>Tipo</Text>
      <Text style={styles.projectTitle}>Proyecto</Text>
      <Text style={styles.statusTitle}>Estado</Text>

      <Text style={styles.typeTitle}></Text>
      
      </View> 
      );
  }


  renderRequestColaborationStatus(request){
    if(this.requestPending(request.item)){
      return(
        <View style={{ flex: 3, flexDirection:'row' }}>
        <TouchableOpacity style={{ flex: 1.5 }} 
        onPress={() => this.AcceptRequestModal.show(request.item.id)}
        >
        <Ionicons name='ios-checkmark' size={40} color='#22bb33' />
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1.5 }} 
        onPress={() => this.RejectRequestModal.show(request.item.id)}
        >
        <Ionicons name='ios-close' size={40} color='#bb2124' />
        </TouchableOpacity>
        </View> 
        )
    }
    else if(this.requestAccepted(request.item))
      return (<Text style={[styles.status, {color: COLORS.success}]}>Aceptada</Text>)
    else if(this.requestRejected(request.item))
      return (<Text style={[styles.status, {color: COLORS.danger}]}>Rechazada</Text>)
    else return null;
  }

  renderRequestProposalStatus(request){
    if(this.requestProposalPending(request.item)){
      return(
        <View style={{ flex: 3, flexDirection:'row' }}>
        <TouchableOpacity style={{ flex: 1.5 }} 
        onPress={() => this.AcceptRequestProposalModal.show(request.item.id)}
        >
        <Ionicons name='ios-checkmark' size={40} color='#22bb33' />
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1.5 }} 
        onPress={() => this.rejectTutorRequestProposal.show(request.item.id)}
        >
        <Ionicons name='ios-close' size={40} color='#bb2124' />
        </TouchableOpacity>
        </View> 
        )
    }
    else if(this.requestProposalAccepted(request.item))
      return (<Text style={[styles.status, {color: COLORS.success}]}>Aceptada</Text>)
    else if(this.requestProposalRejected(request.item))
      return (<Text style={[styles.status, {color: COLORS.danger}]}>Rechazada</Text>)
    else return null;
  }



  renderRequestColaboration(request){
    return (
      <View>
      <CardSection>
      <Text style={styles.type}>
      Tutoria
      </Text>
      <Text style={styles.project}>
      {request.item.Project.name}
      </Text>
      {this.renderRequestColaborationStatus(request)}
            <Button style={styles.type} onPress={() => this.viewProjectDetails(request.item)} title="Ver" />

      </CardSection>
      </View> 
      );
  }


  renderRequestProposal(request){
    return (
      <View>
      <CardSection>

      <Text style={styles.project}>
      Entrega Propuesta
      </Text>
      <Text style={styles.project}>
      {request.item.Project.name}
      </Text>
      {this.renderRequestProposalStatus(request)}
      <Button style={styles.type} onPress={() => this.viewProjectDetails(request.item)} title="Ver" />


      </CardSection>
      </View> 
      );
  }



  renderRequest(request) {
    if(!this.proposalUploaded(request))
      return (
        <View>
        <Text style={styles.project}>
        {/*Pedido de Colaboracion*/}
        </Text>
        {this.renderRequestColaboration(request)}
        </View>)
    else
      return(
        <View>
        <Text style={styles.project}>
        {/*Aceptacion de propuesta*/}
        </Text>

        {this.renderRequestProposal(request)}
        </View>
        )

  }

  keyExtractor = (request) => request.id;

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Text>Mis Solicitudes de Tutor</Text>
      <FlatList
      data={this.state.requests}
      ListHeaderComponent={this.renderHeader}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderRequest}
      />

      <AcceptRequestProposalModal
      onSubmit={this.acceptRequestProposal}
      ref={ref => (this.AcceptRequestProposalModal = ref)}
      />

      <AcceptRequestModal
      onSubmit={this.acceptRequest}
      ref={ref => (this.AcceptRequestModal = ref)}
      />
      <RejectRequestModal
      onSubmit={this.rejectRequest}
      ref={ref => (this.RejectRequestModal = ref)}
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