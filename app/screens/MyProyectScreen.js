
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

// import CustomMultiPicker from "react-native-multiple-select-list";
// import Autocomplete from 'react-native-autocomplete-input';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const tipo_test = [
  // this is the parent or 'item'
  {
    name: 'Tipo de Proyectos',
    id: 99,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Trabajo Profesional',
        id: 2001,
      },
      {
        name: 'Tesis',
        id: 2002,
      },
      {
        name: 'Trabajo Practico',
        id: 2003,
      }
    ],
  }]

const  alumnos_test = [
  {
    name: 'Alumnos',
    id: 0,
    children: [
      {
        name: 'Sebastian Vicario',
        id: 1,
      },
      {
        name: 'Marcelo Cavazzoli',
        id: 2,
      },
      {
        name: 'Nicolas Wally',
        id: 3,
      },
    ],
  }
];

const  tutores_test = [
  {
    name: 'Tutores',
    id: 1,
    children: [
      {
        name: 'Pablo Cosa',
        id: 901,
      },
      {
        name: 'Ricardo Veiga',
        id: 902,
      },
      {
        name: 'Walter Nicolas Wally',
        id: 903,
      },
    ],
  }
];

const  carreras_test = [
  {
    name: 'Carreras',
    id: 2,
    children: [
      {
        name: 'Ing Informatica',
        id: 1001,
      },
      {
        name: 'Ing Industrial',
        id: 1002,
      },
      {
        name: 'Ing Arte de la Guerra',
        id: 1003,
      },
    ],
  }
];






export default class MyProyectScreen extends React.Component {

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


  state = {
          visibleModalId: null,
          selectedItems: [],
          selectedStudent: [],
          selectedTutor: [],
          selectedCarreer: [],
          selectedType: [],
  };

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
      onChangeText={(name) => this.setState({name})}
      placeholder="Ingrese el titulo para tu idea"
      value={this.state.name}
      />

      <Text>Tipo de Proyecto:</Text>
       <SectionedMultiSelect
          items={tipo_test}
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
          items={alumnos_test}
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
          items={tutores_test}
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
          items={carreras_test}
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
      onPress={() => this.setState({ visibleModal: null })}
      title="Close"
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






