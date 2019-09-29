
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  SafeAreaView,Picker
} from 'react-native';

import Modal from 'react-native-modal';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import apiProvider from '../providers/apiProvider'





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
    fileUrl:""
  };

  async componentDidMount() {
    await this.getStudents();
    await this.getTutors();
    await this.getCareers();
  }

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

  async _createUserSelector(collection,responseJson){
    // let responseJson = ;
    let serverStudents = responseJson.data;
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
  }




  renderModalContent = () => (

    <ScrollView
    ref={ref => (this.scrollViewRef = ref)}
    onScroll={this.handleOnScroll}
    scrollEventThrottle={10}
    >


    <View style={styles.content}>
    <Text style={styles.contentTitle}>Crea un nuevo Proyecto 👋</Text>



    <Text>Titulo:</Text>
    <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 0.5 }}
    onChangeText={(title) => this.setState({title})}
    placeholder="Ingrese el titulo para tu idea"
    value={this.state.title}
    />

    <Text>Tipo de Proyecto:</Text>
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



    <Text>Co Autores:</Text>
    <SectionedMultiSelect
    items={this.students}
    uniqueKey="id"
    subKey="children"
    style={styles.picker}
    selectText="Co Autores:"
    showDropDowns={false}
    readOnlyHeadings={true}
    onSelectedItemsChange={this.onStudentSelect}
    selectedItems={this.state.selectedStudent}
    />


    <Text>Tutor:</Text>
    <SectionedMultiSelect
    items={this.tutors}
    uniqueKey="id"
    subKey="children"
    style={styles.picker}
    selectText="Tutores:"
    showDropDowns={false}
    readOnlyHeadings={true}
    onSelectedItemsChange={this.onTutorSelect}
    selectedItems={this.state.selectedTutor}
    />


    <Text>Carreras:</Text>
    <SectionedMultiSelect
    items={this.careers}
    uniqueKey="id"
    subKey="children"
    style={styles.picker}
    selectText="Carreras:"
    showDropDowns={false}
    readOnlyHeadings={true}
    onSelectedItemsChange={this.onCarreerSelect}
    selectedItems={this.state.selectedCarreer}
    />


    <Text>Descripcion:</Text>
    <TextInput
    style={{ width:"90%",height: 200, borderColor: 'gray', borderWidth: 0.5 }}
    onChangeText={(description) => this.setState({description})}
    placeholder="Descrpcion de la idea"
    value={this.state.description}
    />                                                                        

    <Button
    onPress={() => {this.createIdea();}}
    title="Crear Proyecto"
    />

    </View>

    </ScrollView>
    );

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

  render() {
    return (
      <View style={styles.container}>
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
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
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






