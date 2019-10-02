import React, { Component } from 'react';
import {ScrollView,StyleSheet,Text,TextInput,Button,View,SafeAreaView,Picker} from 'react-native';
import Modal from 'react-native-modal';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import apiProvider from '../providers/apiProvider'
import COLORS from '../util/colors'
import { Badge } from 'react-native-elements'

export default class MyProyectScreen extends React.Component {

  students = [{name: 'Alumnos',id: 0,children: []}];
  tutors = [{name: 'Tutores',id: 1,children: []}];
  careers = [{name: 'Carreras',id: 2,children: []}];

  type_proyect = [{
    name: 'Tipo de Proyectos',
    id: 3,
    children: [
    {name: 'Trabajo Profesional',id: 1},
    {name: 'Tesis',id: 2},
    {name: 'Trabajo Practico',id: 3}
    ],
  }]

  state = {
    visibleModalId: null,
    selectedItems: [],
    selectedStudent: [],
    selectedTutor: [],
    selectedCarreer: [],
    selectedType: [],
    title:"",
    description:"",
    fileUrl:"",
    project:null,
  };

  async componentDidMount() {
    await this.getStudents();
    await this.getTutors();
    await this.getCareers();
    await this.updateProject();
    console.log('Students: ', this.students)

  };

  onProyectTypeSelect = (selectedType) => {
    console.log('selectedType',selectedType)
    this.setState({ selectedType });
  };
  onStudentSelect = (selectedStudent) => {
    console.log('selectedStudent',selectedStudent)
    this.setState({ selectedStudent });
  };
  onTutorSelect = (selectedTutor) => {
    console.log('selectedTutor',selectedTutor)
    this.setState({ selectedTutor });
  };
  onCarreerSelect = (selectedCarreer) => {
    console.log('selectedCarreer',selectedCarreer)
    this.setState({ selectedCarreer });
  };

  async updateProject(){
    const project = await apiProvider.getMyProject();
    this.setState({ project });
  }

  async _createUserSelector(collection,responseJson){
    // let responseJson = ;
    console.log('serverStudents: ', responseJson)

    let serverStudents = responseJson.data;
    console.log('serverStudents: ', serverStudents)
    for (var i = serverStudents.length - 1; i >= 0; i--) {
      collection[0].children.push({
        "name":serverStudents[i].name+" "+serverStudents[i].surname,
        "id":serverStudents[i].id
      })
    }
  }

  async getStudents() {
    return this._createUserSelector(this.students,await apiProvider.getStudents());
  }

  async getTutors() {
    return this._createUserSelector(this.tutors,await apiProvider.getTutors());
  }

  async getCareers() {
    let responseJson = await apiProvider.getCareers();
    let serverCareers = responseJson.data;
    for (var i = serverCareers.length - 1; i >= 0; i--) {
      this.careers[0].children.push({
        "name":serverCareers[i].name,
        "id":serverCareers[i].id
      })
    }
  }

  async createIdea(){
    let createResponse = await apiProvider.createIdea(this.state);
    console.log('createdIdea:',createResponse)
    this.setState({ visibleModal: null })
    await this.updateProject();
  }


  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };


  renderModalContent = () => (

    <ScrollView
    ref={ref => (this.scrollViewRef = ref)}
    onScroll={this.handleOnScroll}
    scrollEventThrottle={10}
    >

    <View style={styles.content}>
    <Text style={styles.title}>Crea un nuevo Proyecto 👋</Text>

    <Text style={styles.subTitle}>Titulo:</Text>
    <TextInput
    style={styles.titleInput}
    onChangeText={(title) => this.setState({title})}
    placeholder="Ingrese el titulo para tu idea"
    value={this.state.title}
    />

    <Text style={styles.subTitle}>Tipo de Proyecto:</Text>
    <SectionedMultiSelect
    items={this.type_proyect}
    uniqueKey="id"
    subKey="children"
    selectText="Tipo:"
    single="true"
    showDropDowns={false}
    readOnlyHeadings={true}
    onSelectedItemsChange={this.onProyectTypeSelect}
    selectedItems={this.state.selectedType}
    />

    <Text style={styles.subTitle}>Co Autores:</Text>
    <SectionedMultiSelect
    items={this.students}
    uniqueKey="id"
    subKey="children"
    style={styles.picker}
    colors={{primary: COLORS.primary}}
    selectText="Co Autores:"
    showDropDowns={false}
    readOnlyHeadings={true}
    onSelectedItemsChange={this.onStudentSelect}
    selectedItems={this.state.selectedStudent}
    />

    <Text style={styles.subTitle}>Tutor:</Text>
    <SectionedMultiSelect
    items={this.tutors}
    uniqueKey="id"
    subKey="children"
    style={styles.picker}
    colors={{primary: COLORS.primary}}
    selectText="Tutores:"
    showDropDowns={false}
    readOnlyHeadings={true}
    onSelectedItemsChange={this.onTutorSelect}
    selectedItems={this.state.selectedTutor}
    />

    <Text style={styles.subTitle}>Carreras:</Text>
    <SectionedMultiSelect
    items={this.careers}
    uniqueKey="id"
    subKey="children"
    style={styles.picker}
    colors={{primary: COLORS.primary}}
    selectText="Carreras:"
    showDropDowns={false}
    readOnlyHeadings={true}
    onSelectedItemsChange={this.onCarreerSelect}
    selectedItems={this.state.selectedCarreer}
    />

    <Text style={styles.subTitle}>Descripcion:</Text>
    <TextInput
    style={styles.descriptionInput}
    onChangeText={(description) => this.setState({description})}
    placeholder="Descrpcion de la idea"
    value={this.state.description}
    />                                                                        

    <Button
    onPress={() => {this.createIdea();}}
    title="Crear Proyecto"
    color={COLORS.primary}
    />

    </View>

    </ScrollView>

    );

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
      onPress={() => this.setState({ visibleModal: 'backdropPress' })}
      title="Crear Nuevo Proyecto"
      />
      <Modal
      isVisible={this.state.visibleModal === 'backdropPress'}
      onBackdropPress={() => this.setState({ visibleModal: null })}
      >
      {this.renderModalContent()}
      </Modal>

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
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  picker:{
    height: 50, 
    width: 200
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
  },
  
  titleInput: { height: 40, borderColor: 'gray', borderWidth: 0.5, marginBottom: 8, width:"80%" },
  descriptionInput: { width:"90%",height: 200, borderColor: 'gray', borderWidth: 0.5, marginBottom: 8 },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
  customBackdrop: {
    flex: 1,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
  },
});






