
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';


export default class MyProyectScreen extends React.Component {


  state = {
    visibleModalId: null,
  };

  renderModalContent = () => (

    <ScrollView
    ref={ref => (this.scrollViewRef = ref)}
    onScroll={this.handleOnScroll}
    scrollEventThrottle={16}
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

      <Text>Autor:</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 0.5 }}
      onChangeText={(author) => this.setState({author})}
      placeholder="Ingrese el autor"
      value={this.state.author}
      />

      <Text>Tipo de Proyecto:</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 0.5 }}
      onChangeText={(type) => this.setState({type})}
      placeholder="Seleccione el tipo de proyeccto"
      value={this.state.type}
      />

      <Text>Co Autores:</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 0.5 }}
      onChangeText={(coauth) => this.setState({coauth})}
      placeholder="Ingresa los co autores"
      value={this.state.coauth}
      />

      <Text>Tutor:</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 0.5 }}
      onChangeText={(tutor) => this.setState({tutor})}
      placeholder="Selecciona un tutor"
      value={this.state.tutor}
      />


      <Text>Carreras:</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 0.5 }}
      onChangeText={(comission) => this.setState({comission})}
      placeholder="Selecciona la comision curricular"
      value={this.state.comission}
      />


      <Text>Descripcion:</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 0.5 }}
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






