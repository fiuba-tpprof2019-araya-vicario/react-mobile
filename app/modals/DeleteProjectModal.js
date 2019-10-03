import React, { Component } from 'react';
import {StyleSheet,Text,Button,View} from 'react-native';
import Modal from 'react-native-modal';

export default class DeleteProjectModal extends React.Component {

  constructor(props) {
    super();
    this.state = {
      visibleModal: null,
    };
  };

  show(){
    this.setState({ visibleModal: 'backdropPress' });
  };

  close(){
    this.setState({ visibleModal: null });
  };

  renderModalContent = () => (
    <View style={styles.content}>
      <Text style={styles.title}>Eliminar el Proyecto 👋</Text>
      <Text style={styles.subTitle}>Desea eliminar el proyecto?</Text>
      <Button
      onPress={() => this.props.onSubmit()}
      title='Eliminar Proyecto'
      color='red'
      />
    </View>
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
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 12,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  }
});
