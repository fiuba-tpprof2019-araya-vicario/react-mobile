import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import CardSection from '../components/CardSection'
import apiProvider from '../providers/apiProvider'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AcceptRequestModal from '../modals/AcceptRequestModal'
import RejectRequestModal from '../modals/RejectRequestModal'
import COLORS from '../util/colors';
import storageProvider from '../providers/storageProvider';
import Global from './Global';

export default class RequestScreen extends React.Component {

  constructor(props) {
    super()
    this.acceptRequest = this.acceptRequest.bind(this)
    this.rejectRequest = this.rejectRequest.bind(this)
    this.renderRequest = this.renderRequest.bind(this)
    this.state = {
      requests:[],
      project:null,
      user: null
    };
  }

  async componentDidMount() {
    // const userId = await storageProvider.getUser()

    await this.getStudentRequests();
  };

  async getStudentRequests() {
    let response = await apiProvider.getStudentRequests();
    console.log('Response request ', response)
    this.setState({ requests: response.data })
  }

  async acceptRequest(request){
    let acceptResponse;
    if(request.Project.state_id == 1) acceptResponse = await apiProvider.acceptStudentRequest(request.id);
    else acceptResponse = await apiProvider.acceptProposalStudentRequest(request.id);
    // storageProvider.storeCurrentProject(createResponse.data)
    console.log('acceptResponse:',acceptResponse)
    await this.getStudentRequests();
    await storageProvider.storeCurrentProject(acceptResponse.data.Project.id)
    await this.updateProject();
    this.AcceptRequestModal.close()
  }

  async updateProject(){
    const project = await apiProvider.getMyProject();
    Global.myProjectScreen.setState({ project });
  }

  async rejectRequest(request){
    let rejectResponse;
    if(request.Project.state_id == 1) rejectResponse = await apiProvider.rejectStudentRequest(request.id);
    else rejectResponse = await apiProvider.rejectProposalStudentRequest(request.id);
    // storageProvider.storeCurrentProject(createResponse.data)
    console.log('rejectResponse:',rejectResponse)
    await this.getStudentRequests();
    this.RejectRequestModal.close()
  }

  keyExtractor = (request) => request.id;

  renderHeader() {
    return (
      <View style={styles.header}>
          <Text style={styles.typeTitle}>Tipo</Text>
          <Text style={styles.creatorTitle}>Autor</Text>
          <Text style={styles.projectTitle}>Proyecto</Text>
          <Text style={{ flex: 3 }}></Text>
      </View> 
    );
  }
  // INIT_IDEA: 1,
  // PENDING_DOC: 2,
  // PENDING_REV: 3,
  // PENDING_PRES: 4,
  // PENDING_PUB: 5,
  // PUBLISH: 6
  requestAccepted(request){
    return (request.status == 'accepted' && request.Project.state_id == 1) || (request.accepted_proposal == 'accepted');
  }

  requestRejected(request){
    return (request.status == 'rejected' && request.Project.state_id == 1) || (request.accepted_proposal == 'rejected');
  }

  requestPending(request){
    return request.status == 'pending' || (request.accepted_proposal == 'pending' && request.Project.state_id == 2);
  }

  renderRequest(request) {
    console.log('render request: ', request)
    return (
      <View>
        <CardSection>
          <Text style={styles.type}>
            {request.item.Project.Type.name}
          </Text>
          <Text style={styles.creator}>
            {`${request.item.Project.Creator.name} ${request.item.Project.Creator.surname}`}
          </Text>
          <Text style={styles.project}>
            {request.item.Project.name}
          </Text>
          {this.requestPending(request.item) ?
          <View style={{ flex: 3 }}>
            <TouchableOpacity style={{ flex: 1.5, paddingLeft: 12 }} 
              onPress={() => this.AcceptRequestModal.show(request.item)}
            >
              <Ionicons name='ios-checkmark' size={40} color='#22bb33' />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1.5 }} 
              onPress={() => this.RejectRequestModal.show(request.item)}
            >
              <Ionicons name='ios-close' size={40} color='#bb2124' />
            </TouchableOpacity>
          </View> :
          this.requestAccepted(request.item) ?
          <Text style={[styles.status, {color: COLORS.success}]}>Aceptada</Text> :
          <Text style={[styles.status, {color: COLORS.danger}]}>Rechazada</Text>
        }
        </CardSection>
      </View> 
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Text>Mis Solicitudes</Text>
      <FlatList
        data={this.state.requests}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderRequest}
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
    paddingLeft: 12,
    flex: 4
  },
  typeTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 12,
    flex: 4
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 12,
    flex: 4
  },
  creator: {
    fontSize: 12,
    paddingLeft: 12,
    flex: 4
  },
  type: {
    fontSize: 12,
    paddingLeft: 12,
    flex: 4
  },
  project: {
    fontSize: 12,
    paddingLeft: 12,
    flex: 4
  },
  status: {
    fontSize: 12,
    paddingLeft: 12,
    flex: 3
  }
})