import React, { Component } from 'react';
import {StyleSheet,Text,Button,View} from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../util/colors'

export default class AcceptRequestModal extends Component {

  constructor(props) {
    super();
    this.state = {
      visibleModal: null,
      request: null
    };
  };

  show(request){
    this.setState({ visibleModal: 'backdropPress', request });
  };

  close(){
    this.setState({ visibleModal: null, request: null });
  };

  renderModalContent = () => (
    <View style={styles.content}>
      {this.state.request != null && this.state.request.status == 'pending' ?
      <Text style={styles.title}>Aceptar pedido de colaboración</Text> :
      <Text style={styles.title}>Aceptar propuesta</Text> }
      {this.state.request != null && this.state.request.status == 'pending' ?
      <Text style={styles.subTitle}>¿Estás seguro de que acepta la propuesta?</Text> :
      <Text style={styles.subTitle}>¿Estás de acuerdo con la propuesta presentada?</Text> }
      <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
        <View style={{ marginRight: 8 }}>
          <Button
            onPress={() => this.close()}
            title='Cancelar'
          />
        </View>
        <Button
          onPress={() => this.props.onSubmit(this.state.request)}
          title="Aceptar"
          color={COLORS.success}
        />
      </View>
    </View>
  );

  render() {
    console.log(this.state);
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
