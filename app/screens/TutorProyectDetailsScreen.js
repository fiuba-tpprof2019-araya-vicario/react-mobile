import apiProvider from '../providers/apiProvider'
import React, { Component } from 'react';
import {StyleSheet,Text,Button,View} from 'react-native';
import { Badge } from 'react-native-elements'
import COLORS from '../util/colors'

export default class TutorProyectDetailsScreen extends React.Component {

  constructor(props) {
    super()
    this.state = {
      project:null,
    };
  }

  async componentDidMount() {
    console.log('this componentDidMount:')
    const projectId = this.props.navigation.state.params.projectId;
    console.log('this projectId:', projectId)

    await this.updateProject(projectId);
    // this.setState({ user: userId })
    // this.setState({ projectId: projectId })


  };


  async updateProject(projectId){
    const project = await apiProvider.getProject(projectId);
    console.log('project: ', project)
    this.setState({ project });
  }




 renderProjectInfo(){
    console.log('renderProjectInfo: ', this.state)

     return (
      <View style={{ flex: 1 }}>
      {this.renderProjectState(this.state.project)}


        <View style={{ flex: 2, alignItems: 'flex-start' }}>
          <Text style={styles.subTitle}>{this.state.project.name}</Text>
          <Text style={styles.info}>{this.state.project.description}</Text>


          <Text style={styles.subTitle}>{'Autores:'}</Text>
          <Text style={styles.info}>
            {` - ${this.state.project.Creator.name} ${this.state.project.Creator.surname} (${this.state.project.Creator.email})`}
          </Text>
          {this.state.project.Students.map(student => 
            <Text style={styles.info}>
            {` - ${student.name} ${student.surname} (${student.email}) (${student.StudentRequests[0].status})`}
            </Text>)}
          
          <Text style={styles.subTitle}>{'Tutores:'}</Text>
          <Text style={styles.info}>
          {` - ${this.state.project.Tutor.name} ${this.state.project.Tutor.surname} (${this.state.project.Tutor.email} (${this.state.project.Tutor.TutorRequests[0].status})`}
          </Text>
          {this.state.project.Cotutors.map(cotutor =>
           <Text style={styles.info}>
           {` - ${cotutor.name} ${cotutor.surname} (${cotutor.email}) (${cotutor.TutorRequests[0].status})`}
           </Text>)}


          {this.state.project.proposal_url != null ? 
            (
              <View>
             <Text style={styles.subTitle}>
             Propuesta:
             </Text>
            <Text style={styles.info}>
            {this.state.project.proposal_url}
            </Text>
            </View>
             ) : null}




          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>

          {/*{(this.state.project.State.id <4) ? this.renderLeaveButton() : null}*/}

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



     render() {
    return (
      <View style={styles.container}>
      <Text>Detalles</Text>

       {this.state.project != null ? this.renderProjectInfo() : null}


      </View>
      );
  }







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


