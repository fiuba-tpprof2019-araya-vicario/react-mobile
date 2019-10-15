import React, { Component } from 'react';
import {StyleSheet,Text,Button,View} from 'react-native';
import { Badge } from 'react-native-elements'
import COLORS from '../util/colors'

import UploadProjectModal from '../modals/UploadProjectModal'
import DeleteProjectModal from '../modals/DeleteProjectModal'

import apiProvider from '../providers/apiProvider'
import storageProvider from '../providers/storageProvider'
import fileProvider from '../providers/fileProvider'


export default class MyProyectScreen extends React.Component {

  constructor(props) {
    super()
    this.createIdea = this.createIdea.bind(this);
    this.editIdea = this.editIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.state = {
      fileUrl:"",
      project:null,
      user: null
    };
  }

  async componentDidMount() {
    const userId = await storageProvider.getUser()
    await this.updateProject();
    this.setState({ user: userId })
  };

  async updateProject(){
    const project = await apiProvider.getMyProject();
    console.log('project: ', project)
    this.UploadProjectModal.updateData(project)
    this.setState({ project });
  }

  async createIdea(data){
    let createResponse = await apiProvider.createIdea(data);
    storageProvider.storeCurrentProject(createResponse.data)
    console.log('createdIdea:',createResponse)
    await this.updateProject();
    this.UploadProjectModal.close()
  }

  async editIdea(data){
    let editResponse = await apiProvider.editIdea(data, this.state.project.id);
    console.log('editIdea:', editResponse)
    await this.updateProject();
    this.UploadProjectModal.close()
  }

  async deleteIdea(){
    let deleteResponse = await apiProvider.deleteIdea(this.state.project.id);
    storageProvider.clearCurrentProject()
    console.log('deleteIdea:', deleteResponse)
    await this.updateProject();
    this.DeleteProjectModal.close()

  }


  async pickDocument(){
     let file = await fileProvider.pickDocument();
     let response = await apiProvider.uploadDocument(file);
     console.log(response);
   }


  renderProjectInfo(){
    console.log('renderProjectInfo: ', this.state)

     return (
      <View style={{ flex: 1 }}>
      {this.renderProjectState(this.state.project)}

      {(this.state.project.State.id == 2) ? this.renderUploadProposal() : null}


        <View style={{ flex: 2, alignItems: 'flex-start' }}>
          <Text style={styles.subTitle}>{this.state.project.name}</Text>
          <Text style={styles.info}>{this.state.project.description}</Text>

          <Text style={styles.subTitle}>{'Autores:'}</Text>
          <Text style={styles.info}>{` - ${this.state.project.Creator.name} ${this.state.project.Creator.surname} (${this.state.project.Creator.email})`}</Text>
          {this.state.project.Students.map(student => <Text style={styles.info}>{` - ${student.name} ${student.surname} (${student.email})`}</Text>)}
          
          <Text style={styles.subTitle}>{'Tutores:'}</Text>
          <Text style={styles.info}>{` - ${this.state.project.Tutor.name} ${this.state.project.Tutor.surname} (${this.state.project.Tutor.email})`}</Text>
          {this.state.project.Cotutors.map(cotutor => <Text style={styles.info}>{` - ${cotutor.name} ${cotutor.surname} (${cotutor.email})`}</Text>)}

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>

          {(this.state.project.State.id <4) ? this.renderLeaveButton() : null}

          {(this.state.project.Creator.id == this.state.user && this.state.project.State.id <3) ? this.renderEditButton() : null}
          </View>
        </View>
      </View>
      )   

  }



    renderProjectState = (project) =>(

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Badge
            style={{marginBottom: 12}}
            value={project.State.id}
            status="success"
            badgeStyle={{ height: 66, width: 66, borderRadius: 90 }}
            textStyle={{fontSize: 24}}
          />
          <Text style={styles.title}>{project.State.name}</Text>
        </View>

   )


  renderLeaveButton = () =>
  (

            <View style={{ marginRight: 8 }}>
              <Button
                onPress={() => this.DeleteProjectModal.show()}
                title="Abandonar idea"
                color='red'
              />
            </View>


    )


  renderEditButton = () =>
    (
      <Button
        onPress={() => this.UploadProjectModal.show({ editMode: true })}
        title="Editar idea"
        color={COLORS.primary}
      />
    )


  renderUploadProposal=() =>(    
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={this.pickDocument} 
      title="Subir Propuesta" 
      color='green'
      />
      </View>
  )


     
  renderCreateProject = () =>
    (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
      onPress={() => this.UploadProjectModal.show({ editMode: false })}
      title="Crear Nuevo Proyecto"
      />
      </View>
    )


  render() {
    console.log('Render: ', this.state)
    return (
      <View style={styles.container}>

        {this.state.project != null ? this.renderProjectInfo() : this.renderCreateProject()}

        <UploadProjectModal
          onCreate={this.createIdea}
          onEdit={this.editIdea}
          ref={ref => (this.UploadProjectModal = ref)}
        />

        <DeleteProjectModal
          onSubmit={this.deleteIdea}
          ref={ref => (this.DeleteProjectModal = ref)}
        />
      </View>
      );
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 12,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  info: {
    fontSize: 12,
    marginBottom: 8,
  }
});






