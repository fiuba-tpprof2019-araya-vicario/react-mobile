import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import React, { Component } from 'react';
import {StyleSheet,Text,TextInput,Button,View,ScrollView,Picker} from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../util/colors'

export default class UploadProjectModal extends React.Component {

  constructor(props) {
    super();
    console.log('props: ', props)
    this.state = {
      selectedStudent: [],
      selectedTutor: [],
      selectedCarreer: [],
      selectedType: [],
      title:"",
      description:"",
      visibleModal: null,
      editMode: false
    };
  };

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

  updateStudents(responseJson){
    this._updateSelector(this.students, responseJson)
  }

  updateTutors(responseJson){
    this._updateSelector(this.tutors, responseJson)
  }

  updateCareers(responseJson){
    let serverCareers = responseJson.data;
    for (var i = serverCareers.length - 1; i >= 0; i--) {
      this.careers[0].children.push({
        "name":serverCareers[i].name,
        "id":serverCareers[i].id
      })
    }
  }

  _updateSelector(collection, responseJson){
    let serverStudents = responseJson.data;
    for (var i = serverStudents.length - 1; i >= 0; i--) {
      collection[0].children.push({
        "name":serverStudents[i].name+" "+serverStudents[i].surname,
        "id":serverStudents[i].id
      })
    }
  }

  updateData(project){
    this.setState({ 
      title: project.name,
      description: project.description,
      selectedStudent: project.Students.map((student) => student.id),
      selectedTutor: project.tutor_id != null ? [project.tutor_id] : [],
      selectedCarreer: project.ProjectCareers.map((projectCareer) => projectCareer.career_id),
      selectedType: project.type_id != null ? [project.type_id] : []
    })
  }

  show(data){
    this.setState({ visibleModal: 'backdropPress', editMode: data.editMode });
  };

  close(){
    this.setState({ visibleModal: null });
  };

  create(){
    this.props.onCreate(this.state)
  };

  edit(){
    this.props.onEdit(this.state)
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
        { this.state.editMode ? 
          <Text style={styles.title}>Edita el Proyecto 👋</Text> :
          <Text style={styles.title}>Crea un nuevo Proyecto 👋</Text>
        }
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
        onPress={() => { this.state.editMode ? this.edit() : this.create();}}
        title={ this.state.editMode ? "Editar Proyecto" : "Crear Proyecto"}
        color={COLORS.primary}
        />

        </View>

      </ScrollView>
    );

  render() {
    return (
      <Modal
      isVisible={this.state.visibleModal === 'backdropPress'}
      onBackdropPress={() => this.setState({ visibleModal: null })}
      >
      {this.renderModalContent()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
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
