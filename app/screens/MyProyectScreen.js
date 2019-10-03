import React, { Component } from 'react';
import {StyleSheet,Text,Button,View} from 'react-native';
import apiProvider from '../providers/apiProvider'
import COLORS from '../util/colors'
import CreateProjectModal from '../modals/CreateProjectModal'
import { Badge } from 'react-native-elements'

export default class MyProyectScreen extends React.Component {


  constructor(props) {
    super()
    this.createIdea = this.createIdea.bind(this);
    this.state = {
      fileUrl:"",
      project:null,
    };
  }
  

  async componentDidMount() {
    await this.getStudents();
    await this.getTutors();
    await this.getCareers();
    await this.updateProject();
  };

  async updateProject(){
    const project = await apiProvider.getMyProject();
    console.log('project: ', project)
    this.CreateProjectModal.close()
    this.setState({ project });
  }

  async getStudents() {
    return this.CreateProjectModal.updateStudents(await apiProvider.getStudents());
  }

  async getTutors() {
    return this.CreateProjectModal.updateTutors(await apiProvider.getTutors());
  }

  async getCareers() {
    return this.CreateProjectModal.updateCareers(await apiProvider.getCareers())
  }

  async createIdea(data){
    let createResponse = await apiProvider.createIdea(data);
    console.log('createdIdea:',createResponse)
    await this.updateProject();
  }

  renderProjectInfo() {
    const { project } = this.state;
    if (!project) {
      return null;
    }
    return(
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
                onPress={() => {this.createIdea();}}
                title="Abandonar idea"
                color='red'
              />
            </View>
            
            <Button
              onPress={() => {this.createIdea();}}
              title="Editar idea"
              color={COLORS.primary}
            />
          </View>
        </View>
      </View>
      )
  }

  renderCreateProject() {
    const { project } = this.state;
    if (project) {
      return null;
    }

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
      onPress={() => this.CreateProjectModal.show()}
      title="Crear Nuevo Proyecto"
      />
      <CreateProjectModal
        project={this.props.project}
        onSubmit={this.createIdea}
        ref={ref => (this.CreateProjectModal = ref)}
      />

      </View>
      )

  }


  render() {
    return (
      <View style={styles.container}>
      {this.renderProjectInfo()}
      {this.renderCreateProject()}
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






