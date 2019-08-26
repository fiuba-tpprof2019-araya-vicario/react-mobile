import React, { Component } from 'react';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { View } from 'react-native'

export class Question extends React.Component {

	constructor(props) {
	 super(props)
	 this.state = {
	 	answer: '',
	 	error: false,
	 	errorMessage: '',
	 }
 	}

 	getAnswer(){
 		return { 
 			pregunta: this.props.pregunta.id,
 			respuesta: this.state.answer,
 		};

 		//return "ANSWERRRR: "+ this.state.answer;
 	}

 	focus(){
 		this.input.focus();
 	}

	render() {
		return (
  		<View key={ this.props.pregunta.id }>
		      <FormLabel>{ this.props.pregunta.s }</FormLabel>
		      <FormInput
			    ref={input => this.input = input}
			    multiline={true}
		      	onSubmitEditing={ () => { this.props.tabPress(this.props.pregunta.id); }}
		      	onChangeText={(text) => { this.setState({ answer: text })}}
		      />
		      {this.state.error && <FormValidationMessage>{ this.state.errorMessage }</FormValidationMessage>}
		  </View>
		)
	 }
	}
export default Question;