import React, { Component } from 'react';
import {StyleSheet,Text,Button,View} from 'react-native';
import { Badge } from 'react-native-elements'
import COLORS from '../util/colors'

import UploadProjectModal from '../modals/UploadProjectModal'
import DeleteProjectModal from '../modals/DeleteProjectModal'

import apiProvider from '../providers/apiProvider'
import storageProvider from '../providers/storageProvider'

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

  renderProjectInfo = (project) =>
    (
      <View style={{ flex: 1 }}>
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
        <View style={{ flex: 2, alignItems: 'flex-start' }}>
          <Text style={styles.subTitle}>{project.name}</Text>
          <Text style={styles.info}>{project.description}</Text>

          <Text style={styles.subTitle}>{'Autores:'}</Text>
          <Text style={styles.info}>{` - ${project.Creator.name} ${project.Creator.surname} (${project.Creator.email})`}</Text>
          {project.Students.map(student => <Text style={styles.info}>{` - ${student.name} ${student.surname} (${student.email})`}</Text>)}
          
          <Text style={styles.subTitle}>{'Tutores:'}</Text>
          <Text style={styles.info}>{` - ${project.Tutor.name} ${project.Tutor.surname} (${project.Tutor.email})`}</Text>
          {project.Cotutors.map(cotutor => <Text style={styles.info}>{` - ${cotutor.name} ${cotutor.surname} (${cotutor.email})`}</Text>)}

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <View style={{ marginRight: 8 }}>
              <Button
                onPress={() => this.DeleteProjectModal.show()}
                title="Abandonar idea"
                color='red'
              />
            </View>
            
            {(this.state.project.Creator.id == this.state.user) ? <Button
              onPress={() => this.UploadProjectModal.show({ editMode: true })}
              title="Editar idea"
              color={COLORS.primary}
            /> : null}
          </View>
        </View>
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
      {this.state.project != null ? this.renderProjectInfo(this.state.project) : this.renderCreateProject()}
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






