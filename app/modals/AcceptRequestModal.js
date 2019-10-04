import React, { Component } from 'react';
import {StyleSheet,Text,Button,View} from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../util/colors'

export default class AcceptRequestModal extends Component {

  constructor(props) {
    super();
    this.state = {
      visibleModal: null,
      requestId: null
    };
  };

  show(requestId){
    this.setState({ visibleModal: 'backdropPress', requestId });
  };

  close(){
    this.setState({ visibleModal: null, requestId: null });
  };

  renderModalContent = () => (
    <View style={styles.content}>
      <Text style={styles.title}>Aceptar pedido de colaboración</Text>
      <Text style={styles.subTitle}>¿Estás seguro de que quieres aceptar el pedido para trabajar en el proyecto?</Text>
      <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
        <View style={{ marginRight: 8 }}>
          <Button
            onPress={() => this.close()}
            title='Cancelar'
          />
        </View>
        <Button
          onPress={() => this.props.onSubmit(this.state.requestId)}
          title="Aceptar"
          color={COLORS.success}
        />
      </View>
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
