import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, SectionList } from 'react-native'
import { Header, List, ListItem, Button } from 'react-native-elements';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import { Question } from '../components/question';
import { ProblemImage } from '../components/problemImage';
import { ProblemLocation } from '../components/problemLocation';
var base64 = require('base-64');

import { AsyncStorage } from "react-native"

import { preguntas } from '../assets/lists'

import AwesomeAlert from 'react-native-awesome-alerts';

class ProposalScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listQuestions: this.props.navigation.getParam('listOfQuestions', []),
      categoryId: this.props.navigation.getParam('categoryId', []),
      //questionComponents: 5,
      showAlert: false,
      alertIsDone: false,
      alertError: false,
      alertText: "Subiendo Propuesta!",
    }
    this.uploadProposal = this.uploadProposal.bind(this);
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      alertError: false,
      alertText: '',
    });
  };
 

  hideAlertAndGoBack = () => {
    this.setState({
      showAlert: false
    });
    this.props.navigation.navigate('HomeScreen');
  };
 
  changeAlertToError = () => {
    this.setState({
      alertError: true,
      alertText: "Tu propuesta no se pudo enviar"
    });
  };
 
  changeAlertToConfirm = () => {
    this.setState({
      alertIsDone: true,
      alertText: "Tu propuesta fue recibida!"
    });
  };

  uploadProposal(){

    let body = {};
    let listAnswers = [];
    preguntas.map((pregunta) => {
      if(this.state.listQuestions.includes(pregunta.id)){
        listAnswers.push(this['questionComponents' + pregunta.id].getAnswer());
      }
    });

    body['categoria'] = this.state.categoryId;
    body['respuestas'] = listAnswers;
    body['longLat'] = this['problemImage'].getLocation();

    // body['urlFoto'] = 'null';

    this.showAlert();

    //   this.uploadToServer(body).then((res) => {
    //     console.log(res);
    //     this.changeAlertToConfirm();
    //   }).catch((err) => {
    //     console.log(err);
    //     this.changeAlertToError();
    // })

    this['problemImage'].uploadPhoto().then((url) => {
      console.log("Llego de PROMISE");
      console.log(url);

      body['urlFoto'] = url; 

      console.log(body);

      this.uploadToServer(body).then((res) => {
        console.log(res);
        this.changeAlertToConfirm();
        //this.props.navigation.navigate('HomeScreen');
        
      }).catch((err) => {
        console.log(err);
        this.changeAlertToError();
      })


    }).catch((err) => {
      // TODO SUBIR SIN IMAGEN?
      console.log(err);
      // CHANGE TO FALTA IMAGEN
      this.changeAlertToError();
    });

  }

  async uploadToServer(body){

    let proposalBody = JSON.stringify(body);

    token = await AsyncStorage.getItem('accessToken');

    console.log(token);

    return new Promise(function(res,rej){
        console.log('BODYY: ' + proposalBody);


        fetch('http://52.91.201.153:10011/api/proposals', {
        //fetch('http://192.168.0.11:10010/api/proposals', {
          method: 'post',
          headers: {
            'Authorization': 'Basic ' + base64.encode('token' + ":" + token),
            'Content-Type': 'application/json',
          },
          body: proposalBody,

        }).then((response) => { 
          let data = response.json().then((data) => {
            console.log(data);
            res(data);
          })
        }).catch((err) => {
          rej(err);
        })

      })
  }


  nextFormInput(id){
    console.log(preguntas);
    let nextId = id+1;
    console.log(id);
    while(!this.state.listQuestions.includes(nextId) && nextId <= preguntas.length ){
      nextId++;
    }
    console.log(nextId);
    if(nextId <= preguntas.length)
      this['questionComponents' + nextId].focus();

  }


  render() {

    const {showAlert} = this.state;
    const {alertText} = this.state;
    const {alertIsDone} = this.state;
    const {alertError} = this.state;

    return (
      <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
        <Header outerContainerStyles={{ backgroundColor: '#ebc877' }} centerComponent={{ text: 'TuGobiernas2019', style: { fontSize: 18, color: '#fff' } }} />
        <ScrollView style={{ flex: 1}}>
          <View style={{backgroundColor: '#ffffff', margin: 10, flex: 1, borderRadius: 10, paddingBottom: 15}}>
              <Text style={{fontWeight: '800', margin:15, fontSize: 25, color: '#596163'}}>Cuentáme tu problema</Text>
                {
                  preguntas.map((pregunta, i) => {
                      if(this.state.listQuestions.includes(pregunta.id)){
                    return (
                             <Question 
                              ref={ (ref) => this['questionComponents' + pregunta.id] = ref } 
                              key={ pregunta.id } 
                              pregunta={ pregunta }
                              tabPress={this.nextFormInput.bind(this)} 
                            >
                            </Question>
                      )
                    }
                  })
                }
          <ProblemImage ref={ (ref) => this['problemImage'] = ref }/>
          {/*<FormLabel>Subir Propuesta</FormLabel>*/}
           <View style={{marginTop: 15, borderBottomWidth: 2, borderBottomColor: '#d6d7da', width: '100%', marginBottom: 15}} key="Line">
          </View>
            <Button style={{marginLeft: 20,marginRight: 20}}
              onPress={ this.uploadProposal }
              borderRadius={50}
              backgroundColor={'#ee275d'}
              fontWeight={'800'}
              raised
              // icon={{name: 'cloud-upload'}}
              title="Subir Propuesta">      
            </Button> 
          </View>
          <Text style={{fontWeight: '500', margin:15, fontSize: 15, color: '#596163', textAlign: 'center'}}>Muchas gracias por ser parte activa de este proyecto ciudadano</Text>
        </ScrollView>

        <AwesomeAlert
          show={showAlert}
          message={alertText}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={alertError}
          confirmButtonColor={'#0093D0'}
          cancelButtonColor={'#93D000'}
          showConfirmButton={alertIsDone}
          showProgress={!alertIsDone && !alertError}
          confirmText="Volver"
          onConfirmPressed={() => {
            this.hideAlertAndGoBack();
          }}
          onCancelPressed={() => {
            this.hideAlert();
          }}
        />

      </View>
    );
  }
}

export default ProposalScreen;